"use strict";

import {graficarPolinomioConPuntos, obtenerValores } from "../calculos.js";
import { calcularLagrange, construirPolinomioLagrange, getExpandedPolynomial} from "../lagrange.js";
import { HabilitarSecciones } from "../Metodos.js";


window.onload = () => {
    // Deshabilitar entrada manual en #dimensione
    const dimensione = document.getElementById('dimensione');
    const X1 = document.getElementById('CeldaX');
    const celdasX = document.getElementsByClassName('X');
    const celdasY = document.getElementsByClassName('Y');

    // Bloquea entrada manual de texto en #dimensione
    dimensione.addEventListener('keydown', function (e) {
        e.preventDefault();
    });

    // Detecta cambios cuando se usa el spinner
    dimensione.addEventListener('input', function () {
        const numCeldas = parseInt(dimensione.value, 10); // Convertir a entero
        if (isNaN(numCeldas) || numCeldas < 0 || numCeldas > celdasX.length) {
            console.warn('Valor fuera de rango o inválido');
            return;
        }

        // Activar/desactivar celdas en función del valor
        for (let i = 2; i < celdasX.length; i++) {
            if (i < numCeldas) {
                celdasY[i].disabled = false; // Habilita la celda
                celdasY[i].style.backgroundColor = ''; // Restablece estilo
                celdasY[i].placeholder = `Y${i + 1}`;

                celdasX[i].classList.add('habilitadoX');
                celdasY[i].classList.add('habilitadoY');
            } else {
                celdasX[i].disabled = true; // Desactiva la celda
                celdasX[i].style.backgroundColor = '#e0e0e0'; // Indicador visual
                celdasX[i].placeholder = '';
                celdasY[i].disabled = true; // Desactiva la celda
                celdasY[i].style.backgroundColor = '#e0e0e0'; // Indicador visual
                celdasY[i].placeholder = '';
                celdasX[i].value = '';
                celdasY[i].value = '';
                celdasX[i].classList.remove('habilitadoX');
                celdasY[i].classList.remove('habilitadoY');
            }
        }
    });

    // Inicializar el estado de las celdas
    dimensione.dispatchEvent(new Event('input'));

    const cancelarDeIteracion = document.getElementById('CancelarDeIteracion');
    cancelarDeIteracion.addEventListener('click', () => {
        dimensione.value = 2;
        dimensione.dispatchEvent(new Event('input'));

        let habilitadasXArray = Array.from(document.getElementsByClassName('habilitadoX'));
        let habilitadasYArray = Array.from(document.getElementsByClassName('habilitadoY'));

        habilitadasXArray.forEach(
            input =>{
                input.style.border = '';
                input.value = ''
            });
        habilitadasYArray.forEach(input =>{
                input.style.border = '';
                input.value = ''
            });
        mensajeDeError.style.display = 'none';
    });

    const calcularDeiteracion = document.getElementById('CalcularDeIteracion');
    const mensajeDeError = document.getElementById('iteracion-error');
    
    calcularDeiteracion.addEventListener('click', () => {
        console.log('iterando casillas...');
        let habilitadasX = Array.from(document.getElementsByClassName('habilitadoX'))
        let habilitadasY = Array.from(document.getElementsByClassName('habilitadoY'));
        if(habilitadasX[0].value === habilitadasX[1].value ){
            document.getElementById('iteracion-error').style.display = 'flex';
            document.getElementById('iteracion-error').textContent = 'Los valores de X no pueden repetirse.'
            return
        }
        // Convierte `habilitadasX` y `habilitadasY` en arrays si no lo son
        let incremento = habilitadasX[1].value - habilitadasX[0].value;
        console.log(`incremento = ${incremento}`);
        for (let i = 2; i < habilitadasY.length; i++) {
            celdasX[i].value = (parseFloat(celdasX[i - 1].value) + incremento);
        }

        let habilitadasXArray = Array.from(habilitadasX);
        let habilitadasYArray = Array.from(habilitadasY);
        let valoresX = habilitadasXArray.map(input => parseFloat(input.value));
        let valoresY = habilitadasYArray.map(input => parseFloat(input.value));
        let ValoresVaciosX = [];
        let ValoresVaciosY = [];

        // Encontrar los índices de los valores vacíos
        for (let i = 0; i < valoresX.length; i++) {
            if (isNaN(valoresX[i]) && i<2) {
                ValoresVaciosX.push(i);
            }
            if (isNaN(valoresY[i])) {
                ValoresVaciosY.push(i);
            }
        }

        // Mostrar mensaje de error y resaltar las casillas vacías
        if (ValoresVaciosX.length > 0 || ValoresVaciosY.length > 0) {
            mensajeDeError.style.display = 'block';

            // Resaltar casillas vacías en valoresX
            ValoresVaciosX.forEach(i => {
                habilitadasXArray[i].style.border = '2px solid red';
            });

            // Resaltar casillas vacías en valoresY
            ValoresVaciosY.forEach(i => {
                habilitadasYArray[i].style.border = '2px solid red';
            });
        } else {
            // Si no hay errores
            mensajeDeError.style.display = 'none';
            let ValoresX = obtenerValores(habilitadasXArray);
            let ValoresY = obtenerValores(habilitadasYArray);
            valoresY.forEach(elemt  => {
                console.log(`valores de Y: ${elemt}`)
            })
            valoresX.forEach(elemt  => {
                console.log(`valores de x: ${elemt}`)
            })



            const coeficientesLagrange = calcularLagrange(valoresX, valoresY);
            console.log("Coeficientes de Lagrange:", coeficientesLagrange);

            // console.log(`coeficientes: ${Coeficientes} valoresDeX: ${valoresX[0]} incremento: ${incremento}`)
            let Polinomios = construirPolinomioLagrange(valoresX,valoresY);
            console.log('lagrange: ' + Polinomios);

            const formulaNewton = document.getElementById('newtonRespuesta');
            const PoliResp = document.getElementById('poliResp');
            document.getElementById('ImagenFdeX').textContent = '';
            document.getElementById('inputDeX').value = '';
            formulaNewton.textContent = Polinomios;
            PoliResp.style.color = '#000';

            PoliResp.textContent = getExpandedPolynomial(valoresX,valoresY);
            formulaNewton.style.color = '#000';

            let graficoContent = Array.from(document.getElementsByClassName('grafico-content'));
            
            document.getElementById('grafico').style.alignItems = 'initial';
            document.getElementById('grafico').style.justifyContent = 'initial';
            graficoContent.forEach(element => element.style.display = 'none');
            
            graficarPolinomioConPuntos(PoliResp.textContent,valoresX,valoresY,[0,10],document.getElementById('grafico'));
            HabilitarSecciones();
        }
    });
};

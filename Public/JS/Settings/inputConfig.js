"use strict";

import { construirPolinomio, diferenciasDivididasConstante, obtenerValores, simplificarConMathJS } from "../calculos.js";

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
        for (let i = 0; i < celdasX.length; i++) {
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
        dimensione.value = 1;
        dimensione.dispatchEvent(new Event('input'));
        celdasX[0].value = '';
        celdasY[0].value = '';

        let habilitadasXArray = Array.from(document.getElementsByClassName('habilitadoX'));
        let habilitadasYArray = Array.from(document.getElementsByClassName('habilitadoY'));

        habilitadasXArray.forEach(input => input.style.border = '');
        habilitadasYArray.forEach(input => input.style.border = '');
        mensajeDeError.style.display = 'none';
    });

    const calcularDeiteracion = document.getElementById('CalcularDeIteracion');
    let habilitadasX = document.getElementsByClassName('habilitadoX');
    let habilitadasY = document.getElementsByClassName('habilitadoY');
    const mensajeDeError = document.getElementById('iteracion-error');

    calcularDeiteracion.addEventListener('click', () => {
        console.log('iterando casillas...');

        // Convierte `habilitadasX` y `habilitadasY` en arrays si no lo son
        let habilitadasXArray = Array.from(habilitadasX);
        let habilitadasYArray = Array.from(habilitadasY);
        habilitadasXArray.forEach(input => input.style.border = '');
        habilitadasYArray.forEach(input => input.style.border = '');

        let valoresX = habilitadasXArray.map(input => parseFloat(input.value));
        let valoresY = habilitadasYArray.map(input => parseFloat(input.value));
        let ValoresVaciosX = [];
        let ValoresVaciosY = [];

        // Encontrar los índices de los valores vacíos
        for (let i = 0; i < valoresX.length; i++) {
            if (isNaN(valoresX[i])) {
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
            let incremento = ValoresX[1] - ValoresX[0];

            for (let i = 2; i < ValoresY.length; i++) {
                celdasX[i].value = (parseFloat(celdasX[i - 1].value) + incremento);
            }

            let Coeficientes = diferenciasDivididasConstante(ValoresY, incremento);
            Coeficientes.forEach(element => {
                console.log('Coeficientes ' + element);
            });

            let Polinomios = construirPolinomio(Coeficientes, ValoresX, incremento);
            console.log('NEWTON: ' + Polinomios[0] + ' POLINOMIO SIMPLIFICADO ' + Polinomios[1]);

            const formulaNewton = document.getElementById('newtonRespuesta');
            const PoliResp = document.getElementById('poliResp');
            formulaNewton.textContent = Polinomios[0];
            PoliResp.style.color = '#000';
            PoliResp.textContent = simplificarConMathJS(Polinomios[1]);
            formulaNewton.style.color = '#000';
        }
    });
};

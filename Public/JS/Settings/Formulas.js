"use strict";

import { graficarPolinomioConPuntos, posicionFalsa, ResolverFuncionDeX } from "../calculos.js";

document.addEventListener('DOMContentLoaded', ()=>{
    const CalcularFDeX = document.getElementById('CalcularDeFormulas');
    const CancelarDeFDeX = document.getElementById('CancelarDeFormulas');
    const Xinput = document.getElementById('inputDeX');
    const PoliRespOutput = document.getElementById('poliResp');
    const FdeXContainer = document.getElementById('ImagenFdeX');
    const tablaIteraciones = document.getElementById("tabla-raiz").querySelector("tbody");

    CalcularFDeX.addEventListener('click',()=>{
        let habilitadasX = Array.from(document.getElementsByClassName('habilitadoX'))
        let habilitadasY = Array.from(document.getElementsByClassName('habilitadoY'));
        let valoresX = habilitadasX.map(input => parseFloat(input.value));
        let valoresY = habilitadasY.map(input => parseFloat(input.value));
        let PoliResp = PoliRespOutput.textContent; 
        let X = Xinput.value;
        // console.log(`escuchando \n polinomio: ${PoliResp} \n X = ${X}`);

        FdeXContainer.textContent = ResolverFuncionDeX(X);
        
    });
    const InitA = document.getElementById('InitA');
    InitA.addEventListener('input',()=>{
        let PoliResp = PoliRespOutput.textContent; 
        if(InitA){
            document.getElementById('ImagenA').textContent = ResolverFuncionDeX(InitA.value);
        }else{
            document.getElementById('ImagenA').textContent = '';
        }
    });
    const InitB = document.getElementById('InitB');
    InitB.addEventListener('input',()=>{
        let PoliResp = PoliRespOutput.textContent; 
        if(InitB){
            document.getElementById('ImagenB').textContent = ResolverFuncionDeX(InitB.value);
        }
    })

    const CalcularDeRaiz = document.getElementById('CalcularDeRaiz');
    CalcularDeRaiz.addEventListener('click', () => {
        // Obtener valores iniciales
        const ImagenA = parseFloat(document.getElementById('ImagenA').value);
        const ImagenB = parseFloat(document.getElementById('ImagenB').value);
        const A = parseFloat(document.getElementById('InitA').value);
        const B = parseFloat(document.getElementById('InitB').value);
    
        const polinomio = document.getElementById('poliResp').textContent; // Polinomio simplificado
        const tablaIteraciones = document.getElementById("tabla-raiz").querySelector("tbody");
    
        // Ocultar elementos no relacionados con el cálculo de la raíz
        document.getElementById('grilla').style.display = 'none';
        document.getElementById('label-grilla').style.display = 'none';
    
        try {
            // Verificar si el intervalo tiene una raíz
            if (ImagenA * ImagenB < 0) {
                console.log(`Polinomio: ${polinomio}\nIntervalo inicial: [${A}, ${B}]`);
    
                // Llamar a la función de posición falsa
                const { raiz, iteraciones } = posicionFalsa(polinomio, A, B);
    
                // Mostrar la raíz encontrada
                document.getElementById('raizOutput').textContent = raiz
                document.getElementById('DGrid').style.justifyContent = 'flex-start';
                document.getElementById('tabla-raiz').style.display = 'block';
    
                // Ocultar elementos innecesarios
                Array.from(document.getElementsByClassName('raiz-content')).forEach(element => {
                    element.style.display = 'none';
                });
    
                // Limpiar la tabla de iteraciones
                tablaIteraciones.innerHTML = "";
    
                // Llenar la tabla con las iteraciones
                iteraciones.forEach(({ iteracion, a, b, c, fa, fb, fc }) => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td class="filas-raiz">${iteracion}</td>
                        <td class="filas-raiz">${a.toFixed(1)}</td>
                        <td class="filas-raiz">${b.toFixed(1)}</td>
                        <td class="filas-raiz">${c.toFixed(5)}</td>
                        <td class="filas-raiz">${fa.toFixed(3)}</td>
                        <td class="filas-raiz">${fb.toFixed(3)}</td>
                        <td class="filas-raiz">${fc.toFixed(5)}</td>
                    `;
                    tablaIteraciones.appendChild(fila);
                });
            } else {
                // Si no hay raíces en el intervalo
                document.getElementById('raizOutput').textContent =
                    "No se encontró una raíz en el intervalo proporcionado. Verifica tus valores.";
            }
        } catch (error) {
            console.error("Error durante el cálculo:", error.message);
            document.getElementById('raizOutput').textContent =
                "Ocurrió un error durante el cálculo. Por favor verifica los valores y el polinomio.";
        }
    });
    
    
})

"use strict";

import { graficarPolinomioConPuntos, posicionFalsa, ResolverFuncionDeX } from "../calculos.js";

document.addEventListener('DOMContentLoaded', ()=>{
    const CalcularFDeX = document.getElementById('CalcularDeFormulas');
    const CancelarDeFDeX = document.getElementById('CancelarDeFormulas');
    const Xinput = document.getElementById('inputDeX');
    const PoliRespOutput = document.getElementById('poliResp');
    const FdeXContainer = document.getElementById('ImagenFdeX');

    CalcularFDeX.addEventListener('click',()=>{
        let habilitadasX = Array.from(document.getElementsByClassName('habilitadoX'))
        let habilitadasY = Array.from(document.getElementsByClassName('habilitadoY'));
        let valoresX = habilitadasX.map(input => parseFloat(input.value));
        let valoresY = habilitadasY.map(input => parseFloat(input.value));
        let PoliResp = PoliRespOutput.textContent; 
        let X = Xinput.value;
        // console.log(`escuchando \n polinomio: ${PoliResp} \n X = ${X}`);

        FdeXContainer.textContent = ResolverFuncionDeX(PoliResp,X);
        
    });
    const InitA = document.getElementById('InitA');
    InitA.addEventListener('input',()=>{
        let PoliResp = PoliRespOutput.textContent; 
        if(InitA){
            document.getElementById('ImagenA').textContent = ResolverFuncionDeX(PoliResp,InitA.value);
        }else{
            document.getElementById('ImagenA').textContent = '';
        }
    });
    const InitB = document.getElementById('InitB');
    InitB.addEventListener('input',()=>{
        let PoliResp = PoliRespOutput.textContent; 
        if(InitB){
            document.getElementById('ImagenB').textContent = ResolverFuncionDeX(PoliResp,InitB.value);
        }
    })

    const CalcularDeRaiz = document.getElementById('CalcularDeRaiz');
    const CancelarDeRaiz = document.getElementById('CancelarDeRaiz');
    CalcularDeRaiz.addEventListener('click',()=>{
        let ImagenA = parseInt(document.getElementById('ImagenA').value);
        let ImagenB = parseInt(document.getElementById('ImagenB').value);
        let A = document.getElementById('InitA').value;
        let B = document.getElementById('InitA').value;
        document.getElementById('grilla').style.display = 'none';
        document.getElementById('label-grilla').style.display = 'none'
        try{
            if((ImagenA*ImagenB) < 0){
                posicionFalsa(document.getElementById('poliResp'),A,B);
                    // Limpiar la tabla
                tablaIteraciones.innerHTML = "";

                // Llenar la tabla con los datos de las iteraciones
                iteraciones.forEach(({ iteracion, a, b, c, fa, fb, fc }) => {
                    const fila = document.createElement("tr");
                    fila.innerHTML = `
                        <td>${iteracion}</td>
                        <td>${a.toFixed(6)}</td>
                        <td>${b.toFixed(6)}</td>
                        <td>${c.toFixed(6)}</td>
                        <td>${fa.toFixed(6)}</td>
                        <td>${fb.toFixed(6)}</td>
                        <td>${fc.toFixed(6)}</td>
                    `;
                    tablaIteraciones.appendChild(fila);
                });
            }

        }finally{}
    })
    
})

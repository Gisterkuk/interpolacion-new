"use strict";

import { graficarPolinomioConPuntos, ResolverFuncionDeX } from "../calculos.js";

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
        graficarPolinomioConPuntos(PoliResp,valoresX,valoresY,[0,10],document.getElementById('grafico'));
        
    })
})

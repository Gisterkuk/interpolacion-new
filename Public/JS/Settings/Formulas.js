"use strict";

import { ResolverFuncionDeX } from "../calculos.js";

document.addEventListener('DOMContentLoaded', ()=>{
    const CalcularFDeX = document.getElementById('CalcularDeFormulas');
    const CancelarDeFDeX = document.getElementById('CancelarDeFormulas');
    const Xinput = document.getElementById('inputDeX');
    const PoliRespOutput = document.getElementById('poliResp');
    const FdeXContainer = document.getElementById('ImagenFdeX');

    CalcularFDeX.addEventListener('click',()=>{
        let PoliResp = PoliRespOutput.textContent; 
        let X = Xinput.value;
        // console.log(`escuchando \n polinomio: ${PoliResp} \n X = ${X}`);

        FdeXContainer.textContent = ResolverFuncionDeX(PoliResp,X);
        
    })
})

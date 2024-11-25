"use strict";

// import { simplify } from 'mathjs';
export function obtenerValores(celdas) {
    let Celdas = Array.from(celdas);

    return Array.from(Celdas
        .filter(celda => !celda.disabled)
        .map(celda => parseFloat(celda.value)));
}

export function diferenciasDivididasConstante(valoresY, h) {
    const n = valoresY.length;
    const diferencias = Array.from([valoresY]);

    for (let j = 1; j < n; j++) {
        const fila = [];
        for (let i = 0; i < n - j; i++) {
            const diferencia = diferencias[j - 1][i + 1] - diferencias[j - 1][i];
            fila.push(diferencia / h); // Dividir por el incremento constante
        }
        diferencias.push(fila);
    }
    diferencias.forEach(element => {
        console.log('diferencias ', element)
    });

    return Array.from(diferencias.map(fila => fila[0])); // Retorna los coeficientes de cada nivel
}

export function construirPolinomio(coeficientes, x0, h) {
    let formulaNewton = `${coeficientes[0]}`; // Primer término

    for (let i = 1; i < coeficientes.length; i++) {
        let termNewton = `${coeficientes[i]}`;

        for (let j = 0; j < i; j++) {
            termNewton += ` * (x - ${x0 + j * h})`; // Multiplica cada término incremental
        }

        formulaNewton += ` + (${termNewton})`; // Agrega término a la fórmula de Newton
    }

    // Retorna ambas representaciones del polinomio
    return [formulaNewton];
}

export function ResolverFuncionDeX(polinomio, x) {
    // Reemplaza todas las ocurrencias de "x" en la cadena con el valor ingresado
    const polinomioEvaluado = polinomio.replace(/x/g, `(${x})`);
    try {
        // Usa eval para calcular el valor del polinomio
        console.log(`F(${x}) = ` + polinomioEvaluado);
        return eval(polinomioEvaluado);
    } catch (error) {
        console.error("Error evaluando el polinomio:", error);
        return null;
    }
}

export function simplificarConMathJS(polinomio) {
    try {
        const resultado = math.simplify(polinomio);
        return resultado.toString();
    } catch (error) {
        console.error("Error al simplificar con Math.js:", error);
        return null;
    }
}

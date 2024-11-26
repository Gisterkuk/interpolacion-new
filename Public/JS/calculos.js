"use strict";

export function obtenerValores(celdas) {
    let Celdas = Array.from(celdas);

    // Filtrar celdas que tengan la clase 'habilitadoX' o 'habilitadoY'
    const celdasHabilitadas = Celdas.filter(celda => 
        celda.classList.contains('habilitadoX') || celda.classList.contains('habilitadoY')
    );

    // Retornar los valores de las celdas habilitadas
    return celdasHabilitadas.map(celda => parseFloat(celda.value));
}


export function diferenciasDivididas(valoresX, valoresY) {
    if (valoresX.length !== valoresY.length) {
        throw new Error("Los arreglos de X e Y deben tener la misma longitud.");
    }

    const n = valoresY.length;
    const diferencias = [Array.from(valoresY)]; // Nivel 0: valores iniciales de Y

    // Iterar sobre los niveles de diferencias
    for (let nivel = 1; nivel < n; nivel++) {
        const fila = [];
        for (let i = 0; i < n - nivel; i++) {
            const numerador = diferencias[nivel - 1][i + 1] - diferencias[nivel - 1][i];
            const denominador = valoresX[i + nivel] - valoresX[i]; // Usar valores de X
            const resultado = numerador / denominador; // Diferencias divididas
            fila.push(resultado);
        }
        diferencias.push(fila); // Añadir la fila actual a la matriz de diferencias
    }

    // Depuración: Imprimir cada nivel de diferencias
    diferencias.forEach((fila, nivel) => {
        console.log(`Nivel ${nivel}:`, fila);
    });

    // Retornar los primeros valores de cada nivel como los coeficientes
    return diferencias.map(fila => fila[0]);
}







export function construirPolinomio(coeficientes, x0, h) {
    let formulaNewton = `${coeficientes[0]}`; // Primer término

    for (let i = 1; i < coeficientes.length; i++) {
        if (coeficientes[i] !== 0) { // Ignorar términos con coeficientes cero
            let termNewton = `${coeficientes[i]}`;

            for (let j = 0; j < i; j++) {
                const valor = (x0 + j * h); // Mantén precisión adecuada
                termNewton += ` * (x - ${valor})`;
            }

            formulaNewton += ` + (${termNewton})`; // Agrega el término válido
        }
    }

    return formulaNewton; // Devuelve el polinomio final
}




export function ResolverFuncionDeX(polinomio, x) {
    try {
        // Reemplaza "x" en el polinomio por el valor ingresado
        const scope = { x: x };
        const resultado = math.evaluate(polinomio, scope);
        console.log(`F(${x}) = ${resultado}`);
        return resultado;
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

// Función para evaluar el polinomio
export function evaluarPolinomio(polinomio, x) {
    try {
        const scope = { x }; // Crear el contexto para evaluar
        return math.evaluate(polinomio, scope); // Evaluar con Math.js
    } catch (error) {
        console.error("Error evaluando el polinomio:", error.message);
        return NaN; // Retorna NaN en caso de error
    }
}

// Función para graficar
export function graficarPolinomioConPuntos(polinomio, valoresX, valoresY, rango, divId) {
    const xValoresPolinomio = [];
    const yValoresPolinomio = [];

    // Generar puntos del polinomio dentro del rango dado
    for (let x = rango[0]; x <= rango[1]; x += 0.1) {
        xValoresPolinomio.push(x);
        yValoresPolinomio.push(evaluarPolinomio(polinomio, x));
    }

    // Crear trazado del polinomio
    const tracePolinomio = {
        x: xValoresPolinomio,
        y: yValoresPolinomio,
        type: 'scatter',
        mode: 'lines',
        line: { color: 'blue' },
        name: 'P(x)' // Etiqueta para el polinomio
    };

    // Crear trazado para los puntos originales
    const tracePuntos = {
        x: valoresX,
        y: valoresY,
        type: 'scatter',
        mode: 'markers',
        marker: { color: 'red', size: 8 },
        name: 'Puntos Originales' // Etiqueta para los puntos originales
    };

    // Configuración del diseño
    const layout = {
        title: {
            text: 'Gráfico de Interpolación',
            font: {
                size: 20,
                color: '#333'
            }
        },
        xaxis: {
            title: {
                text: 'Valores de X',
                font: {
                    size: 14
                }
            },
            showgrid: true,
            zeroline: true
        },
        yaxis: {
            title: {
                text: 'Valores de Y',
                font: {
                    size: 14
                }
            },
            showgrid: true,
            zeroline: true
        },
        paper_bgcolor: '#ffffff',
        plot_bgcolor: '#f5f5f5'
    };
    const config = {
        responsive: true,
        displayModeBar: false, // Oculta la barra de herramientas superior de Plotly
        staticPlot: true, // Hace el gráfico estático y no interactivo
    };

    // Renderizar el gráfico dentro del div
    Plotly.newPlot(divId, [tracePolinomio, tracePuntos], layout,config);
}



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

export function ResolverFuncionDeX(x) {
    try {
        // Reemplaza "x" en el polinomio por el valor ingresado
        const scope = { x: x };
        const resultado = math.evaluate(document.getElementById('poliResp').textContent, scope);
        console.log(`F(${x}) = ${resultado}`);
        return resultado;
    } catch (error) {
        console.error("Error evaluando el polinomio:", error);
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

export function posicionFalsa(polinomio, a, b, tolerancia = 1e-5, maxIteraciones = 100) {
    const iteraciones = []; // Para guardar las iteraciones
    document.getElementById('raiz-error').style.display = 'none';
    document.getElementById('raiz-error').textContent = 'No existe ninguna raiz entre esos puntos';
    let iteracion = 0;
    let raiz = null;

    // Evaluar extremos iniciales
    let fa = ResolverFuncionDeX(a);
    let fb = ResolverFuncionDeX(b);
    console.log(`valor de F(x1) = ${fa}\n valor de F(x2) = ${fb}`)
    if (fa * fb > 0) {
        document.getElementById('raiz-error').style.display = 'block';
    }

    while (iteracion < maxIteraciones) {
        // Calcular el punto de intersección (c)
        const c = b - (fb * (b - a)) / (fb - fa); // Fórmula de la posición falsa
        console.log(`el valor de C es ${c}`);
        const fc = ResolverFuncionDeX(c);

        // Guardar los datos de la iteración
        iteraciones.push({ iteracion: iteracion + 1, a, b, c, fa, fb, fc });

        // Comprobar si la raíz es suficientemente precisa
        if (Math.abs(fc) < tolerancia) {
            raiz = c;
            console.log(`raiz encontrada ${raiz}`);
            break;
        }

        // Actualizar extremos
        if (fa * fc < 0) {
            b = c;
            fb = fc;
        } else {
            a = c;
            fa = fc;
        }

        iteracion++;
    }

    if (raiz === null) {
        // document.getElementById('raiz-error').style.display = 'block';
        document.getElementById('raizOutput').textContent = 'Limite de iteraciones alcanzado, no se encontraron raices';
        
    }else{
        document.getElementById('raizOutput').textContent =`Raiz mas cercana encontrada ${raiz}`
    }

    return { raiz, iteraciones };
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



export function calcularLagrange(valoresX, valoresY) {
    if (valoresX.length !== valoresY.length) {
        throw new Error("Los arreglos de X e Y deben tener la misma longitud.");
    }

    const n = valoresX.length;

    // Construir el polinomio de Lagrange
    const coeficientesLagrange = [];

    for (let i = 0; i < n; i++) {
        let terminoCoef = valoresY[i]; // Inicializamos el término con el valor de Y
        let denominador = 1; // Parte del denominador para el coeficiente

        // Calcular el denominador del término de Lagrange L_i(x)
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                denominador *= (valoresX[i] - valoresX[j]);
            }
        }

        // Agregar el término con su coeficiente
        coeficientesLagrange.push({
            coeficiente: terminoCoef / denominador,
            indices: valoresX.filter((_, idx) => idx !== i), // Guardar los valores x_j excluyendo x_i
        });
    }

    // Mostrar los coeficientes y términos calculados (depuración)
    console.log("Coeficientes Lagrange:");
    coeficientesLagrange.forEach((coef, idx) => {
        console.log(`L_${idx}(x):`, coef);
    });

    return coeficientesLagrange;
}

// Función para evaluar el polinomio Lagrange en un valor dado de x
export function evaluarLagrange(coeficientesLagrange, x) {
    let resultado = 0;

    for (const termino of coeficientesLagrange) {
        let producto = termino.coeficiente;

        // Calcular el producto de (x - x_j) para todos los índices en `termino.indices`
        for (const xj of termino.indices) {
            producto *= (x - xj);
        }

        // Sumar el término al resultado total
        resultado += producto;
    }

    return resultado;
}
export function construirPolinomioLagrange(valoresX, valoresY) {
    if (valoresX.length !== valoresY.length) {
        throw new Error("Los arreglos de X e Y deben tener la misma longitud.");
    }

    const n = valoresX.length;
    let polinomio = ""; // Aquí se construirá el polinomio final

    for (let i = 0; i < n; i++) {
        let termino = `${valoresY[i]}`; // Inicializar el término con el coeficiente Y[i]

        // Construir el producto de L_i(x)
        let denominador = 1;
        let producto = ""; // Representa el producto (x - x_j) para j ≠ i

        for (let j = 0; j < n; j++) {
            if (i !== j) {
                denominador *= (valoresX[i] - valoresX[j]); // Calcular el denominador
                producto += `(x - ${valoresX[j]})`; // Añadir el término al producto
            }
        }

        // Agregar el término al polinomio
        const coef = valoresY[i] / denominador; // Coeficiente de L_i(x)
        termino = `${coef.toFixed(1)} * ${producto}`; // Construir el término con el coeficiente y el producto

        // Concatenar el término al polinomio
        polinomio += (i === 0 ? "" : " + ") + termino; // Agregar "+" excepto en el primer término
    }

    return polinomio; // Devolver el polinomio completo como string
}
export function simplificarYOrdenarPolinomio(polinomio) {
    try {
        // Simplificar el polinomio usando math.js
        const polinomioSimplificado = math.simplify(polinomio).toString();

        // Extraer los términos del polinomio simplificado
        const terminos = polinomioSimplificado
            .split(/(?=[+-])/) // Divide en términos por los signos + o -
            .map(termino => termino.trim()); // Limpia espacios en blanco

        // Convertir cada término en un objeto con coeficiente y grado
        const terminosConvertidos = terminos.map(termino => {
            const match = termino.match(/([+-]?\d*\.?\d*)\*?x\^?(\d+)?/);
            if (match) {
                const coeficiente = parseFloat(match[1] || (match[0].includes('-') ? '-1' : '1'));
                const grado = parseInt(match[2] || (termino.includes('x') ? '1' : '0'));
                return { coeficiente, grado };
            } else {
                // Caso de término constante
                return { coeficiente: parseFloat(termino), grado: 0 };
            }
        });

        // Ordenar los términos por grado descendente
        const terminosOrdenados = terminosConvertidos.sort((a, b) => b.grado - a.grado);

        // Reconstruir el polinomio como una cadena
        const polinomioOrdenado = terminosOrdenados
            .map(({ coeficiente, grado }) => {
                if (grado === 0) return `${coeficiente}`;
                if (grado === 1) return `${coeficiente === 1 ? '' : coeficiente}x`;
                return `${coeficiente === 1 ? '' : coeficiente}x^${grado}`;
            })
            .join(" + ")
            .replace(/\+\s\-/g, "- "); // Ajustar los signos negativos

        return polinomioOrdenado;
    } catch (error) {
        console.error("Error al simplificar y ordenar el polinomio:", error);
        return null;
    }
}
export function getExpandedPolynomial(xValues, yValues) {
    const n = xValues.length;
    const coefficients = new Array(n).fill(0);

    // Construir el polinomio de Lagrange expandido
    for (let i = 0; i < n; i++) {
        let termCoefficient = yValues[i];

        // Calcular el denominador (x_i - x_j) para j != i
        for (let j = 0; j < n; j++) {
            if (j !== i) {
                termCoefficient /= (xValues[i] - xValues[j]);
            }
        }

        // Crear un arreglo temporal para acumular el término de Lagrange expandido
        const term = new Array(n).fill(0);
        term[0] = termCoefficient;

        // Expandir (x - x_j) para cada j != i
        for (let j = 0; j < n; j++) {
            if (j !== i) {
                for (let k = n - 1; k > 0; k--) {
                    term[k] = term[k] * -xValues[j] + (term[k - 1] || 0);
                }
                term[0] = term[0] * -xValues[j];
            }
        }

        // Sumar el término calculado a los coeficientes finales del polinomio
        for (let k = 0; k < n; k++) {
            coefficients[k] += term[k];
        }
    }

    // Redondear los coeficientes a 4 decimales
    const roundedCoefficients = coefficients.map(coef => parseFloat(coef.toFixed(3)));

    // Convertir los coeficientes a una representación de polinomio
    let polynomial = '';
    for (let i = roundedCoefficients.length - 1; i >= 0; i--) {
        if (roundedCoefficients[i] !== 0) {
            polynomial += `${roundedCoefficients[i] > 0 && i !== roundedCoefficients.length - 1 ? '+' : ''}${roundedCoefficients[i]}`;
            if (i > 0) polynomial += `x${i > 1 ? '^' + i : ''}`;
        }
    }

    return polynomial;
}


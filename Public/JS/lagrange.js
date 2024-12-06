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
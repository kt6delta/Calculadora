
const formularioCalculadora = document.getElementById('formulario-calculadora')
const resultado = document.getElementById('resultado')

formularioCalculadora.addEventListener('submit',(evento) => {
    evento.preventDefault();
    calcularCalorias()
} )

function calcularCalorias() {
    aparecerResultado();

    const nombre = document.querySelector('#nombre')
    const tipo_documento = document.querySelector('#tipo-documento')
    const documento = document.querySelector('#documento')
    const edad = document.querySelector('#edad')
    const peso = document.querySelector('#peso')
    const altura = document.querySelector('#altura')
    const actividad = document.querySelector('#actividad')
    const genero = document.querySelector('input[name="genero"]:checked')

    // Proceso de Retorno temprano.
    // Primero: lista con los elementos a verificar.
    let campos = [edad,peso,altura,actividad,genero]
    // Luego: llamar a la función que hace las verificaciones.
    if (retornoTemprano(campos)) {
        mostrarMensajeDeError('Por favor diligencie todos los campos')
        return // Al poner este return, se devuelve el mensaje y no se sigue ejecutando el código.
    }

    // Proceso de calcular calorías.
    // Primero: se crea un JSON con constantes que se necesitan para el cálculo.
    const multiplicadorTMB = {
        peso: 10,
        altura: 6.25,
        edad: 5
    }
    // Segundo: se declara la variable para el cálculo de calorías.
    let calculoCalorias;
    // Tercero: condicional para calcular calorías dependiendo del género, aplicando operador ternario.
    calculoCalorias = actividad.value * ( (multiplicadorTMB.peso * peso.value) + (multiplicadorTMB.altura * altura.value) - (multiplicadorTMB.edad * edad.value) + (genero.id=='femenino' ? -161 : 5) )

    // Proceso de mostrasr resultado.
    resultado.innerHTML=`
        <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
            <h5 class="card-title h2">Calorías requeridas</h5>
            <div class="mb-3 w-100">
                <input class="form-control text-center" value="${Math.floor(calculoCalorias)} kcal" style="font-size: 2rem" disabled>
            </div>
            <p>El paciente ${nombre.value} identificado con ${tipo_documento.value} No. ${documento.value}, requiere un total de ${Math.floor(calculoCalorias)} kcal para el sostenimiento de su TBM.</p>
        </div>
    `

}

function retornoTemprano(lista_campos) {
    retTem=false
    for (let campo of lista_campos) {
        if (!(campo.value)) {
            retTem=true
            break
        }
    }
    return retTem
}

function mostrarMensajeDeError(msg) {
    const calculo = document.querySelector('#calculo');
    if (calculo) {
        calculo.remove();
    }

    const divError = document.createElement('div');
    divError.className = 'd-flex justify-content-center align-items-center h-100';
    divError.innerHTML = `<span class="alert alert-danger text-center">${msg}</span>`;

    resultado.appendChild(divError);

    setTimeout(() => {
        divError.remove();
        desvanecerResultado();
    }, 5000);
}

// Animaciones.

function aparecerResultado() {
    resultado.style.top = '100vh';
    resultado.style.display = 'block';
    let distancia = 100;
    let resta = 0.3;
    let id = setInterval(() => {
        resta *= 1.1;
        resultado.style.top = `${distancia - resta}vh`;
        if (resta > 100) {
            clearInterval(id);
        }
    }, 10)
}

function desvanecerResultado() {
    let distancia = 1;
    let id = setInterval(() => {
        distancia *= 2;
        resultado.style.top = `${distancia}vh`;
        if (distancia > 100) {
            clearInterval(id);
            resultado.style.display = 'none';
            resultado.style.top = 0;
        }
    }, 10)
}
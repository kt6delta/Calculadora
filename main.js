
const formularioCalculadora = document.getElementById('formulario-calculadora')
const resultado = document.getElementById('resultado')

formularioCalculadora.addEventListener('submit',(evento) => {
    evento.preventDefault(); // evento corresponde a submit.
    calcularCalorias()
} )

function calcularCalorias() {
    aparecerResultado();

        const edad = document.querySelector('#edad')
        const peso = document.querySelector('#peso')
        const altura = document.querySelector('#altura')
        const actividad = document.querySelector('#actividad')
        const genero = document.querySelector('input[name="genero"]:checked')

        // Retorno temprano.
        // La idea es que todo este proceso de Retorno temprano, sea una función que retorne true o false.
        if (!(edad.value && peso.value && altura.value && actividad.value)){
            mostrarMensajeDeError('Por favor diligencie todos los campos')
            return
        }
       
        const multiplicadorTMB = {
            peso: 10,
            altura: 6.25,
            edad: 5
        }
        
        // INICIA MANERA COMO LO HIZO EL PROFE.
        // let calculoCalorias;
        // // Condicional para calcular la fórmula dependiendo de si el género es femenino o masculino.
        // // Nota: Se puede hacer con un operador ternario o una función.
        // if (genero.id=='femenino') {
        //     // Fórmula mujeres: valor actividad x ( (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) - 161 )
        //     calculoCalorias = actividad.value * ( (multiplicadorTMB.peso * peso.value) + 
        //     (multiplicadorTMB.altura * altura.value) - 
        //     (multiplicadorTMB.edad * edad.value) - 161 )
        // } else {
        //     // Fórmula hombres: valor actividad x ( (10 x peso en kg) + (6,25 × altura en cm) - (5 × edad en años) + 5 )
        //     calculoCalorias = actividad.value * ( (multiplicadorTMB.peso * peso.value) + 
        //     (multiplicadorTMB.altura * altura.value) - 
        //     (multiplicadorTMB.edad * edad.value) + 5 )
        // }        
        // FINALIZA MANERA COMO LO HIZO EL PROFE.

        // INICIA MANERA CON OPERADOR TERNARIO.
        let calculoCalorias;
        calculoCalorias = actividad.value * ( (multiplicadorTMB.peso * peso.value) + (multiplicadorTMB.altura * altura.value) - (multiplicadorTMB.edad * edad.value) + (genero.id=='femenino' ? -161 : 5) )
        // FINALIZA MANERA CON OPERADOR TERNARIO.

        console.log(calculoCalorias)
        resultado.innerHTML=`
            <div class="card-body d-flex flex-column justify-content-center align-items-center h-100" id="calculo">
                <h5 class="card-title h2">Calorías requeridas</h5>
                <div class="mb-3 w-100">
                    <input class="form-control text-center" value="${Math.floor(calculoCalorias)} kcal" style="font-size: 2rem" disabled>
                </div>
            </div>
        `

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
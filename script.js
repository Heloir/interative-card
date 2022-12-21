const fields = document.querySelectorAll('[required]')
const form = document.querySelector('.card-form')
const button = document.querySelector('#card-confirm-button')
const CardBack = document.querySelector('#card-back-number')
const error = document.querySelectorAll('.error')
const finish = document.querySelector('.finish')

const CardName = document.querySelector('#card-front-name')
const CardNumber = document.querySelector('#card-front-number')
const CardDateMonth = document.querySelector('#month')
const CardDateYear = document.querySelector('#year')
const CardNumberInput = document.querySelector('#CardNumberInput')
const CardNameInput = document.querySelector('#CardNameInput')
const CardMonthInput = document.querySelector('#CardMonthInput')
const cvcinput = document.querySelector('#cvcinput')
const CardYearInput = document.querySelector('#CardYearInput')


// SELECTORS


// ATTRIBUTS


function ValidateField(field) {
    // logica para verificar se existem erros
    function verifyErrors() {
        let foundError = false;

        for(let error in field.validity) {
            // se não for customError
            // então verifica se tem erro
            if (field.validity[error] && !field.validity.valid ) {
                foundError = error
            }
        }
        return foundError;
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: "Cant'be blank"
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector("span.error")
        
        if (message) {
            spanError.classList.add("active")
            spanError.innerHTML = message
        } else {
            spanError.classList.remove("active")
            spanError.innerHTML = ""
        }
    }

    return function() {

        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)

            field.style.borderColor = "red"
            setCustomMessage(message)
        } else {
            field.style.borderColor = "green"
            setCustomMessage()
        }
    }
}


function customValidation(event) {

    const field = event.target
    const validation = ValidateField(field)

    validation()

}

for( let field of fields ){
    field.addEventListener("invalid", event => { 
        // eliminar o bubble
        event.preventDefault()

        customValidation(event)
    })
    field.addEventListener("blur", customValidation)
}



form.addEventListener('submit', event =>{

    //Atribuir eventos ao dar Submit
    form.setAttribute('style', 'display: none')
    finish.setAttribute('style', 'display: flex')


    
    // Não vai reiniciar a página
    event.preventDefault()
})











function NameAvaliate(){

    CardNameInput.addEventListener('input', (e) =>{
        CardName.textContent = e.target.value
    })
}

function CardNumberAvaliate(){
    CardNumberInput.addEventListener('input', (e) =>{
        let maskedValue = VMasker.toPattern(e.target.value , "9999 9999 9999 9999")
        CardNumber.textContent = maskedValue
})
}

function CardDateAvaliate(){
    CardMonthInput.addEventListener('input', (e) =>{
        maskedValue = VMasker.toPattern(e.target.value , "99") 
        CardDateMonth.textContent = maskedValue
    })
    CardYearInput.addEventListener('input', (e) =>{
        maskedValue = VMasker.toPattern(e.target.value , "99") 
    CardDateYear.textContent = maskedValue
    })

}

function CVCInputAvaliate(){
cvcinput.addEventListener('input', (e) =>{
    maskedValue = VMasker.toPattern(e.target.value , "999") 
    CardBack.textContent = maskedValue
})
}



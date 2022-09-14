import '../scss/login.scss'

const btnEls = document.querySelectorAll('[title^="btn_"]')
const formWrap = document.getElementById('form-wrap')
btnEls.forEach(el => {

    el.addEventListener('click', () => {

        if(el.title.split('_')[1] === 'signup') {

            formWrap.className = 'signupShow'
            signupFunc()
        } else {

            formWrap.className = 'loginShow'
        }
    })
})

function signupFunc() {
    
    const signupEl = document.getElementById('signup')
    const passEls = signupEl.querySelectorAll('[title^="pass"]')
    // const regPass = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/                     // 영문+숫자 
    // const regPass = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/   // 영문+숫자+특수문자

    window.addEventListener('keyup', e => {

        if(e.target.checkValidity()) {

            validatorHandler.removeErr(e)
            if(signupEl.checkValidity()) {
    
                validatorHandler.activeForm()
            } else {
    
                validatorHandler.unactiveForm()
            }

            // pwd validator
            if(passEls[0].value === passEls[1].value) {
                
                validatorHandler.removeErrMsg()
            } else {
                
                validatorHandler.addErrMsg()
                validatorHandler.unactiveForm()
            }

        } else {
            
            validatorHandler.addErr(e)
        }
    })

    const errMsg = signupEl.querySelector('.errMsg')
    const btnEl = signupEl.querySelector('.main-btn')
    const validatorHandler = {
        removeErr: e => {
            e.target.classList.remove('error')
        },
        addErr: e => {
            e.target.classList.add('error')
            e.target.reportValidity()
            validatorHandler.unactiveForm()
        },
        removeErrMsg: () => {
    
            errMsg.classList.add('isNone')
            passEls[0].classList.remove('error')
            passEls[1].classList.remove('error')
        },
        addErrMsg: () => {
    
            errMsg.classList.remove('isNone')
            passEls[0].classList.add('error')
            passEls[1].classList.add('error')
        },
        unactiveForm: () => {
    
            btnEl.classList.add('unactive')
        },
        activeForm: () => {

            btnEl.classList.remove('unactive')
            btnEl.setAttribute('type', 'submit')
        },
    }
}
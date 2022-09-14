import '../scss/main.scss'
const pickNum = 6

window.onload = function() {

    // btn 속성 reset
    const buttonEls = document.querySelectorAll('button')
    for (let i = 0; i < buttonEls.length; i++) {
        buttonEls[i].addEventListener('click', e => e.preventDefault())
    }

    // 번호 생성
    for (let i = 1; i <= 45; i++) {

        const colors = ['red', 'blue', 'green', 'orange', 'black'];
        const item = document.createElement('div');
        const row = Math.abs(Math.ceil(i / 9 - 1));
        const color = colors[row];
    
        item.classList.add('grid-item');
        // item.classList.add('clickable');
        item.innerText = i;
        item.dataset.value = i;
        item.style.backgroundColor = color;
        document.querySelector('.grid').appendChild(item);
    
        // click Event
        item.addEventListener('click', function() {
            
            EventHandler.addActive(event)
            EventHandler.submitToggle()
        })
    }

    document.querySelector('.reset').addEventListener('click', function() {
        // 1
        EventHandler.activeClear()
        // 2
        EventHandler.submitToggle()
    })
    
    document.querySelector('.random').addEventListener('click', function() {
    
        const activeEls = document.querySelectorAll('.active')
        let activeLength = activeEls.length
    
        while(activeLength < pickNum) {
            EventHandler.randomAddActive()
            activeLength += 1
        }
    })
    
    // OPEN POPUP
    document.querySelector('button[data-id="popup-lotto"]').addEventListener('click', function(e) {
    
        EventHandler.openPopup(event)
    
        // CLOSE POPUP
        document.querySelector('#popup-lotto').addEventListener('click', function() {
            EventHandler.closePopup(event)
        })
    })
}

const EventHandler = {
    activeClear: () => {
        
        const activeEls = document.querySelectorAll('.active')
        
        activeEls.forEach(el => {
            el.classList.remove('active')
        })
    },
    randomAddActive: () => {

        let random = Math.ceil(Math.random()*45)
        const randomNum = document.querySelector(`[data-value="${random}"]`)
        
        if(randomNum.classList.contains('active')) EventHandler.randomAddActive()
        else randomNum.classList.add('active')

        // SUBMIT 활성화
        EventHandler.submitToggle()
    },
    submitToggle: () => {

        const activeEls = document.querySelectorAll('.active')
        const submitBtn = document.querySelector('.submit')

        if(activeEls.length > pickNum-1) submitBtn.setAttribute('type', 'submit')
        else submitBtn.removeAttribute('type', 'submit')
    },
    addActive: event => {
        console.log('addActive')
        
        const activeEls = document.querySelectorAll('.active')
        if(activeEls.length < pickNum) event.target.classList.toggle('active')
        else {
            if(event.target.classList.contains('active')) event.target.classList.remove('active')
            else return false
        }
    },
    openPopup: event => {
        const popupEl = document.querySelector(`#${event.target.dataset.id}`)

        // 번호 RESET
        EventHandler.activeClear()
        EventHandler.submitToggle()
        
        popupEl.setAttribute('aria-hidden', 'false')
        popupEl.classList.remove('hidden')

        
    },
    closePopup: event => {
        const popupEl = event.target

        popupEl.setAttribute('aria-hidden', 'true')
        popupEl.classList.add('hidden')

    }
}
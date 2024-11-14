const main = document.querySelector('main')
const root = document.querySelector(':root')
const input = document.getElementById('input')
const resultInput = document.getElementById('result')
const copy = document.getElementById('copyToClipboard')



const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]
const notNumber = ["(", ")", "/", "*", "-", "+", "%"]

document.querySelectorAll('.charKey').forEach((btn) => {
    btn.addEventListener('click', function () {
        const value = btn.dataset.value
        input.value += value
        input.focus()
    })
})

document.getElementById('clear').addEventListener('click', () => {
    input.value = "";
    input.focus();
})

input.addEventListener('keydown', (ev) => {
    ev.preventDefault()
    if (notNumber.includes(ev.key)) {
        input.value += ' ' + ev.key + " "
        return
    }
    if (allowedKeys.includes(ev.key)) {
        input.value += ev.key
    }
    if (ev.key === "Backspace") {
        if (input.value[input.value.length - 1] === " ") {
            input.value = input.value.slice(0, -2)
        }
        input.value = input.value.slice(0, -1)
    }
    if (ev.key === 'Enter') {
        calculate()
    }
})

document.getElementById('equal').addEventListener('click', calculate)

function calculate() {
    resultInput.value = "ERROR"
    resultInput.classList.add('error')

    const result = eval(input.value)
    resultInput.value = result

    copy.innerText = "Copy"
    copy.classList.remove("success")

    resultInput.classList.remove('error')
}

document.getElementById('themeSwitcher').addEventListener('click', () => {
    if (main.dataset.theme == 'dark') {
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26832a')
        main.dataset.theme = 'light'
    } else {
        root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})

copy.addEventListener('click', (ev) => {
    const button = ev.currentTarget
    if (button.innerText === 'Copy') {
        button.innerText = 'Copied!'
        button.classList.add('success')
        navigator.clipboard.writeText(resultInput.value)
    }
})
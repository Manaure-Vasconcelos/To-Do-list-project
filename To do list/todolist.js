let txttarefa = document.getElementById('tarefa')
let resul = document.getElementById('tableresul')
let botao = document.getElementById('adicionar')
botao.addEventListener('click', adicionar)

function adicionar () {
    let item = document.createElement('li')
    item.innerText = `${txttarefa}`
    resul.appendChild(item)
    tarefa.value = ''
    tarefa.focus()
}
let botao = document.getElementById('adicionar')
botao.addEventListener('click', adicionar)
const localStoragekey = 'to-do-list-mv'

function adicionar () {
    let tarefa = document.getElementById('tarefa')
    tarefa.style.border = ''
    //validation
    if (!tarefa.value) {
        tarefa.style.border = '1px solid red'
        alert('Preencha o campo corretamente.')
    } else if (validartarefa()) {
        alert('Ja existe uma tarefa com essa descrição.')
    } else {
        //Increment to LocalStorage
        /* Foi usado o JSON.parse para pegar a string do input e transformar em ARRAY.
        Foi criado uma constante para dar um nome ao elementos. */        
        let valores = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
        valores.push({
            name: tarefa.value
        })
        localStorage.setItem(localStoragekey, JSON.stringify(valores))
        mostrarvalores () 
    }
    tarefa.value = ''
    tarefa.focus()
}

function mostrarvalores () {
    let valores = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let resul = document.getElementById('tableresul')
    resul.innerHTML = ''
    for (let i = 0; i < valores.length;i++) {
        resul.innerHTML += `<li>${valores[i]['name']}<button id="btn" onclick="remover(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
      </svg></button></li>`
    }
}

function remover (data) {
    let valores = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let index = valores.findIndex(x => x.name == data)
    valores.splice(index, 1)
    localStorage.setItem(localStoragekey, JSON.stringify(valores))
    mostrarvalores()
}

function validartarefa () {
    let valores = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let tarefaValue = document.getElementById('tarefa').value
    let existe = valores.find(x => x.name == tarefaValue)
    return !existe ? false : true
}

mostrarvalores ()
let botao = document.getElementById('adicionar')
botao.addEventListener('click', adicionar)
const localStoragekey = 'to-do-list-mv'
// foi criado um localStorage com um nome padrão.

function adicionar () {
    let tarefa = document.getElementById('tarefa')
    tarefa.style.border = '' 
    //validation
    if (!tarefa.value) {
        // alterou o estilo da borda pra vermelho caso dê errado.
        tarefa.style.border = '1px solid red'
        alert('Preencha o campo corretamente.')
    } else if (validartarefa()) {
        alert('Ja existe uma tarefa com essa descrição.')
    } else {
        //Increment to LocalStorage
        /* Foi usado o JSON.parse para pegar a string do input e transformar em OBJECT.
        Foi criado uma constante para dar um nome ao elementos. */        
        let valores = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
        valores.push({
            name: tarefa.value
        })
        localStorage.setItem(localStoragekey, JSON.stringify(valores)) // setItem para selecionar o item. JSON.stringidy = transfoma um objeto em uma string. 
        mostrarvalores () // Chamando a função aqui para mostrar sempre que adicionar.

    }
    tarefa.value = ''
    tarefa.focus()
}

function mostrarvalores () {
    let valores = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let resul = document.getElementById('tableresul')
    resul.innerHTML = '' // Para sempre limpar a lista antes de mostrar a outra.
    for (let i = 0; i < valores.length;i++) {
        resul.innerHTML += `<li>${valores[i]['name']}<button id="btn" onclick="remover(this)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
      </svg></button></li>`
      // Foi usado um for para varrer todos os valores. usou innerHTML para inserir diretamente o li, button e variaveis.
    }
}

function remover (data) {
    // Para me enviar exatamente a tarefa que queria excluir, passei o parametro THIS.
    let valores = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let index = valores.findIndex(x => x.name == data) // findIndex vai procurar se tem algum name igual ao parametro que foi passado. 
    valores.splice(index, 1)
    // foi usado para remover o name selecionado, e logo após exibir novamente as atuais tarefas.
    localStorage.setItem(localStoragekey, JSON.stringify(valores))
    mostrarvalores()
}

function validartarefa () {
    let valores = JSON.parse(localStorage.getItem(localStoragekey) || "[]")
    let tarefaValue = document.getElementById('tarefa').value
    let existe = valores.find(x => x.name == tarefaValue)
    /*  Foi dado o find com um x, percorrendo o name comparando com a tarefa a ser inserida.
        se ja tiver o mesmo valor de alguma tarefa, então retorna true, se for diferente retorna false.*/
    return !existe ? false : true
}

mostrarvalores ()
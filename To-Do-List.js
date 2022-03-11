// 1° Para manipular o front end com JS
// Vamos precisar selecionar os elemtnos do HTML
// Que são o input text, o button, e a ''ul''.
// para acessá-las crie uma variável que irá selecioná-las com...
// ... o query  document.querySelector('classe ou id');
const task = document.querySelector('.task'); // class do input de tarefas
const botao = document.querySelector('.botao'); // class do botão
const tarefas = document.querySelector('.tarefas'); // class da UL 

// Agora precisamos capturar o evento de 'click' no BOTAO  
// com o addEventListener que precisa de um evento que fica  
// entre aspas ex 'click', e uma função anônima, que vem depois do ' , '

// Vamos criar outra função
function criaTarefa(textoInput){
    // Essa função vai retornar o valor de task seja no console ou em qualquer lugar
    /* vamos jogar o valor da função Criali() aqui dentro para isso precisamos 
    redeclarar li dentro dessa função atual */ 
    const li = criaLi() // esse li dessa função está no escopo local 
    // ele não tem nada a ver com o outro li da função criaLi
    
    // Vamos precisar jogar essa constante desse escopo atual 
    // dentro do nosso HTML, podemos criar um nó aqui, ou usar innerHTML ou Innertext
    li.innerText = textoInput;

    // Agora vamos jogar esse nosso li dentro da nossa ul que é a const global 'tarefas'
    tarefas.appendChild(li);

    limpaTask()
    criaBotaoApagar(li);

    // Agora queremos salvar essas tarefas vamos criar outra função pra isso :) (função até o talo)
    salvarTarefas();
    
}

// Aqui em baixo vamos precisar criar uma lista 
    // usando o document.createElement(nome da tag);
    // mas precisamos declarar uma variável antes e ai jogar o document...
    // mas vamos criar uma função pra isso.
function criaLi () {
    const li = document.createElement('li');
    return li; // o return é importante para a função criar a lista no front end
}
// Nós também queremos que ao apertar a tecla 'Enter' 
//seja como um click do mouse no task ( onde recebomos os textos)
// então iremos criar esse evento. com o addEventListener()
// Lembrando que ele precisa do evento a ser 'lido' ou escutado
// e de uma função anônima que faça algum evento (e)
task.addEventListener('keypress', function(evem) {
    if ( evem.keyCode === 13) {
        criaTarefa(task.value);
    }
});

botao.addEventListener('click', function(e){
    
    if (!task.value) return;
    criaTarefa(task.value); // Aqui ele vai pegar o valor da task e
    // e jogar na função criaTarefa 
    // ( sim é possível mas o 'eu' que escreve aqui não sabe explicar )
});

// Uma boa ideia é que ao enviar uma tarefa
// A barra de texto fique limpa, permitindo escrever uma nova tarega
// Uma função pode resolver nosso problema
function limpaTask() {
    task.value = '';
    task.focus();
}


// Podemos criar uma função que crie um botão de apagar a tarefa que foi adicionada
// Deve ser na li, pois deve-se saber onde esse botão vai ser adicionado
// o melhor é que esse botão de apagar fique  ao lado da tarefa que já foi adicionada. 
function criaBotaoApagar(li) {
    
    // Vamos criar uma constante e dar o valor a ela de criar um elemento
    // no caso o elemento a ser criado é um botão
    // é importante que o botão de apagar, tenha o nome 'Apagar' 
    // para o usuário saber que aquele botão serve para apagar.
    // para isso vamos pegar a constante botaoApagar, botar .innerText = 'Apagar';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerText = 'Apagar';
    // É interessante que haja um espaçamento da tarefa e do botão ao lado do texto
    li.innerText += '  ';
    li.appendChild(botaoApagar) // Aqui faremos a li criar uma 'criança/filha'
    // Que vai receber o valor de botaoApagar que é, ou seja o botão apagar
    // vai ser uma li 

    // Queremos que ao criar a uma lista de tarefas, crie-se ao lado um botão de apagar
    // Então vamos adicionar a função criaBotaoApagar na função de criarTarefas
    
    
    // Agora precisamos fazer o botão de fato apagar..;
    // Para isso precisamos selecionar o botão de apagar
    // Podemos fazer dessa forma 
    // botaoApagar.classList.add('apagar') aqui adiciona uma classe 'apagar' para botaoApagar
    // ou podemos fazer dessa forma
    botaoApagar.setAttribute('class', 'apagar');
    botaoApagar.setAttribute('title', 'Apagar esta tarefa') 
    // O setAttribute ('class ( aqui bota a classe)' , '(aqui o valor da classe)')

    // Precisamos também salvar essas tarefas.
    salvarTarefas();

}
// Aqui precisamos ver se o botão de apagar está sendo realmente clicado.
// Vendo que ele está sendo clicado, teremos que apagar a lista que foi feita (li) através do botão

document.addEventListener('click', function(e){
    const el = e.target;
    // a constante 'el' verifica se o evento (e) tá sendo clicado ( target )
    if( el.classList.contains('apagar')){ 
        // el.classList.contains('apagar) aqui verifica se o atrituto de classe 'apagar' tá sendo requerido
        // el.parentElement como o nome mostra que seleciona o elemento 'pai' e .remove() remove.
        el.parentElement.remove();
        salvarTarefas();
    }
})

function salvarTarefas() {
    // Para salvar precisamos saber quantos 'li' existe salvo na ul
    const liQtdTarefas = tarefas.querySelectorAll('li');
    // A constante é atribuida a nossa 'ul' que é = tarefas
    // O querySelectorAll vai selecionar todas...
    //...tags que colocarmos dentro do parenteses ('')
    const listaDeTarefas = [];
    
    for ( let tarefa of liQtdTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar','').trim();
        console.log(tarefaTexto);
        listaDeTarefas.push(tarefaTexto);
    }
    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJson);

}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    
    for ( let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
}
adicionaTarefasSalvas();

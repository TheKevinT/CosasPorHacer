//selectores
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");


//even listeners

//local storage
document.addEventListener('DOMContentLoaded', getTodos);

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);



//funciones
function addTodo(event) {
    //al dar click en cualquier parte no se haga un refresh del navegador
    event.preventDefault();

    //crear codigo HTML  en JS

    //todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //crear LI

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);


    //Añadir local storage


    saveLocalTodos(todoInput.value);








    //boton de check

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class = "fas fa-check"> </i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //boton de delete

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class = "fas fa-trash"> </i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //añadir a la lista

    todoList.appendChild(todoDiv);

    //limpiar la entrada de texto
    todoInput.value = "";


}

function deleteCheck(e) {

    const item = e.target;

    //borrar los elementos de la lista

    if (item.classList[0] === 'trash-btn') {

        //borrar toda la caja
        const todo = item.parentElement;
        //animacion para borrar
        todo.classList.add("fall");

        //localStorage
        removeLocalTodos(todo);

        todo.addEventListener('transitionend', function() {
            todo.remove();
        });
    }


    //check 

    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });

}

//*****************LOCAL STORAGE **********************
//guardar en local storage

function saveLocalTodos(todo) {

    //CHECK
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem(('todos'), JSON.stringify(todos));
}

//Presentar lo guardado en localStorage 
function getTodos() {

    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo) {
        //todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //crear LI

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        //boton de check

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class = "fas fa-check"> </i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        //boton de delete

        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class = "fas fa-trash"> </i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //añadir a la lista

        todoList.appendChild(todoDiv);
    });
}
//borrar de locaclStorage
function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
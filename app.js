// elements:-
const form = document.querySelector('.add-todos');
const userInput = document.querySelector('.add-a-todo');
const submitUserInput = document.querySelector('.btn');
const ul = document.querySelector('.todos');
const deleteDoneAll = document.querySelector('.delete-done-todos')



// functionality class
class Handler {
    constructor(deletebtn, donebtn) {
        // this.input = userInput.value;
        deletebtn = this.deletebtn;
        donebtn = this.donebtn;
    }
    // methods
    addFromLocalStorage() {
        if (localStorage.length !== 0) {
            let keys = [];
            for (let key in localStorage) { keys.push(key); }
            keys =  keys.slice(0, keys.indexOf('length'));
            keys.forEach(key => todo.display(localStorage[key]))
        }
    }
    add(e) {
        e.preventDefault();
            // grab the data
         let input = userInput.value;

            // validate the data
        if (input !== '') { todo.display(input) }

        else { todo.showMessage('the input can not be empty') }

        todo.clear();

        //todo: we should add to local storage here:
        todo.addToLocalStorage(input);
    }
    clear() {
        userInput.value = '';
    }
    showMessage(message) {
        alert(message)
    }
    display(input) {
        let styling = ['list-group-item-primary', 'list-group-item-success', 'list-group-item-danger','list-group-item-info','list-group-item-dark', 'list-group-item-light']
        let rand = Math.floor(Math.random() *styling.length)
        let li = document.createElement('li');
        li.innerText = input;
        // li.classList.add('col-md-1')
        li.classList.add('list-group-item')
        li.classList.add(styling[rand])
            this.deletebtn = document.createElement('button');
            this.deletebtn.innerText = 'Delete'
            this.deletebtn.classList.add('delete-btn');
            this.deletebtn.classList.add('btn-danger');
            this.deletebtn.classList.add('btn');
            this.donebtn = document.createElement('button');
            this.donebtn.innerText = 'Done'
            this.donebtn.classList.add('undone-btn');
            this.donebtn.classList.add('btn-info');
            this.donebtn.classList.add('btn');
            li.appendChild(this.donebtn);
            // li.appendChild(br);
            li.appendChild(this.deletebtn);
            ul.appendChild(li)
    }
    deleteSingleTodo(e) {
        if (e.target.classList.contains('delete-btn')) {
            let todoName = e.target.parentElement.innerText
            todoName = todoName.slice(0, e.target.parentElement.innerText.indexOf('D'));
            e.target.parentElement.remove();
            console.log(todoName);

            todo.showMessage(`Are you Sure?`)
            todo.showMessage(`${todoName} has been removed`)
             todoName = 'do-'.concat(todoName);
            todo.deleteFromLocalStorage(todoName)
        }
        todo.clear()
    }
    allDeleteAllDone(e) {
        // Delete all
        if (e.target.classList.contains('delete')) {
            todo.showMessage('Are you sure you want to delete all todos?')
            let itemsToDelete = []
            for (let i = 0; i < ul.children.length; i++) { itemsToDelete.push(ul.children[i]); }
            for (let item of itemsToDelete) { item.remove() }
            localStorage.clear();
        }
        // Done All
        if (e.target.classList.contains('done')) {
            todo.showMessage('Are you sure you have done all your todos?')
            for (let i = 0; i < ul.children.length; i++){
            ul.children[i].classList.toggle('disabled')
            ul.children[i].classList.toggle('done')
            }
        }
        todo.clear()
    }
    doneSingleTodo(e) {
        if (e.target.classList.contains('undone-btn')) {

            // this functionality should toggle when pressed
            e.target.parentElement.classList.toggle('done');
            e.target.parentElement.classList.toggle('disabled');
            console.log(e.target.classList);
        }
    }
    addToLocalStorage(data) {
        localStorage.setItem(`do-${data}`, data);
        console.log(localStorage)
    }
    deleteFromLocalStorage(data) {
        localStorage.removeItem(data);
        console.log(localStorage);
    }
    activateTodo(e) {
        // e.target.parentElement.classList.add('active')
        // console.log(e.target.parentElement);
        // e.target.parentElement.classList.toggle('active')
        console.log(e.target)
        e.target.classList.toggle('active')
    }

}

// instantiate the ToDo class
const todo = new Handler();



//  event listeners
window.addEventListener('DOMContentLoaded',todo.addFromLocalStorage)
submitUserInput.addEventListener('click', todo.add);
ul.addEventListener('click', todo.deleteSingleTodo);
ul.addEventListener('click', todo.doneSingleTodo);
deleteDoneAll.addEventListener('click', todo.allDeleteAllDone)
// ul.addEventListener('mousemove', todo.activateTodo )
// submitUserInput.addEventListener('click', todo.display)

let toDoInput; //where the user enters the content of the task
let errorInfo; //info about no tasks / necessity to enter text
let addBtn; //ADD button - adds new items to the list
let ulList; //task list, such UL
let newToDo; //newly added li, new task
let popup; //popup
let popupInfo; //test in the popup, how will you add a pisty text
let todoToEdit; //Edited Todo
let popupInput; //Input in the popup
let popupAddBtn; //'Update' button in the popup
let popupCloseBtn; //'close' button in the popup

document.querySelector('.todo-input').addEventListener('keyup', () => {
  const toDoInput = document.querySelector('.todo-input');
  const addBtn = document.querySelector(".btn-add");
  if (toDoInput.value.length > 0) {
    addBtn.classList.add("visible")
  } else addBtn.classList.remove("visible");


})



const main = () => {
  //calls our functions.
  prepareDOMElements();
  prepareDOMEvents();
}

const prepareDOMElements = () => {
  //We take all items.
  toDoInput = document.querySelector('.todo-input');
  errorInfo = document.querySelector('.error-info');
  addBtn = document.querySelector('.btn-add');
  ulList = document.querySelector('.todolist ul');

  popup = document.querySelector('.popup');
  popupInfo = document.querySelector('.popup-info');
  popupInput = document.querySelector('.popup-input');
  popupAddBtn = document.querySelector('.accept');
  popupCloseBtn = document.querySelector('.cancel');
}

const prepareDOMEvents = () => {

  addBtn.addEventListener('click', addNewToDo);
  ulList.addEventListener('click', checkClick);
  popupCloseBtn.addEventListener('click', closePopup);
  popupAddBtn.addEventListener('click', changeTodoText);
  toDoInput.addEventListener('keyup', enterKeyCheck);

}

const addNewToDo = () => {
  //We create a new task.
  if (toDoInput.value != '') {
    newToDo = document.createElement('li');
    newToDo.textContent = toDoInput.value;


    createToolAreal();
    //We add our ToDo to the ul list.
    ulList.append(newToDo);

    toDoInput.value = '';
    errorInfo.textContent = '';
    errorInfo.style.border = 'none';

  } else {
    errorInfo.textContent = 'Enter the work content!';
    errorInfo.style.border = "1px solid rgba(245, 245, 245, 0.3)";
  }
}

const createToolAreal = () => {

  const div = document.createElement('div');
  div.classList.add('tools');

  // Add our tools to the new toDo.

  newToDo.append(div);

  const buttonDone = document.createElement('button');
  buttonDone.classList.add('complete');
  buttonDone.innerHTML = '<i class="fas fa-check"></i>'

  const buttonEdit = document.createElement('button');
  buttonEdit.classList.add('edit');
  buttonEdit.innerText = 'Edit'

  const buttonCancel = document.createElement('button');
  buttonCancel.classList.add('delete');
  buttonCancel.innerHTML = '<i class="fas fa-trash"></i>'

  // Add the elements together.

  div.append(buttonDone, buttonEdit, buttonCancel);
}

// function that checks what we clicked (to know whether to end the task, delete it or modify it)

const checkClick = (e) => {
  if (e.target.matches('.complete')) {
    e.target.closest('li').classList.toggle('completed');

  } else if (e.target.matches('.edit')) {
    editToDo(e);

  } else if (e.target.matches('.delete')) {
    deleteToDo(e);

  }
}

// Functions responsible for the popup

const editToDo = (e) => {
  todoToEdit = e.target.closest('li'); // modify the li closest to the button (message - B);
  popupInput.value = todoToEdit.firstChild.textContent; // We assign to input (editor) the value we had in the li element's child (text).
  popup.style.display = 'flex';
}

const closePopup = () => {
  popup.style.display = 'none';
  popupInfo.textContent = '';
}

//function to apply changes from input to our li element

const changeTodoText = () => {
  if (popupInput.value != '') {
    todoToEdit.firstChild.textContent = popupInput.value;

    popup.style.display = 'none';
    popupInfo.textContent = '';
  } else {
    popupInfo.textContent = 'You have to provide some content!';
  }
}

const deleteToDo = (e) => {
  e.target.closest('li').remove();

  // Show hidden message when there is no element/task in the list.

  const allToDos = ulList.querySelectorAll('li');
  if (allToDos.length == 0) {
    errorInfo.textContent = 'There are no tasks in the list'
  }
}

// We also add todo on enter.

const enterKeyCheck = (e) => {
  if (e.key == 'Enter') {
    addNewToDo();
  }
}

// Executed when a change occurs on the page.

document.addEventListener('DOMContentLoaded', main);
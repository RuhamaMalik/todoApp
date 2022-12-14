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

    //czyscimy error jak i input po dodaniu ToDo
    toDoInput.value = '';
    errorInfo.textContent = '';
  } else {
    errorInfo.textContent = 'Wpisz tre???? zadania!';
  }
}

const createToolAreal = () => {
  //towrzymy elementy (przyciski i dodajemy do toDo)
  const div = document.createElement('div');
  div.classList.add('tools');
  //dodajemy nasze toolsy do nowego toDo
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

  //dodajemy elementy do siebie 
  div.append(buttonDone, buttonEdit, buttonCancel);
}

//funkcjs sprawdzaj??ca w co klikamy (aby wiedziec czy zakonczyc task czy moze go usunac czy edytowac)
const checkClick = (e) => {
  if (e.target.matches('.complete')) {
    e.target.closest('li').classList.toggle('completed'); //po nacisnieciu complete do najblizszego elementu li (dziadka) dodajemy klase completed
    e.target.classList.toggle('completed');

  } else if (e.target.matches('.edit')) {
    editToDo(e);

  } else if (e.target.matches('.delete')) { //else if poniewaz gdybysmy klikneli wszedzie poza delete tez by sie wykonal warunek
    deleteToDo(e);

  }
}

//funkcje odpowiedzialne za popup
const editToDo = (e) => {
  todoToEdit = e.target.closest('li'); //edytujemy nablizsze li do przycisku (wiadomka B-) )
  popupInput.value = todoToEdit.firstChild.textContent; //przypisujemy do inputa (edytora) wartosc ktora mielismy w child (tekst) elementu li 
  popup.style.display = 'flex';
}

const closePopup = () => {
  popup.style.display = 'none';
  popupInfo.textContent = '';
}

//funkcja wprowadzajaca zmiany z inputa do naszego elementu li
const changeTodoText = () => {
  if (popupInput.value != '') {
    todoToEdit.firstChild.textContent = popupInput.value;

    popup.style.display = 'none';
    popupInfo.textContent = '';
  } else {
    popupInfo.textContent = 'You have to provide some content!!';
  }
}

const deleteToDo = (e) => {
  e.target.closest('li').remove(); //style.display = 'none' jak poczatkowo myslalem tez by zadzialala ale ta better B-)

  //wyswietlamy brak elementow gdy ich nie ma
  const allToDos = ulList.querySelectorAll('li');
  if (allToDos.length == 0) {
    errorInfo.textContent = 'There are no tasks in the list'
  }
}

//wykonujemy te?? dodanie todo na enterze
const enterKeyCheck = (e) => {
  if (e.key == 'Enter') {
    addNewToDo();
  }
}

//wykonuje si?? w przypadku zmiany na stronie
document.addEventListener('DOMContentLoaded', main);
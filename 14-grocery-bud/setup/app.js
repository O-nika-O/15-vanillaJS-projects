// ****** SELECT ITEMS **********
const alertV = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// edit option
let editElement;
let editFLag = false;
let editID = "";
// ****** EVENT LISTENERS **********
//submit form
form.addEventListener("submit", addItem);
// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  //creates an everchanging id number
  const id = new Date().getTime().toString();
  if (value && !editFLag) {
    //adds new element to the list creating an html object*
    const element = document.createElement("article");
    //add class to the previous element
    element.classList.add("grocery-item");
    //add id to the previous element
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML = ` <p class="title">${value}</p>
    <div class="btn-container">
      <button type="button" class="edit-btn">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn">
        <i class="fas fa-trash"></i>
      </button>
    </div>`;
    //append child to the list element in the html
    list.appendChild(element);
    //display alert
    displayAlert("item added to the list", "success");
    //show container
    container.classList.add('show-container');
    //add to local to local storage
    addToLocalStorage(id, value);
    //set back to default+
    setBackTodDefault()
  } else if (value && editFLag) {
    console.log("editing");
  } else {
    displayAlert("please enter value", "danger");
  }
}
//display alert
function displayAlert(text, action) {
  alertV.textContent = text;
  alertV.classList.add(`alert-${action}`);

  //remove alert
  setTimeout(function () {
    alertV.textContent = "";
    alertV.classList.remove(`alert-${action}`);
  }, 1000);
}
//set back to default
function setBackTodDefault(){
  console.log('SET BACK TO DEFAULT')
}
// ****** LOCAL STORAGE **********
function addToLocalStorage (id, value){
  console.log('added to local storage');
}
// ****** SETUP ITEMS **********

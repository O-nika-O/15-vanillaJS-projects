//***CHALLENGE */
//use bubbling on parent element
//add the event listener for the iitem buttoms on the ".grocery-list"

// ****** SELECT ITEMS **********
const alertV = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

// for theedit option
let editElement;
let editFLag = false;
let editID = "";

// ****** EVENT LISTENERS **********
//submit form
form.addEventListener("submit", addItem);
//clear items
clearBtn.addEventListener("click", clearItems);
//load items (DOM)
window.addEventListener("DOMContentLoaded", setupItems());

// ****** FUNCTIONS **********
//to add an item // to edit an item // to
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  //creates an everchanging id number
  const id = new Date().getTime().toString();
  if (value && !editFLag) {
    createListItem(id, value);
    //display alert
    displayAlert("item added to the list", "success");

    //show container
    container.classList.add("show-container");

    //add to local to local storage
    addToLocalStorage(id, value);

    //set back to default
    setBackToDefault();
  } else if (value && editFLag) {
    //assingning this new value to the variable (input html)
    editElement.innerHTML = value;
    displayAlert("value changed", "success");
    // edit local storage
    editLocalStorage(editID, value);
    setBackToDefault();
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
  }, 800);
}

//edit item function
function editItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  //set edit item: selects the previous title to the parent(btn-container)
  editElement = e.currentTarget.parentElement.previousElementSibling;
  //set form value: so you can see the title in the input form
  grocery.value = editElement.innerHTML;
  // we can access and edit the value now
  editFLag = true;
  editID = element.dataset.id;
  submitBtn.textContent = "edit";
}

//delete item function
function deleteItem(e) {
  const element = e.currentTarget.parentElement.parentElement;
  const id = element.dataset.id;
  list.removeChild(element);
  if (list.children.length === 0) {
    container.classList.remove("show-container");
  }
  displayAlert("item removed", "danger");
  setBackToDefault();
  // remove from local storage
  removeFromLocalStorage(id);
}

//clear items
function clearItems() {
  const items = document.querySelectorAll(".grocery-item");

  if (items.length > 0) {
    items.forEach(function (item) {
      //the item gets removed from the parent
      list.removeChild(item);
    });
  }
  //remove the button and display the alert
  container.classList.remove("show-container");
  displayAlert("empty list", "danger");
  setBackToDefault();
  localStorage.removeItem("list");
}

//set back to default
function setBackToDefault() {
  grocery.value = "";
  editFLag = false;
  editID = "";
  submitBtn.textContent = "submit";
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  //gets you the id and value as an object(array)
  const grocery = { id, value };
  //getting the items so you check them before any change
  let items = getLocalStorage();
  //put the items in the beforehand set array
  items.push(grocery);
  //set the array in the localStorage
  localStorage.setItem("list", JSON.stringify(items));
}
function removeFromLocalStorage(id) {
  let items = getLocalStorage();
  //you can use filter bc we used "let"
  items = items.filter(function (item) {
    if (item.id !== id) {
      return item;
    }
  });
  //overwrites my existing array with the new filtered one
  localStorage.setItem("list", JSON.stringify(items));
}
function editLocalStorage(id, value) {
  let items = getLocalStorage();
  //map gets a new array just like filter
  items = items.map(function (item) {
    if (item.id === id) {
      //replaces the old value with the new one submited on the edit func
      item.value = value;
    }
    return item;
  });
  //overwrites my existing array with the new filtered one
  localStorage.setItem("list", JSON.stringify(items));
}
function getLocalStorage() {
  //getting the items so you check them before any change
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
// localStorage API
//setItem
//removeItem
//save as strings
// ****** SETUP ITEMS **********
function setupItems() {
  let items = getLocalStorage();
  if (items.length > 0) {
    items.forEach(function (item) {
      createListItem(item.id, item.value);
    });
    container.classList.add("show-container");
  }
}
//this function was extracted from the addItem func
function createListItem(id, value) {
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
  //get form this new element the listeners for the buttoms
  const deleteBtn = element.querySelector(".delete-btn");
  const editBtn = element.querySelector(".edit-btn");
  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);

  //append child to the list element in the html
  list.appendChild(element);
}

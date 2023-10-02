const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearAllBtn = document.querySelector(".btn-clear");
const items = itemList.querySelectorAll("li");
const itemFilter = document.querySelector(".form-input-filter");

const getItemsFromStorage = () => {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
};

const displayItems = () => {
  itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkUI();
};

const addItemSubmit = (e) => {
  e.preventDefault();
  if (itemInput.value === "") {
    alert("Please enter item name");
  } else {
    addItemToDom(itemInput.value);
    addItemToStorage(itemInput.value);
    itemInput.value = "";
    checkUI();
  }
};

const addItemToDom = (item) => {
  const newItem = document.createElement("li");
  newItem.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  newItem.appendChild(button);
  itemList.appendChild(newItem);
};

const addItemToStorage = (item) => {
  itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const createButton = (classes) => {
  const newButton = document.createElement("button");
  newButton.className = classes;
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";
  newButton.appendChild(icon);
  return newButton;
};

const removeItem = (e) => {
  if (e.target.nodeName === "I") {
    if (confirm("Are you sure?")) {
      const element = e.target.parentElement.parentElement;
      element.remove();
    }
    checkUI();
  }
};

const clearAllItems = (e) => {
  if (confirm("Delete all?")) {
    while (itemList.firstChild) {
      itemList.firstChild.remove();
    }
    checkUI();
  }
};

const checkUI = () => {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearAllBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearAllBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
};

const filterItems = () => {
  items.forEach((item) => {
    if (
      !item.innerText.toLowerCase().includes(itemFilter.value.toLowerCase())
    ) {
      item.style.display = "none";
    } else {
      item.style.display = "block";
    }
  });
};

itemForm.addEventListener("submit", addItemSubmit);
itemList.addEventListener("click", removeItem);
clearAllBtn.addEventListener("click", clearAllItems);
itemFilter.addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", displayItems);

checkUI();

// localStorage and sessionStorage
// property on Window interface that allows us to access Storage object
// data stored in key/value pair, value are strings, cannot store objects
// localStorage does not expire while sessionStorage only last till page closed

// // Helpfull methods
// // set a value with a key
// localStorage.setItem("name", "Brad");
// // get a value using the key
// localStorage.getItem("name");
// // remove item using the key
// localStorage.removeItem("name");
// // clear all values
// localStorage.clear();

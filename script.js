const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");
const clearAllBtn = document.querySelector(".btn-clear");
const items = itemList.querySelectorAll("li");
const itemFilter = document.querySelector(".form-input-filter");
const formBtn = document.querySelector(".btn");
let isEditMode = false;

// get items from local storage
const getItemsFromStorage = () => {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    // convert to Javascript object
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
};

// display items
const displayItems = () => {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));
  checkUI();
};

// add new item to dom and localStorage
const addItemSubmit = (e) => {
  e.preventDefault();
  if (itemInput.value === "") {
    alert("Please enter item name");
  } else {
    if (isEditMode) {
      let itemToEdit;
      itemList.querySelectorAll("li").forEach((item) => {
        if (item.style.color === "grey") {
          itemToEdit = item;
        }
      });
      removeItem(itemToEdit);
      isEditMode = false;
      formBtn.innerHTML = `<i class="fa-solid fa-plus"></i> Add Item`;
      formBtn.style.backgroundColor = "green";
    }
    addItemToDom(itemInput.value);
    addItemToStorage(itemInput.value);
    itemInput.value = "";
    checkUI();
  }
};

// add item to dom
const addItemToDom = (item) => {
  const newItem = document.createElement("li");
  newItem.appendChild(document.createTextNode(item));
  const button = createButton("remove-item btn-link text-red");
  newItem.appendChild(button);
  itemList.appendChild(newItem);
};

// add item to localStorage
const addItemToStorage = (item) => {
  itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

// create delete cross button
const createButton = (classes) => {
  const newButton = document.createElement("button");
  newButton.className = classes;
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";
  newButton.appendChild(icon);
  return newButton;
};

// get the li item that was clicked on
const onClickItem = (e) => {
  if (e.target.nodeName === "I") {
    removeItem(e.target.parentElement.parentElement);
  }
  if (e.target.nodeName === "LI") {
    setItemToEdit(e.target);
  }
};

// on clicking an item li we change to edit mode
const setItemToEdit = (item) => {
  isEditMode = true;
  itemList
    .querySelectorAll("li")
    .forEach((item) => (item.style.color = "#333"));
  item.style.color = "grey";
  formBtn.innerHTML = `<i class="fa-solid fa-pen"></i>
  Update Item`;
  formBtn.style.backgroundColor = "#333";
  itemInput.value = item.textContent;
};

// remove item from dom and localStorage
const removeItem = (item) => {
  if (confirm("Are you sure?")) {
    item.remove();
    removeItemFromStorage(item.textContent);
  }
  checkUI();
};

// remove item from storage
const removeItemFromStorage = (itemToBeDeleted) => {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage = itemsFromStorage.filter(
    (item) => item.toLowerCase() !== itemToBeDeleted.toLowerCase()
  );
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

// remove all items from dom and storage
const clearAllItems = (e) => {
  if (confirm("Delete all?")) {
    while (itemList.firstChild) {
      itemList.firstChild.remove();
    }
    localStorage.removeItem("items");
    checkUI();
  }
};

// make filter option invisible if no items present
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

// filter item
const filterItems = (e) => {
  const items = itemList.querySelectorAll("li");
  items.forEach((item) => {
    if (
      !item.innerText.toLowerCase().includes(itemFilter.value.toLowerCase())
    ) {
      item.style.display = "none";
    } else {
      item.style.display = "flex";
    }
  });
};

// Event listeners
itemForm.addEventListener("submit", addItemSubmit);
itemList.addEventListener("click", onClickItem);
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

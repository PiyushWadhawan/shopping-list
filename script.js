const itemForm = document.querySelector("#item-form");
const itemInput = document.querySelector("#item-input");
const itemList = document.querySelector("#item-list");

const addItem = (e) => {
  e.preventDefault();
  if (itemInput.value === "") {
    alert("Please enter item name");
  } else {
    const newItem = document.createElement("li");
    newItem.appendChild(document.createTextNode(itemInput.value));
    const button = createButton("remove-item btn-link text-red");
    newItem.appendChild(button);
    itemList.appendChild(newItem);
    itemInput.value = "";
  }
};

const createButton = (classes) => {
  const newButton = document.createElement("button");
  newButton.className = classes;
  const icon = document.createElement("i");
  icon.className = "fa-solid fa-xmark";
  newButton.appendChild(icon);
  console.log(newButton);
  return newButton;
};

const removeItem = (e) => {
  if (e.target.nodeName === "I") {
    const element = e.target.parentElement.parentElement;
    element.remove();
  }
};

itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);

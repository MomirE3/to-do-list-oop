class List {
  constructor() {
    this.items = [];
  }

  addItems(taskName) {
    this.items.push(taskName);
  }

  removeItems(index) {
    this.items.splice(index, 1);
  }

  displayList(listItem) {
    listItem.innerHTML = "";
    this.items.forEach((element, index) => {
      let div = document.createElement("div");
      div.classList.add("item-background", "mx-auto", "my-auto", "mb-2");

      let i = document.createElement("i");
      i.classList.add("bi", "bi-trash");

      let span = document.createElement("span");
      span.classList.add("ms-2");
      span.append(element);

      let deleteButton = document.createElement("button");
      deleteButton.classList.add("btn", "btn-danger", "me-2");
      deleteButton.appendChild(i);
      deleteButton.append("Delete");
      deleteButton.addEventListener("click", () => {
        this.removeItems(index);
        this.displayList(listItem);
      });

      div.appendChild(span);
      div.appendChild(deleteButton);
      listItem.appendChild(div);

      document.querySelector("#inputValue").value = ``;
    });
  }
}

const input = document.querySelector("#inputValue");
const button = document.querySelector("#searchButton");
const listItem = document.querySelector("#mainDiv");

button.addEventListener("click", addItem);
input.addEventListener("keypress", pressEnter);

let list = new List();

function addItem(event) {
  const taskName = input.value;
  if (taskName === "") {
    event.preventDefault();
    input.placeholder = "You must write something!";
  } else {
    input.placeholder = "Add item to list";
    list.addItems(taskName);
    list.displayList(listItem);
  }
}

function pressEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    button.click();
  }
}

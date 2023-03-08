class List {
  constructor() {
    this.items = [];
  }

  addItems(taskName) {
    this.items.push(taskName);
  }

  displayList(listItem) {
    listItem.innerHTML = "";
    this.items.forEach((element) => {
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

      div.appendChild(span);
      div.appendChild(deleteButton);
      listItem.appendChild(div);

      console.log(element);
    });
  }
}

const input = document.querySelector("#inputValue");
const button = document.querySelector("#searchButton");
const listItem = document.querySelector("#radi");

let list = new List();

function addItem() {
  const taskName = input.value;

  list.addItems(taskName);
  list.displayList(listItem);
}

button.addEventListener("click", addItem);

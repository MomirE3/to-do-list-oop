class ToDoList {
  constructor(data) {
    this.tasks = data;
  }

  addTasks(task) {
    this.tasks.push(task);
  }

  removeTasks(index) {
    return this.tasks.splice(index, 1);
  }
}

class Task {
  constructor(name) {
    this.name = name;
    this.done = false;
  }
}

class UserInterface {
  constructor(list) {
    this.list = list;
    this.addButton = document.querySelector("#searchButton");

    this.addButton.addEventListener("click", () => {
      this.addTask();
    });
  }

  updatedTasks() {
    fetch("https://to-do-list-1715f-default-rtdb.firebaseio.com/tasks.json")
      .then((res) => res.json())
      .then((data) => {
        let list = new ToDoList(data);
        let tasks = new UserInterface(list.tasks);
        tasks.display();
      })
      .catch((err) => console.log(err));
  }

  display() {
    Object.values(this.list).forEach((element) => {
      this.createDivForTask(element.name, element.done);
    });
  }

  createDivForTask(elementName, elementDone) {
    let mainDiv = document.querySelector("#mainDiv");
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("item-background", "mb-2", "mx-auto");
    taskDiv.append(this.createParagraph(elementName));

    let buttonHolder = document.createElement("div");
    buttonHolder.append(this.createDoneButton(elementDone));
    buttonHolder.append(this.createDeleteButton());
    taskDiv.appendChild(buttonHolder);
    mainDiv.appendChild(taskDiv);
  }

  createParagraph(elementName) {
    let p = document.createElement("p");
    p.append(elementName);
    p.classList.add("my-auto", "ms-2");
    return p;
  }

  createDeleteButton() {
    let deleteButton = document.createElement("button");
    deleteButton.classList.add("bi", "bi-trash", "btn", "bg-danger", "me-2");
    return deleteButton;
  }

  createDoneButton(elementDone) {
    let doneButton = document.createElement("button");
    if (elementDone === true) {
      doneButton.classList.add("bi", "bi-check2", "btn", "bg-danger", "me-2");
      return doneButton;
    } else {
      doneButton.classList.add("bi", "bi-x", "btn", "bg-danger", "me-2");
      return doneButton;
    }
  }

  addTask() {
    const inputValue = document.querySelector("#inputValue").value.trim();
    if (inputValue !== "") {
      const task = new Task(inputValue);
      this.updateTasks(task);
      document.querySelector("#inputValue").value = "";
      document.querySelector("#mainDiv").innerHTML = ``;
      this.updatedTasks();
    }
  }

  updateTasks(task) {
    fetch(`https://to-do-list-1715f-default-rtdb.firebaseio.com/tasks.json`, {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }
}
fetch("https://to-do-list-1715f-default-rtdb.firebaseio.com/tasks.json")
  .then((res) => res.json())
  .then((data) => {
    let list = new ToDoList(data);
    let tasks = new UserInterface(list.tasks);
    tasks.display();
  })
  .catch((err) => console.log(err));

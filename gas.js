class ToDoList {
  constructor() {
    this.tasks = [];
  }

  // Add a task to the list
  addTask(task) {
    this.tasks.push(task);
  }

  // Remove a task from the list
  removeTask(task) {
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

  // Mark a task as complete
  completeTask(task) {
    task.complete();
  }

  // Get all incomplete tasks
  getIncompleteTasks() {
    return this.tasks.filter((task) => !task.isComplete());
  }

  // Get all completed tasks
  getCompletedTasks() {
    return this.tasks.filter((task) => task.isComplete());
  }
}

// Define the Task class
class Task {
  constructor(description) {
    this.description = description;
    this.completed = false;
  }

  // Mark the task as complete
  complete() {
    this.completed = true;
  }

  // Check if the task is complete
  isComplete() {
    return this.completed;
  }
}

// Define the UserInterface class
class UserInterface {
  constructor(list) {
    this.list = list;
    this.form = document.querySelector("#newTaskForm");
    this.taskInput = document.querySelector("#newTaskInput");
    this.taskList = document.querySelector("#taskList");

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();
      this.addTask();
    });

    this.taskList.addEventListener("click", (event) => {
      const taskItem = event.target.closest("li");
      if (event.target.matches(".completeButton")) {
        const task = taskItem.task;
        this.list.completeTask(task);
        this.render();
      } else if (event.target.matches(".deleteButton")) {
        const task = taskItem.task;
        this.list.removeTask(task);
        this.render();
      }
    });
  }

  // Add a task to the list
  addTask() {
    const description = this.taskInput.value.trim();
    if (description !== "") {
      const task = new Task(description);
      this.list.addTask(task);
      this.render();
      this.taskInput.value = "";
    }
  }

  // Render the task list
  render() {
    this.taskList.innerHTML = "";
    this.list.getIncompleteTasks().forEach((task) => {
      const taskItem = this.createTaskItem(task);
      this.taskList.appendChild(taskItem);
    });
    this.list.getCompletedTasks().forEach((task) => {
      const taskItem = this.createTaskItem(task);
      taskItem.classList.add("completedTask");
      this.taskList.appendChild(taskItem);
    });
  }

  // Create a task item element
  createTaskItem(task) {
    const taskItem = document.createElement("li");
    taskItem.task = task;
    const taskDescription = document.createElement("span");
    taskDescription.innerText = task.description;
    const completeButton = document.createElement("button");
    completeButton.innerText = "Complete";
    completeButton.classList.add("completeButton");
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("deleteButton");
    taskItem.appendChild(taskDescription);
    taskItem.appendChild(completeButton);
    taskItem.appendChild(deleteButton);
    return taskItem;
  }
}

// Initialize the app
const list = new ToDoList();
const ui = new UserInterface(list);
ui.render();

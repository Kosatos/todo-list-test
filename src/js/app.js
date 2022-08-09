import Task from './components/Task';

window.onload = () => {
  const todoTasks = [];

  const todoList = document.getElementById('todo-list');
  const addTaskBtn = document.getElementById('add-task-btn');

  const createTaskPopup = document.getElementById('create-task-popup');
  const createForm = document.getElementById('create-form');

  addTaskBtn.addEventListener('click', () => {
    createTaskPopup.classList.toggle('show');
  });

  createForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('create-task-name').value;
    const note = document.getElementById('create-task-note').value;
    const deadline = document.getElementById('create-task-deadline').value;

    const taskData = {
      name: name,
      note: note,
      deadline: deadline,
    };

    const task = new Task(taskData);
    todoTasks.push(task);
    todoList.appendChild(task.renderTask());
    console.log(task);

    createTaskPopup.classList.toggle('show');
    createForm.reset();
  });
};

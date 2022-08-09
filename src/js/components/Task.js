import { v4 as uuid } from 'uuid';

export default class Task {
  constructor(data) {
    this.name = data?.name;
    this.note = data?.note;
    this.date = new Date().getTime();
    this.deadline = data?.deadline;
    this.status = 'pending';
    this.id = uuid();
  }

  renderTask() {
    this.taskEl = document.createElement('li');
    this.taskEl.className = 'todo-list__item todo-list-item';

    this.taskNameEl = document.createElement('h4');
    this.taskNameEl.textContent = this.name;
    this.taskNameEl.className = 'todo-list-item__name';

    this.taskControllersEl = document.createElement('div');
    this.taskControllersEl.className = 'todo-list-item__controllers';
    this.taskCompleteEl = document.createElement('div');
    this.taskCompleteEl.className =
      'todo-list-item__controller task-complete-btn';
    this.taskDeleteEl = document.createElement('div');
    this.taskDeleteEl.className = 'todo-list-item__controller task-delete-btn';

    this.taskControllersEl.appendChild(this.taskCompleteEl);
    this.taskControllersEl.appendChild(this.taskDeleteEl);

    this.taskEl.appendChild(this.taskNameEl);
    this.taskEl.appendChild(this.taskControllersEl);

    this.taskCompleteEl.addEventListener('click', () => {
      this.completeBtnListener(this.taskEl);
    });
    this.taskDeleteEl.addEventListener('click', () => {
      this.deleteBtnListener(this.taskEl);
    });

    return this.taskEl;
  }

  completeBtnListener(taskEl) {
    if (
      this.status === 'complete' &&
      taskEl.classList.contains('task-complete')
    ) {
      taskEl.classList.toggle('task-complete');
      this.status = 'pending';
      return;
    }

    taskEl.classList.toggle('task-complete');
    this.status = 'complete';
  }

  deleteBtnListener(taskEl) {
    taskEl.remove();
    this.status = 'deleted';
  }

  formatDate() {
    const day =
      this.date.getDate() < 10
        ? `0${this.date.getDate()}`
        : this.date.getDate();
    const month =
      this.date.getMonth() < 10
        ? `0${this.date.getMonth()}`
        : this.date.getMonth();
    const year = String(this.date.getFullYear()).slice(-2);

    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  }
}

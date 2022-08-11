import clearForm from '../utils/clearForm';
import renderForm from '../utils/renderForm';

// Класс для работы с задачей, принимает в себя данные, включающие в себя имя, заметки и дэдлайн

export default class Task {
  constructor(data) {
    this.name = data.name;
    this.note = data?.note;
    this.date = new Date();
    this.deadline = data?.deadline;
    this.status = 'pending';
  }

  // renderTask создает DOM-элемент задачи и вешает обработчики событий на кнопки завершения, удаления и на нажатие по самой задаче.
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

    this.taskEl.addEventListener('click', (event) => {
      // Проверяем, чтобы не обрабатывался клик по кнопкам удаления и завершения задачи
      if (
        event.target == this.taskDeleteEl ||
        event.target == this.taskCompleteEl
      ) {
        return;
      }
      // Рендерим форму редактирования задачи
      this.renderEditForm();
    });

    this.taskCompleteEl.addEventListener('click', () => {
      this.completeBtnListener();
    });
    this.taskDeleteEl.addEventListener('click', () => {
      this.deleteBtnListener();
    });

    return this.taskEl;
  }

  // renderEditForm создает DOM-элемент формы редактирования задачи и вешает обработчики событий на кнопки редактирвоания/сохранения и старда выполнения задачи.
  renderEditForm() {
    // Рендерим разметку формы с привязкой к контексту класса
    renderForm.call(this);

    // Присваиваем инпутам редактирования текущие значения данных задачи
    this.editNameInput.value = this.name;
    this.editNoteInput.value =
      this.note && this.note !== '' ? this.note : 'There are no notes.';
    this.editDeadlineInput.value = this.deadline
      ? this.deadline
      : 'There is no deadline.';
    this.createDateEl.textContent = this.formatDate(this.date);

    // Проверяем состаяние задачи для включения или отключения кнопки старта выполнения задачи
    this.getStartedBtn.disabled =
      this.status === 'complete' || this.status === 'process' ? true : false;

    this.editBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.editTask();
    });

    // При нажатии на кнопку getStarted(старт выполнения задачи) меняем состояние задачи на "process", отключаем кнопку
    this.getStartedBtn.addEventListener('click', (event) => {
      event.preventDefault();
      this.getStartedBtnListener();
      this.getStartedBtn.disabled = true;
    });
  }

  // editTask при нажатии на Edit разрешает редактирование данных задачи, при нажатии на Save сохраняет измененные данные и запрещает редактирование
  editTask() {
    if (!this.editBtn) {
      return;
    }

    if (this.editBtn.textContent === 'Edit') {
      this.saveOrEditEl(false, 'Save');
      return;
    }

    // сохраняем измененные данные
    this.name =
      this.editNameInput && this.editNameInput !== ''
        ? this.editNameInput.value
        : 'Untitled';
    this.note =
      this.editNoteInput && this.editNoteInput !== ''
        ? this.editNoteInput.value
        : 'There are no notes.';
    this.deadline = this.editDeadlineInput
      ? this.editDeadlineInput.value
      : 'There is no deadline.';

    if (this.taskNameEl) {
      this.taskNameEl.textContent = this.name;
    }

    this.saveOrEditEl('readonly', 'Edit');
  }

  // getStartedBtnListener изменяет состояние задачи на "process"
  getStartedBtnListener() {
    if (!this.taskEl) {
      return;
    }
    if (this.status !== 'pending') {
      return;
    }

    this.taskEl.classList.add('task-process');
    this.status = 'process';
  }

  // completeBtnListener изменяет состояние задачи на "complete"/"pending"
  completeBtnListener() {
    if (!this.taskEl) {
      return;
    }
    if (
      this.status === 'complete' &&
      this.taskEl.classList.contains('task-complete')
    ) {
      this.taskEl.classList.toggle('task-complete');
      this.status = 'pending';
      if (this.getStartedBtn) {
        this.getStartedBtn.disabled = false;
      }

      return;
    }

    if (
      this.status === 'process' &&
      this.taskEl.classList.contains('task-process')
    ) {
      this.taskEl.classList.toggle('task-process');
    }

    if (this.getStartedBtn) {
      this.getStartedBtn.disabled = true;
    }

    this.taskEl.classList.toggle('task-complete');
    this.status = 'complete';
  }

  // deleteBtnListener удаляет DOM-элемент задачи, переводит его состояние в 'deleted'
  deleteBtnListener() {
    if (!this.taskEl) {
      return;
    }
    this.taskEl.remove();
    this.status = 'deleted';
    if (this.editForm) {
      clearForm(this.editForm);
    }
  }

  // saveOrEditEl - функция для управления состоянием формы редактирования(Edit/Save)
  saveOrEditEl(readonly, btnText) {
    const editElements = [
      this.editNameInput,
      this.editNoteInput,
      this.editDeadlineInput,
    ];

    editElements.forEach((el) => {
      if (el) {
        el.readOnly = readonly;
        btnText === 'Save'
          ? el.classList.add('edit')
          : el.classList.remove('edit');
      }
    });
    this.editBtn.textContent = btnText;
  }

  // formatDate приводит дату к формату дд.мм.гггг
  formatDate(date) {
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month =
      date.getMonth() < 10 ? `0${date.getMonth()}` : this.date.getMonth();
    const year = String(date.getFullYear());

    const formattedDate = `${day}.${month}.${year}`;

    return formattedDate;
  }

  // hideEl скрывает DOM-элемент задачи
  hideEl(el) {
    if (el) {
      el.classList.add('hidden');
    }
    return;
  }

  // showEl показывает DOM-элемент задачи
  showEl(el) {
    if (el) {
      el.classList.remove('hidden');
    }
    return;
  }
}

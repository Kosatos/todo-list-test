import Task from './components/Task';
import Popup from './components/Popup';
import clearForm from './utils/clearForm';
import searchTask from './utils/searchTask';
import resizeBlock from './utils/resizeBlock';

window.onload = () => {
  // Создаем массив для хранения задач (экземпляров класса Task)
  const todoTasks = [];

  // Ищем DOM-эелементы, с которым будем работать
  const resizibleComponent = document.querySelector('.app__component-left'); // Элемент, кооторый должен растягиваться
  resizeBlock(resizibleComponent);

  const todoList = document.getElementById('todo-list'); // Список, куда добавляются задачи

  const addTaskBtn = document.getElementById('add-task-btn'); // Кнопка добавления задачи

  const createForm = document.getElementById('create-form'); // Форма для создания задачи

  const alert = createForm.querySelector('.create-form__alert'); // Ошибка при задании задачи пустого имени

  const searchForm = document.getElementById('search-form'); // Форма поиска задачи по имени

  const searchInput = document.getElementById('search-input'); // Инпут для ввода поиска задачи по имени

  // Экземпляр класса Popup, для работа с Pupup'ом
  const createTaskPopup = new Popup(
    'create-task-popup',
    'cancel-popup',
    'close-popup'
  );

  // Очистка форм при загрузке страницы
  clearForm(createForm);
  clearForm(searchForm);

  // Тестовые задачи
  const testTasks = [
    {
      name: 'Оставить отклик на вакансию',
      note: 'JS-разработчик',
      deadline: '2022-08-02',
    },
    {
      name: 'Сделать приложение TODO для тестового задания',
      note: `●	Приложение должно включать в себя минимум два основных компонента (примерный вид приложения см. на рисунке выше):
	  1)	Вертикальный список с наименованиями заметок TODO;
	  2)	Область взаимодействия заметки TODO.
	  ●	Реализовать возможность добавления, редактирования и удаления заметок TODO;
	  ●	Обрезать конец наименования заметки TODO “…”, если имя не влезает в вертикальный список наименований заметок TODO.
	  `,
      deadline: '2022-08-16',
    },
    {
      name: 'Досмотреть третью серию Тед Лассо',
      note: 'Остановился на 30:11',
    },
    {
      name: 'Изучить ReactJS',
      deadline: '2022-09-10',
    },
    {
      name: 'Изучить PHP',
      deadline: '2022-10-10',
    },
    {
      name: 'Сделать курсовую работу по JS',
      note: 'Продвинутый JavaScript',
      deadline: '2022-08-28',
    },
    {
      name: 'Уволиться со старой работы',
      deadline: '2022-08-31',
    },
    {
      name: 'Съездить в Москву',
      note: 'Билеты взять на 27 число',
      deadline: '2022-08-30',
    },
  ];
  testTasks.forEach((el) => createTask(el.name, el.note, el.deadline));

  // При клике на кнопку добавления задачи показываем Popup
  addTaskBtn.addEventListener('click', () => {
    createTaskPopup.showPopup();
    alert.classList.remove('show');
  });

  // При отправке формы создаем задачу(экземпляр класса Task) и добавляем в список. Если поле имени пустое, показываем подсказку-предупреждение
  createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('create-task-name').value;
    const note = document.getElementById('create-task-note').value;
    const deadline = document.getElementById('create-task-deadline').value;

    if (name === '') {
      alert.textContent = 'Required field';
      alert.classList.add('show');
      return;
    }

    createTask(name, note, deadline);
  });

  // При вводе символов в поле показываем задачи, содержащие эти символы в имени
  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();
    searchTask(todoTasks, value);
  });

  // Функция создания задачи, принимает знанчения, введенные в поля формы создания задачи(createForm), создает с этими данными экземпляр класса Task и сохраняет его в массив для хранения, закрывает popup, чистит форму
  function createTask(name, note, deadline) {
    const taskData = {
      name: name,
      note: note,
      deadline: deadline,
    };

    const task = new Task(taskData);
    todoTasks.push(task);
    todoList.appendChild(task.renderTask());

    createTaskPopup.closePopup();
    clearForm(createForm);
  }
};

// searchTask скрывает элементы не соответсвующие поиску, а соответсвующие показывает

export default function searchTask(tasks, value) {
  tasks.forEach((el) =>
    el.name.toLowerCase().search(value.toLowerCase()) !== -1
      ? el.showEl(el.taskEl)
      : el.hideEl(el.taskEl)
  );
}

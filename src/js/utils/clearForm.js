// clearForm сбрасывает форму и скрывает при необходимости

export default function clearForm(form) {
  form.reset();
  if (form.classList.contains('show')) {
    form.classList.remove('show');
  }
}

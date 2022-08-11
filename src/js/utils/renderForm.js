// renderForm рендерит разметку формы

export default function renderForm() {
  this.editFormLayout = `<form class="app__edit-form edit-form" id="edit-form">
	<textarea type="text" class="edit-form__input edit-name" id="edit-name" readonly></textarea>

	<textarea type="text" class="edit-form__input edit-note" id="edit-note" readonly></textarea>

	<div class="edit-form__date">

		<div class="edit-form__created">Created <span class="edit-form__create-date"
				id="create-date"></span>
		</div>

		<div class="edit-form__deadline">To be completed by <input type="date"
				class="edit-form__input edit-deadline" id="edit-deadline" readonly></input>
		</div>

	</div>

	<div class=" edit-form__buttons">
		<button class="app__btn edit-form__btn" id="start-btn">Get started</button>
		<button class="app__btn edit-form__btn" id="edit-btn">Edit</button>
	</div>
</form>`;
  document.querySelector('.app__component-right').innerHTML =
    this.editFormLayout;

  this.editForm = document.getElementById('edit-form');
  this.editForm.classList.add('show');
  this.editNameInput = document.getElementById('edit-name');
  this.editNoteInput = document.getElementById('edit-note');
  this.editDeadlineInput = document.getElementById('edit-deadline');
  this.createDateEl = document.getElementById('create-date');
  this.getStartedBtn = document.getElementById('start-btn');
  this.editBtn = document.getElementById('edit-btn');
}

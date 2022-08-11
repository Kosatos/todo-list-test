export default class Popup {
  constructor(popupId, cancelId, closeId) {
    this.popup = document.getElementById(popupId);
    this.overlay = document.getElementById(cancelId);
    this.closeItem = document.getElementById(closeId);

    // при нажатии на область вокруг popup'а - скрываем его
    this.overlay.addEventListener('click', () => this.closePopup());
    // при нажатии на иконку закрытия - скрываем popup
    this.closeItem.addEventListener('click', () => this.closePopup());
  }

  //   closePopup скрывает popup
  closePopup() {
    if (!this.popup.classList.contains('show')) {
      return;
    }
    this.popup.classList.toggle('show');
  }

  //   closePopup показывает popup
  showPopup() {
    if (this.popup.classList.contains('show')) {
      return;
    }
    this.popup.classList.toggle('show');
  }
}

// resizeBlock позволяет элементу, попадаемого в аргумент, изменять ширину

export default function resizeBlock(resizibleEl) {
  // Находим элемент захвата
  const grab = resizibleEl.querySelector('.grab');

  if (grab) {
    // При захвате определяем координату Х и ширину растягиваемого элемента
    grab.addEventListener('mousedown', function (event) {
      event.preventDefault();
      const x = event.pageX;
      const elWidth = resizibleEl.offsetWidth;
      function changeWidth(evt) {
        resizibleEl.style.width = elWidth + (evt.pageX - x) + 'px';
      }

      // При движении мышью прибавлять к ширине элемента разницу координат Х
      document.body.addEventListener('mousemove', changeWidth);

      // При отпускании кнопки мышт отписываемся от обработчика движения мыши
      document.body.addEventListener('mouseup', function () {
        document.body.removeEventListener('mousemove', changeWidth);
      });
    });
  }
  return;
}

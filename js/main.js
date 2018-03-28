const keyCodes = {
  arrowRight: 39,
  arrowLeft: 37
};
const mainScreen = document.querySelector(`.central`);
const screens = Array.from(document.querySelectorAll(`template`));
let currentScreenNumber = 0;

// копируем шаблон и вставляем его вместо главного экрана
const showScreen = (index) => {
  let template = screens[index].content.cloneNode(true);
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(template);
};
// показываем приветственный экран
showScreen(currentScreenNumber);

// функции проверки нажатия стрелок
const isArrowLeftPressed = (evt) => evt.keyCode === keyCodes.arrowLeft;
const isArrowRightPressed = (evt) => evt.keyCode === keyCodes.arrowRight;

// отслеживаем нажатие стрелок + Alt и меняем экраны
document.addEventListener(`keydown`, function (evt) {
  if (evt.altKey) {
    if (isArrowRightPressed(evt) && currentScreenNumber < screens.length - 1) {
      currentScreenNumber++;
      showScreen(currentScreenNumber);
    }
    if (isArrowLeftPressed(evt) && currentScreenNumber > 0) {
      currentScreenNumber--;
      showScreen(currentScreenNumber);
    }
  }
});

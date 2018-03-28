const keyCodes = {
  arrowRight: 39,
  arrowLeft: 37
};
const mainScreen = document.querySelector(`.central`);
const screens = [`#greeting`, `#rules`, `#game-1`, `#game-2`, `#game-3`, `#stats`];
let currentScreenNumber = 0;

// копируем шаблон и вставляем его вместо главного экрана
const showScreen = (index) => {
  let template = document.querySelector(screens[index]).content.cloneNode(true);
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(template);
};

// показываем приветственный экран
showScreen(currentScreenNumber);

// отслеживаем нажатие стрелок + Alt и меняем экраны
document.addEventListener(`keydown`, function (evt) {
  if (evt.altKey) {
    if (evt.keyCode === keyCodes.arrowRight && currentScreenNumber < screens.length - 1) {
      currentScreenNumber++;
    }
    if (evt.keyCode === keyCodes.arrowLeft && currentScreenNumber > 0) {
      currentScreenNumber--;
    }
  }
  showScreen(currentScreenNumber);
});

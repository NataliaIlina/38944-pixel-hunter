import greetingScreen from '../templates/greeting.js';
import showScreen from '../utils/show-screen.js';

// кнопка назад + обработчик возвращения на страницу приветствия
const buttonTemplate = `<button class="back">
  <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
  <img src="img/logo_small.svg" width="101" height="44">
</button>`;

const renderButton = () => {
  const button = document.createElement(`div`);
  button.classList.add(`header__back`);
  button.innerHTML = buttonTemplate;

  button.querySelector(`.back`).addEventListener(`click`, () => {
    showScreen(greetingScreen);
  });

  return button;
};


export default renderButton;

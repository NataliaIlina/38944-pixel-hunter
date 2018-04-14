import getElementFromTemplate from '../utils/create-elem.js';
import showScreen from '../utils/show-screen.js';
import nextScreen from './game.js';
import FooterView from './footer.js';
import HeaderView from './header.js';

const header = new HeaderView();
const footer = new FooterView();

const template = `<div class="rules">
  <h1 class="rules__title">Правила</h1>
  <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
    src="img/photo_icon.png" width="16" height="16"> или рисунок <img
    src="img/paint_icon.png" width="16" height="16" alt="">.<br>
    Фотографиями или рисунками могут быть оба изображения.<br>
    На каждую попытку отводится 30 секунд.<br>
    Ошибиться можно не более 3 раз.<br>
    <br>
    Готовы?
  </p>
  <form class="rules__form">
    <input class="rules__input" type="text" placeholder="Ваше Имя">
    <button class="rules__button  continue" type="submit" disabled>Go!</button>
  </form>
</div>`;

const currentScreen = getElementFromTemplate(template);
currentScreen.insertAdjacentElement(`afterbegin`, header.element);
currentScreen.insertAdjacentElement(`beforeend`, footer.element);

const button = currentScreen.querySelector(`.rules__button`);
const userName = currentScreen.querySelector(`.rules__input`);

userName.addEventListener(`input`, () => {
  button.disabled = userName.value ? false : true;
});

button.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  showScreen(nextScreen);
  userName.value = ``;
  button.disabled = true;
});

export default currentScreen;

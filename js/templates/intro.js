import getElementFromTemplate from '../utils/create-elem.js';
import showScreen from '../utils/show-screen.js';
import nextScreen from '../templates/greeting.js';
import FooterView from './footer.js';

const footer = new FooterView();

const template = `<div id="main" class="central__content">
    <div id="intro" class="intro">
      <h1 class="intro__asterisk">*</h1>
      <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
    </div>
  </div>`;

const currentScreen = getElementFromTemplate(template);
currentScreen.insertAdjacentElement(`beforeend`, footer.element);
const button = currentScreen.querySelector(`.intro__asterisk`);

button.addEventListener(`click`, () => {
  showScreen(nextScreen);
});

export default currentScreen;

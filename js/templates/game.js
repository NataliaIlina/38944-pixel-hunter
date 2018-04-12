import renderHeader from './header.js';
import {game} from '../data/data.js';
import templates from './game-templates.js';
import renderFooter from './footer.js';
import getElementFromTemplate from '../utils/create-elem.js';
import showNextScreen from '../utils/show-screen.js';
import nextScreen from './stats.js';
const answers = [];

const currentScreen = document.createElement(`div`);
const gamescreen = document.createElement(`div`);
currentScreen.appendChild(gamescreen);
currentScreen.insertAdjacentElement(`afterbegin`, renderHeader(game));
currentScreen.insertAdjacentElement(`beforeend`, renderFooter());

const renderScreen = (number) => {
  gamescreen.innerHTML = ``;
  const template = templates[number].template(templates[number].level);
  const screen = gamescreen.appendChild(getElementFromTemplate(template));

  const form = screen.querySelector(`.game__content`);

  if (answers.length < 9) {
    if (form.classList.contains(`game__content--wide`)) {
      form.addEventListener(`change`, () => {
        renderScreen(2);
        answers.push({isCorrect: true, time: 20});
        form.reset();
      });
    } else if (form.classList.contains(`game__content--triple`)) {
      form.addEventListener(`click`, (evt) => {
        if (evt.target.classList.contains(`game__option`)) {
          renderScreen(0);
          answers.push({isCorrect: true, time: 15});
        }
      });
    } else {
      form.addEventListener(`change`, () => {
        const checkedButtons = form.querySelectorAll(`input[type="radio"]:checked`);
        if (checkedButtons.length === 2) {
          renderScreen(1);
          answers.push({isCorrect: true, time: 10});
          form.reset();
        }
      });
    }
  } else {
    showNextScreen(nextScreen);
  }

};

renderScreen(1);

export default currentScreen;

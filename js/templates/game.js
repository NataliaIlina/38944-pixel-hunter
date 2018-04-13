import renderHeader from './header.js';
import {initialState} from '../data/data.js';
import templates from './game-templates.js';
import renderFooter from './footer.js';
import getElementFromTemplate from '../utils/create-elem.js';
import showNextScreen from '../utils/show-screen.js';
import nextScreen from './stats.js';
import renderResult from './results.js';
const answers = [];

const currentState = Object.assign(initialState);

const currentScreen = document.createElement(`div`);
const gameScreen = document.createElement(`div`);
currentScreen.appendChild(gameScreen);
currentScreen.insertAdjacentElement(`beforeend`, renderFooter());

const renderScreen = (number) => {
  gameScreen.innerHTML = ``;
  gameScreen.insertAdjacentElement(`afterbegin`, renderHeader(currentState));
  const template = templates[number].template(templates[number].level);
  const screen = gameScreen.appendChild(getElementFromTemplate(template));
  gameScreen.appendChild(renderResult(answers));

  const form = screen.querySelector(`.game__content`);

  if (answers.length < 9) {
    if (form.classList.contains(`game__content--wide`)) {
      form.addEventListener(`change`, () => {
        renderScreen(2);
        answers.push({isCorrect: true, time: 25});
        if (currentState.lives === 0) {
          showNextScreen(nextScreen);
        }
        form.reset();
      });
    } else if (form.classList.contains(`game__content--triple`)) {
      form.addEventListener(`click`, (evt) => {
        if (evt.target.classList.contains(`game__option`)) {
          renderScreen(0);
          answers.push({isCorrect: true, time: 15});
          currentState.lives -= 1;
          if (currentState.lives === 0) {
            showNextScreen(nextScreen);
          }
        }
      });
    } else {
      form.addEventListener(`change`, () => {
        const checkedButtons = form.querySelectorAll(`input[type="radio"]:checked`);
        if (checkedButtons.length === 2) {
          renderScreen(1);
          answers.push({isCorrect: false, time: 5});
          currentState.lives -= 1;
          if (currentState.lives === 0) {
            showNextScreen(nextScreen);
          }
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

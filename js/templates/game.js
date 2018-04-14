import HeaderView from './header.js';
import {initialState} from '../data/data.js';
import templates from './game-templates.js';
import renderFooter from './footer.js';
import getElementFromTemplate from '../utils/create-elem.js';
import showNextScreen from '../utils/show-screen.js';
import nextScreen from './stats.js';
import renderResult from './results.js';


const answers = [];
const currentState = Object.assign(initialState);
const header = new HeaderView(currentState);

const currentScreen = document.createElement(`div`);
const gameScreen = document.createElement(`div`);
currentScreen.appendChild(gameScreen);
currentScreen.insertAdjacentElement(`beforeend`, renderFooter());

const renderScreen = (template) => {
  gameScreen.innerHTML = ``;
  gameScreen.insertAdjacentElement(`afterbegin`, header.element);
  const screenTemplate = template.type(template.level);
  const screen = gameScreen.appendChild(getElementFromTemplate(screenTemplate));
  gameScreen.appendChild(renderResult(answers));

  const form = screen.querySelector(`.game__content`);

  if (answers.length < 10) {
    if (form.classList.contains(`game__content--wide`)) {
      form.addEventListener(`change`, () => {
        answers.push({isCorrect: true, time: 25});
        if (currentState.lives === 0) {
          showNextScreen(nextScreen);
        }
        form.reset();
        renderScreen(templates[2]);
      });
    } else if (form.classList.contains(`game__content--triple`)) {
      form.addEventListener(`click`, (evt) => {
        if (evt.target.classList.contains(`game__option`)) {
          answers.push({isCorrect: true, time: 15});
          if (currentState.lives === 0) {
            showNextScreen(nextScreen);
          }
          renderScreen(templates[0]);
        }
      });
    } else {
      form.addEventListener(`change`, () => {
        const checkedButtons = form.querySelectorAll(`input[type="radio"]:checked`);
        if (checkedButtons.length === 2) {
          answers.push({isCorrect: true, time: 5});
          if (currentState.lives === 0) {
            showNextScreen(nextScreen);
          }
          form.reset();
          renderScreen(templates[1]);
        }
      });
    }
  } else {
    const wrongAnswers = answers.filter((answer) => {
      return answer.isCorrect === false;
    });
    currentState.victory = wrongAnswers > 3 ? false : true;
    showNextScreen(nextScreen);
  }
};

renderScreen(templates[1]);

export default currentScreen;

import greetingScreen from '../templates/greeting.js';
import showScreen from '../utils/show-screen.js';
import getElementFromTemplate from '../utils/create-elem.js';

const renderHeader = (game) => {
  const headerTemplate = `<header class="header">
    <div class="header__back">
      <button class="back">
        <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
        <img src="img/logo_small.svg" width="101" height="44">
      </button>
    </div>
    ${game ? `<h1 class="game__timer">${game.time}</h1>
    <div class="game__lives">
      ${new Array(3 - game.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      ${new Array(game.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    </div>` : ``}
    </header>`;
  const header = getElementFromTemplate(headerTemplate);
  header.querySelector(`.back`).addEventListener(`click`, () => {
    showScreen(greetingScreen);
  });
  return header;
};

export default renderHeader;

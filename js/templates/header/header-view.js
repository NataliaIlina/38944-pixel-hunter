import AbstractView from '../../utils/abstract-view';
import {Initial} from '../game/game-data.js';

class HeaderView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    return `<header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
      ${this.game ? `<h1 class="game__timer">${this.game.time}</h1>
      <div class="game__lives">
        ${new Array(Initial.LIVES - this.game.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
        ${new Array(this.game.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      </div>` : ``}
      </header>`;
  }

  bind() {
    this.element.querySelector(`.back`).addEventListener(`click`, () => {
      this.onBackButtonClick();
    });
  }

  onBackButtonClick() {

  }
}

export default HeaderView;

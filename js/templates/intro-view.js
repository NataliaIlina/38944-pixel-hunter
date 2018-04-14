import {changeView} from '../utils/util.js';
import nextScreen from '../templates/greeting-view.js';
import AbstractView from '../utils/abstract-view.js';

class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>`;
  }

  bind() {
    this.element.querySelector(`.intro__asterisk`).addEventListener(`click`, () => {
      changeView(nextScreen);
    });
  }
}

const currentScreen = new IntroView().element;

export default currentScreen;

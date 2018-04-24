import AbstractView from '../../utils/abstract-view';
import FooterView from '../footer/footer-view';
import Application from '../../application';

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
      </div>
      ${new FooterView().template}`;
  }

  bind() {
    this.element.querySelector(`.intro__asterisk`).addEventListener(`click`, () => {
      Application.showGreeting();
    });
  }
}

export default IntroView;

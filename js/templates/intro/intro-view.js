import AbstractView from '../../utils/abstract-view';
import FooterView from '../footer/footer-view';

class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk rotate">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>
      ${new FooterView().template}`;
  }

  remove() {
    this.element.classList.add(`fade-out`);
  }
}

export default IntroView;

import AbstractView from '../../utils/abstract-view';
import getElementFromTemplate from '../../utils/create-elem';


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
      </div>`;
  }

  render() {
    const element = getElementFromTemplate(this.template);
    element.classList.add(`intro-layout`);
    return element;
  }

  hide() {
    this.element.style = `opacity: 0; transition: opacity 2s linear`;
  }
}

export default IntroView;

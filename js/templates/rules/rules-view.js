import AbstractView from '../../utils/abstract-view';
import HeaderView from '../header/header-view';
import FooterView from '../footer/footer-view';
import Application from '../../application';
import getElementFromTemplate from '../../utils/create-elem';


class RulesView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>
    ${new FooterView().template}`;
  }

  render() {
    const element = getElementFromTemplate(this.template);
    element.insertAdjacentElement(`afterbegin`, new HeaderView().element);
    return element;
  }

  bind() {
    const form = this.element.querySelector(`.rules__form`);
    const button = form.querySelector(`.rules__button`);
    const userName = form.querySelector(`.rules__input`);

    userName.addEventListener(`input`, () => {
      button.disabled = userName.value ? false : true;
    });

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      Application.showGame(userName.value);
      userName.value = ``;
      button.disabled = true;
    });
  }
}

export default RulesView;

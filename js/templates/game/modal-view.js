import AbstractView from '../../utils/abstract-view';

class ModalView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div class="modal">
        <p class="modal__title">
          Все результаты текущей игры будут утеряны.<br /> Хотите выйти?
        </p>
        <button type="button" class="modal__button  modal__button--reset">Да</button>
        <button type="button" class="modal__button  modal__button--continue">Нет</button>
      </div>`;
  }

  bind() {
    this.element.querySelector(`.modal__button--reset`).addEventListener(`click`, () => {
      this.onResetClick();
    });
    this.element.querySelector(`.modal__button--continue`).addEventListener(`click`, () => {
      this.onContinueClick();
    });
  }

  onResetClick() {

  }

  onContinueClick() {

  }
}

export default ModalView;

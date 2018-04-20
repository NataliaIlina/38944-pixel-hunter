import AbstractView from '../../utils/abstract-view';

class ModalView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div class="game__modal">
        <p class="game__modal-title">
          Все результаты текущей игры будут утеряны.<br /> Хотите выйти?
        </p>
        <button type="button" class="game__modal-button  game__modal-button--reset">Да</button>
        <button type="button" class="game__modal-button  game__modal-button--continue">Нет</button>
      </div>`;
  }

  bind() {
    this.element.querySelector(`.game__modal-button--reset`).addEventListener(`click`, () => {
      this.onResetClick();
    });
    this.element.querySelector(`.game__modal-button--continue`).addEventListener(`click`, () => {
      this.onContinueClick();
    });
  }

  onResetClick() {

  }

  onContinueClick() {

  }
}

export default ModalView;

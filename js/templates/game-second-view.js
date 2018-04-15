import AbstractView from '../utils/abstract-view.js';

class GameSecondView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
  }

  get template() {
    return `<div class="game">
    <p class="game__task">${this.level.task}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.level.images[0].src}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
    </div>`;
  }

  onAnswer() {

  }

  onWrongAnswer() {

  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    form.addEventListener(`change`, () => {
      const answer = form.querySelector(`input[name=question1]:checked`).value;

      if (answer === this.level.images[0].type) {
        this.onAnswer();
      } else {
        this.onWrongAnswer();
      }
      form.reset();
    });
  }
}

export default GameSecondView;

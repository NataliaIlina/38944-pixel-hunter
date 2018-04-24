import AbstractView from '../../utils/abstract-view';

class GameSecondView extends AbstractView {
  constructor(level) {
    super();
    this._images = level.images;
    this._question = level.question;
  }

  get template() {
    return `<div class="game">
    <p class="game__task">${this._question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this._images[0].src}" alt="Option 1" width="705" height="455">
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

  bind() {
    const form = this.element.querySelector(`.game__content`);
    form.addEventListener(`change`, () => {
      const userAnswer = form.querySelector(`input[name=question1]:checked`).value;
      const answer = userAnswer === this._images[0].type;
      this.onAnswer(answer);
      form.reset();
    });
  }
}

export default GameSecondView;

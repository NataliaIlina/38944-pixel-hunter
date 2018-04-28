import AbstractView from '../../utils/abstract-view';

class GameSecondView extends AbstractView {
  constructor(level) {
    super();
    this._answers = level.answers;
    this._question = level.question;
  }

  get template() {
    return `<div class="game">
    <p class="game__task">${this._question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this._answers[0].image.url}" alt="Option 1" width="${this._answers[0].image.width}" height="${this._answers[0].image.height}">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="painting">
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
      const answer = userAnswer === this._answers[0].type;
      this.onAnswer(answer);
      form.reset();
    });
  }
}

export default GameSecondView;

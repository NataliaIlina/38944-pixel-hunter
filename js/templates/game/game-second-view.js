import AbstractView from '../../utils/abstract-view';

class GameSecondView extends AbstractView {
  constructor(level) {
    super();
    this.answers = level.answers;
    this.question = level.question;
  }

  get template() {
    return `<div class="game">
    <p class="game__task">${this.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.answers[0].image.url}" alt="Option 1" width="${this.answers[0].image.width}" height="${this.answers[0].image.height}">
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

  bind() {
    const form = this.element.querySelector(`.game__content`);
    form.addEventListener(`change`, () => {
      const userAnswer = form.querySelector(`input[name=question1]:checked`).value;
      const answer = userAnswer === this.answers[0].type;
      this.onAnswer(answer);
      form.reset();
    });
  }

  onAnswer() {

  }
}

export default GameSecondView;

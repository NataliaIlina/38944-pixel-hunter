import AbstractView from '../../utils/abstract-view';

const MAX_CHECKED_NUMBER = 2;

class GameFirstView extends AbstractView {
  constructor(level) {
    super();
    this._answers = level.answers;
    this._question = level.question;
  }

  get template() {
    return `<div class="game">
      <p class="game__task">${this._question}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${this._answers[0].image.url}" alt="Option 1" width="${this._answers[0].image.width}" height="${this._answers[0].image.height}">
          <label class="game__answer game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question1" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${this._answers[1].image.url}" alt="Option 2" width="${this._answers[1].image.width}" height="${this._answers[0].image.height}">
          <label class="game__answer  game__answer--photo">
            <input name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="question2" type="radio" value="painting">
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
      // кол-во чекнутых кнопок
      const checkedButtons = form.querySelectorAll(`input[type="radio"]:checked`);
      // если 2 - проверяем ответы
      if (checkedButtons.length === MAX_CHECKED_NUMBER) {
        const answerFirst = form.querySelector(`input[name=question1]:checked`);
        const answerSecond = form.querySelector(`input[name=question2]:checked`);
        if (answerFirst && answerSecond) {
          const answer = answerFirst.value === this._answers[0].type && answerSecond.value === this._answers[1].type;
          this.onAnswer(answer);
        }
        form.reset();
      }
    });
  }
}

export default GameFirstView;

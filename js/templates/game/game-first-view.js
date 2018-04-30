import AbstractView from '../../utils/abstract-view';

const MAX_CHECKED_NUMBER = 2;

class GameFirstView extends AbstractView {
  constructor(level) {
    super();
    this.answers = level.answers;
    this.question = level.question;
  }

  get template() {
    return `<div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content">
  ${this.answers.map((answer, index) => {
    return `<div class="game__option">
      <img src="${answer.image.url}" alt="Option ${index + 1}" width="${answer.image.width}" height="${answer.image.height}">
      <label class="game__answer  game__answer--photo">
        <input name="question${index + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input name="question${index + 1}" type="radio" value="painting">
        <span>Рисунок</span>
      </label>
    </div>`;
  }).join(``)}
      </form>
    </div>`;
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
          const answer = answerFirst.value === this.answers[0].type && answerSecond.value === this.answers[1].type;
          this.onAnswer(answer);
        }
        form.reset();
      }
    });
  }

  onAnswer() {

  }
}

export default GameFirstView;

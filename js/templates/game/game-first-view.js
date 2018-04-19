import AbstractView from '../../utils/abstract-view.js';

class GameFirstView extends AbstractView {
  constructor(level) {
    super();
    this.images = level.images;
    this.question = level.question;
  }

  get template() {
    return `<div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content">
        <div class="game__option">
          <img src="${this.images[0].src}" alt="Option 1" width="468" height="458">
          <label class="game__answer game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
        <div class="game__option">
          <img src="${this.images[1].src}" alt="Option 2" width="468" height="458">
          <label class="game__answer  game__answer--photo">
            <input name="question2" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--paint">
            <input name="question2" type="radio" value="paint">
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
      const checkedButtons = form.querySelectorAll(`input[type="radio"]:checked`);
      if (checkedButtons.length === 2) {
        const answer1 = form.querySelector(`input[name=question1]:checked`);
        const answer2 = form.querySelector(`input[name=question2]:checked`);
        if (answer1 && answer2) {
          const answer = answer1.value === this.images[0].type && answer2.value === this.images[1].type;
          this.onAnswer(answer);
        }
        form.reset();
      }
    });
  }
}

export default GameFirstView;

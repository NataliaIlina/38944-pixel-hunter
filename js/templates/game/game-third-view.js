import AbstractView from '../../utils/abstract-view.js';

class GameThirdView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
    this.images = level.images;
    this.question = level.question;
  }

  get template() {
    return `<div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this.images[0].src}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${this.images[1].src}" alt="Option 1" width="304" height="455">
        </div>
        <div class="game__option">
          <img src="${this.images[2].src}" alt="Option 1" width="304" height="455">
        </div>
      </form>
    </div>`;
  }

  onAnswer() {

  }


  bind() {
    // массив адресов картинок
    const srcArray = this.images.map((item) => item.src);
    const form = this.element.querySelector(`.game__content`);

    form.addEventListener(`click`, (evt) => {
      // индекс src элемента. по которому кликнули
      const answerIndex = srcArray.indexOf(evt.target.children[0].src);
      // проверяем совпадает ли тип выбранной картинки с типом правильного ответа
      const answer = this.images[answerIndex].type === this.level.answer;
      this.onAnswer(answer);
    });
  }
}

export default GameThirdView;

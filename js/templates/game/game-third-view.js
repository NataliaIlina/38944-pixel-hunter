import AbstractView from '../../utils/abstract-view';
import {AnswerType} from './game-data';

class GameThirdView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
    this.answers = level.answers;
    this.question = level.question;
  }

  get template() {
    return `<div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content  game__content--triple">
  ${this.answers.map((answer) => {
    return `<div class="game__option">
      <img src="${answer.image.url}" alt="Option 1" width="${answer.image.width}" height="${answer.image.height}">
    </div>`;
  }).join(``)}
      </form>
    </div>`;
  }

  bind() {
    // ищем тип правильного ответа
    const wrightType = this.question.includes(`фото`) ? AnswerType.PHOTO : AnswerType.PAINTING;
    // массив адресов картинок
    const srcArray = this.answers.map((item) => item.image.url);
    const form = this.element.querySelector(`.game__content`);

    form.addEventListener(`click`, (evt) => {
      // индекс src элемента. по которому кликнули
      const answerIndex = srcArray.indexOf(evt.target.children[0].src);
      // проверяем совпадает ли тип выбранной картинки с типом правильного ответа
      const answer = this.answers[answerIndex].type === wrightType;
      this.onAnswer(answer);
    });
  }

  onAnswer() {

  }
}

export default GameThirdView;

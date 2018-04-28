import AbstractView from '../../utils/abstract-view';
import {AnswerType} from './game-data';

class GameThirdView extends AbstractView {
  constructor(level) {
    super();
    this._level = level;
    this._answers = this._level.answers;
    this._question = this._level.question;
  }

  get template() {
    return `<div class="game">
      <p class="game__task">${this._question}</p>
      <form class="game__content  game__content--triple">
        <div class="game__option">
          <img src="${this._answers[0].image.url}" alt="Option 1" width="${this._answers[0].image.width}" height="${this._answers[0].image.height}">
        </div>
        <div class="game__option  game__option--selected">
          <img src="${this._answers[1].image.url}" alt="Option 1" width="${this._answers[1].image.width}" height="${this._answers[1].image.height}">
        </div>
        <div class="game__option">
          <img src="${this._answers[2].image.url}" alt="Option 1" width="${this._answers[2].image.width}" height="${this._answers[2].image.height}">
        </div>
      </form>
    </div>`;
  }

  onAnswer() {

  }


  bind() {
    // ищем тип правильного ответа
    const wrightType = this._question.includes(`фото`) ? AnswerType.PHOTO : AnswerType.PAINTING;
    // массив адресов картинок
    const srcArray = this._answers.map((item) => item.image.url);
    const form = this.element.querySelector(`.game__content`);

    form.addEventListener(`click`, (evt) => {
      // индекс src элемента. по которому кликнули
      const answerIndex = srcArray.indexOf(evt.target.children[0].src);
      // проверяем совпадает ли тип выбранной картинки с типом правильного ответа
      const answer = this._answers[answerIndex].type === wrightType;
      this.onAnswer(answer);
    });
  }
}

export default GameThirdView;

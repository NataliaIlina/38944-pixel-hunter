import AbstractView from '../../utils/abstract-view';

class ResultView extends AbstractView {
  constructor(answers) {
    super();
    this._answers = answers;
    this._classes = this._answers.map((answer) => this.answerType(answer));
  }

  get template() {
    return `<div class="stats">
      <ul class="stats">
        ${this._classes.map((className) => `<li class="stats__result stats__result--${className}"></li>`).join(``)}
        ${new Array(10 - this._classes.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
      </ul>
    </div>`;
  }

  answerType(answer) {
    let type;
    if (answer.isCorrect) {
      type = `correct`;
    }
    if (answer.isCorrect && answer.time < 10) {
      type = `fast`;
    }
    if (answer.isCorrect && answer.time > 20) {
      type = `slow`;
    }
    if (!answer.isCorrect) {
      type = `wrong`;
    }
    return type;
  }
}


export default ResultView;
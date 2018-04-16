import AbstractView from '../utils/abstract-view.js';

const getAnswerType = (answer) => {
  let className;
  if (answer.isCorrect) {
    className = `correct`;
  }
  if (answer.isCorrect && answer.time < 10) {
    className = `fast`;
  }
  if (answer.isCorrect && answer.time > 20) {
    className = `slow`;
  }
  if (!answer.isCorrect) {
    className = `wrong`;
  }
  return className;
};


class ResultView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
    this.classes = this.answers.map((answer) => getAnswerType(answer));
  }

  get template() {
    return `<div class="stats">
      <ul class="stats">
        ${this.classes.map((className) => `<li class="stats__result stats__result--${className}"></li>`).join(``)}
        ${new Array(10 - this.classes.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
      </ul>
    </div>`;
  }
}


export default ResultView;

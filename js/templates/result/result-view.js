import AbstractView from '../../utils/abstract-view';

class ResultView extends AbstractView {
  constructor(answers) {
    super();
    this._answers = answers;
  }

  get template() {
    return `<div class="stats">
      <ul class="stats">
        ${this._answers.map((className) => `<li class="stats__result stats__result--${className}"></li>`).join(``)}
        ${new Array(10 - this._answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
      </ul>
    </div>`;
  }
}


export default ResultView;
// export {getAnswerType};

import AbstractView from '../../utils/abstract-view';
import StatsView from './stats-view';
import {BonusPoint} from '../../data/count-points';
import getElementFromTemplate from '../../utils/create-elem';
import HeaderView from '../header/header-view';
import Application from '../../application';

class StatisticsView extends AbstractView {
  constructor(results) {
    super();
    this._results = results;
    // у последней попытки считаем кол-во правильных ответов
    this._rightAnswers = this._results[0].answers.filter((answer) => answer.isCorrect).length;
    // превращаем массив в шаблоны
    this._stats = this._results.map((result, index) => {
      return new StatsView(result, BonusPoint, index + 1).template;
    }).join(``);
  }

  get template() {
    return `<div class="result">
      <h1>${this._rightAnswers >= 7 ? `Победа!` : `Поражение :(`}</h1>
      ${this._stats}
      </div>`;
  }

  renderHeader() {
    const header = new HeaderView();
    header.onBackButtonClick = () => {
      Application.showGreeting();
    };
    return header.element;
  }

  render() {
    const element = getElementFromTemplate(this.template);
    element.insertAdjacentElement(`afterbegin`, this.renderHeader());
    return element;
  }
}

export default StatisticsView;

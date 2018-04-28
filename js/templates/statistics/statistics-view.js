import AbstractView from '../../utils/abstract-view';
import StatsView from './stats-view';
import {BonusPoint} from './count-points';
import getElementFromTemplate from '../../utils/create-elem';
import HeaderView from '../header/header-view';
import Application from '../../application';

const MIN_ANWSERS_FOR_WIN = 7;

class StatisticsView extends AbstractView {
  constructor(results) {
    super();
    this._results = results.reverse();
    // у последней попытки считаем кол-во правильных ответов
    this._rightAnswers = this._results[0].answers.filter((answer) => answer !== `wrong`).length;
    // превращаем массив в шаблоны
    this._stats = this._results.map((result, index) => {
      return new StatsView(result, BonusPoint, index + 1).template;
    }).join(``);
  }

  get template() {
    return `<div class="result">
      <h1>${this._rightAnswers >= MIN_ANWSERS_FOR_WIN ? `Победа!` : `Поражение :(`}</h1>
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

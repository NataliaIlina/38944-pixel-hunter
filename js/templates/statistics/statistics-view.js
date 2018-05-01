import AbstractView from '../../utils/abstract-view';
import StatsView from './stats-view';
import {BonusPoint} from './count-points';
import getElementFromTemplate from '../../utils/create-elem';
import HeaderView from '../header/header-view';
import Application from '../../application';

const MIN_ANWSERS_FOR_WIN = 7;
// непонятно по критерию Д8 - порядок основных методов - методы -> приватные методы -> перегруженные методы родительских объектов. Вроде все так.
class StatisticsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results.reverse();
    // у последней попытки считаем кол-во правильных ответов
    this.rightAnswers = this.results[0].answers.filter((answer) => answer !== `wrong`).length;
    // превращаем массив в шаблоны
    this.stats = this.results.map((result, index) => {
      return new StatsView(result, BonusPoint, index + 1).template;
    }).join(``);
  }

  get template() {
    return `<div class="result">
      <h1>${this.rightAnswers >= MIN_ANWSERS_FOR_WIN ? `Победа!` : `Поражение :(`}</h1>
      ${this.stats}
      </div>`;
  }

  _renderHeader() {
    const header = new HeaderView();
    header.onBackButtonClick = () => {
      Application.showGreeting();
    };
    return header.element;
  }

  render() {
    const element = getElementFromTemplate(this.template);
    element.insertAdjacentElement(`afterbegin`, this._renderHeader());
    return element;
  }
}

export default StatisticsView;

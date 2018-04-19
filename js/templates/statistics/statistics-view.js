import AbstractView from '../../utils/abstract-view';
import StatsView from './stats-view';
import {BonusPoint} from '../../data/count-points';
import getElementFromTemplate from '../../utils/create-elem';
import HeaderView from '../header/header-view';

class StatisticsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results;
    // у последней попытки считаем кол-во правильных ответов
    this.rightAnswers = this.results[0].answers.filter((answer) => answer.isCorrect).length;
    // превращаем массив в шаблоны
    this.stats = this.results.map((result, index) => {
      return new StatsView(result, BonusPoint, index + 1).template;
    }).join(``);
  }

  get template() {
    return `<div class="result">
      <h1>${this.rightAnswers >= 7 ? `Победа!` : `Поражение :(`}</h1>
      ${this.stats}
      </div>`;
  }

  render() {
    const element = getElementFromTemplate(this.template);
    element.insertAdjacentElement(`afterbegin`, new HeaderView().element);
    return element;
  }
}

export default StatisticsView;

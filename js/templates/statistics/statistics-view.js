import AbstractView from '../../utils/abstract-view';
import StatsView from './stats-view';
import {BonusPoint} from '../../data/count-points';
import getElementFromTemplate from '../../utils/create-elem';
import HeaderView from '../header/header-view';

class StatisticsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results;
    // превращаем массив в шаблоны
    this.stats = this.results.map((result, index) => {
      return new StatsView(result, BonusPoint, index + 1).template;
    });
  }

  get template() {
    return `<div class="result">
      <h1>${this.results[0].victory ? `Победа!` : `Поражение :(`}</h1>
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

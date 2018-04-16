import AbstractView from '../utils/abstract-view.js';
import StatsView from './stats-view.js';
import {BonusPoint} from '../data/count-points.js';

class StatisticsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results;
    this.block1 = new StatsView(this.results[0], BonusPoint, 1);
    this.block2 = new StatsView(this.results[1], BonusPoint, 2);
    this.block3 = new StatsView(this.results[2], BonusPoint, 3);
  }

  get template() {
    return `<div class="result">
      <h1>${this.results[0].victory ? `Победа!` : `Поражение :(`}</h1>
      ${this.block1.template}
      ${this.block2.template}
      ${this.block3.template}
      </div>`;
  }
}

export default StatisticsView;

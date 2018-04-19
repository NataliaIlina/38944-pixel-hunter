import AbstractView from '../../utils/abstract-view';
import {countAnswers, countPoints} from '../../data/count-points';
import ResultView from '../result-view';

class StatsView extends AbstractView {
  constructor(result, points, index) {
    super();
    this.result = result;
    this.points = points;
    this.index = index;
    this.answers = result.answers;
    this.view = new ResultView(this.answers).template;
    this.answerResult = countAnswers(this.result);
    this.total = countPoints(this.answerResult);
  }

  get template() {
    return `<table class="result__table">
    ${this.answerResult ? `
      <tr>
        <td class="result__number">${this.index}.</td>
        <td colspan="2">
          ${this.view}
        </td>
        <td class="result__points">×&nbsp;${this.points.ANSWER}</td>
        <td class="result__total">${this.points.ANSWER * this.answerResult.RIGHT}</td>
      </tr>
      ${this.answerResult.FAST ? `<tr>
              <td></td>
              <td class="result__extra">Бонус за скорость:</td>
              <td class="result__extra">${this.answerResult.FAST}&nbsp;<span class="stats__result stats__result--fast"></span></td>
              <td class="result__points">×&nbsp;${this.points.TIME}</td>
              <td class="result__total">${this.answerResult.FAST * this.points.TIME}</td>
            </tr>` : ``}
      ${this.answerResult.LIVES ? `<tr>
              <td></td>
              <td class="result__extra">Бонус за жизни:</td>
              <td class="result__extra">${this.answerResult.LIVES}&nbsp;<span class="stats__result stats__result--alive"></span></td>
              <td class="result__points">×&nbsp;${this.points.LIFE}</td>
              <td class="result__total">${this.answerResult.LIVES * this.points.LIFE}</td>
            </tr>` : ``}
      ${this.answerResult.SLOW ? `<tr>
              <td></td>
              <td class="result__extra">Штраф за медлительность:</td>
              <td class="result__extra">${this.answerResult.SLOW}&nbsp;<span class="stats__result stats__result--slow"></span></td>
              <td class="result__points">×&nbsp;${this.points.TIME}</td>
              <td class="result__total">-${this.answerResult.SLOW * this.points.TIME}</td>
            </tr>` : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${this.total}</td>
      </tr>` : `<tr>
        <td class="result__number">${this.index}</td>
        <td>
          ${this.view}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>`}
    </table>`;
  }
}

export default StatsView;

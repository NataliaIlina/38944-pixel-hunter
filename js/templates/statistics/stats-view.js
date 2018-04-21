import AbstractView from '../../utils/abstract-view';
import {countAnswers, countPoints} from '../../data/count-points';
import ResultView from '../result/result-view';

class StatsView extends AbstractView {
  constructor(result, points, index) {
    super();
    this._result = result;
    this._points = points;
    this._index = index;
    this._answers = this._result.answers;
    this._view = new ResultView(this._answers).template;
    this._answerResult = countAnswers(this._result);
    this._total = countPoints(this._answerResult);
  }

  get template() {
    return `<table class="result__table">
    ${this._answerResult ? `
      <tr>
        <td class="result__number">${this._index}.</td>
        <td colspan="2">
          ${this._view}
        </td>
        <td class="result__points">×&nbsp;${this._points.ANSWER}</td>
        <td class="result__total">${this._points.ANSWER * this._answerResult.RIGHT}</td>
      </tr>
      ${this._answerResult.FAST ? `<tr>
              <td></td>
              <td class="result__extra">Бонус за скорость:</td>
              <td class="result__extra">${this._answerResult.FAST}&nbsp;<span class="stats__result stats__result--fast"></span></td>
              <td class="result__points">×&nbsp;${this._points.TIME}</td>
              <td class="result__total">${this._answerResult.FAST * this._points.TIME}</td>
            </tr>` : ``}
      ${this._answerResult.LIVES ? `<tr>
              <td></td>
              <td class="result__extra">Бонус за жизни:</td>
              <td class="result__extra">${this._answerResult.LIVES}&nbsp;<span class="stats__result stats__result--alive"></span></td>
              <td class="result__points">×&nbsp;${this._points.LIFE}</td>
              <td class="result__total">${this._answerResult.LIVES * this._points.LIFE}</td>
            </tr>` : ``}
      ${this._answerResult.SLOW ? `<tr>
              <td></td>
              <td class="result__extra">Штраф за медлительность:</td>
              <td class="result__extra">${this._answerResult.SLOW}&nbsp;<span class="stats__result stats__result--slow"></span></td>
              <td class="result__points">×&nbsp;${this._points.TIME}</td>
              <td class="result__total">-${this._answerResult.SLOW * this._points.TIME}</td>
            </tr>` : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${this._total}</td>
      </tr>` : `<tr>
        <td class="result__number">${this._index}</td>
        <td>
          ${this._view}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>`}
    </table>`;
  }
}

export default StatsView;

import getElementFromTemplate from '../utils/create-elem.js';

const answerType = {
  fast: (answer) => {
    return answer.isCorrect && answer.time < 10;
  },
  slow: (answer) => {
    return answer.isCorrect && answer.time > 20;
  },
  correct: (answer) => {
    return answer.isCorrect && answer.time <= 20 && answer.time >= 10;
  },
  wrong: (answer) => {
    return !answer.isCorrect;
  }
};

const renderResult = (answers) => {
  const template = `
  <div class="stats">
    <ul class="stats">
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
      <li class="stats__result stats__result--unknown"></li>
    </ul>
  </div>`;

  const result = getElementFromTemplate(template);
  const resultElems = Array.from(result.querySelectorAll(`li`));

  answers.forEach((answer, index) => {
    resultElems[index].classList.remove(`stats__result--unknown`);
    if (answerType.fast(answer)) {
      resultElems[index].classList.add(`stats__result--fast`);
    }
    if (answerType.slow(answer)) {
      resultElems[index].classList.add(`stats__result--slow`);
    }
    if (answerType.correct(answer)) {
      resultElems[index].classList.add(`stats__result--correct`);
    }
    if (answerType.wrong(answer)) {
      resultElems[index].classList.add(`stats__result--wrong`);
    }
  });

  return result;
};


export default renderResult;

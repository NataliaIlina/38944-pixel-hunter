import getElementFromTemplate from '../utils/create-elem.js';

const answerType = (answer) => {
  let className;
  if (answer.isCorrect) {
    className = `correct`;
  }
  if (answer.isCorrect && answer.time < 10) {
    className = `fast`;
  }
  if (answer.isCorrect && answer.time > 20) {
    className = `slow`;
  }
  if (!answer.isCorrect) {
    className = `wrong`;
  }
  return className;
};

const renderResult = (answers) => {
  const classNames = answers.map((answer) => answerType(answer));

  const template = `
  <div class="stats">
    <ul class="stats">
      ${classNames.map((className) => `<li class="stats__result stats__result--${className}"></li>`)}
      ${new Array(10 - classNames.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
    </ul>
  </div>`;

  const result = getElementFromTemplate(template);
  return result;
};


export default renderResult;

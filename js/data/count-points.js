const BonusTime = {
  FAST: 10,
  SLOW: 20
};

const BonusPoint = {
  ANSWER: 100,
  TIME: 50,
  LIFE: 50
};

const countAnswers = (result) => {
  if (!Array.isArray(result.answers)) {
    throw new Error(`Ожидается получить массив с ответами`);
  }
  if (result.answers.length < 10) {
    return false;
  }
  // считаем правильные ответы
  const rightAnswers = result.answers.filter((answer) => {
    return answer.isCorrect === true;
  });
  // считаем быстрые ответы
  const fastAnswers = rightAnswers.filter((answer) => {
    return answer.time < BonusTime.FAST;
  });
  // считаем долгие ответы
  const slowAnswers = rightAnswers.filter((answer) => {
    return answer.time > BonusTime.SLOW;
  });
  // общее кол-во набранных очков
  const AnswerResult = {
    RIGHT: rightAnswers.length,
    FAST: fastAnswers.length,
    SLOW: slowAnswers.length,
    LIVES: result.lives
  };

  return AnswerResult;
};

const countPoints = (answers) => {
  // общее кол-во набранных очков
  const points = answers.RIGHT * BonusPoint.ANSWER + answers.FAST * BonusPoint.TIME - answers.SLOW * BonusPoint.TIME + answers.LIVES * BonusPoint.LIFE;
  return points;
};

export {countPoints, countAnswers, BonusPoint};

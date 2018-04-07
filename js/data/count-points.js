const BonusTime = {
  FAST: 10,
  SLOW: 20
};

const BonusPoint = {
  ANSWER: 100,
  TIME: 50,
  LIFE: 50
};

const countPoints = (answers, lives = 0) => {
  if (!Array.isArray(answers)) {
    throw new Error(`Ожидается получить массив с ответами`);
  }
  if (typeof lives !== `number`) {
    throw new Error(`Количество жизней должно иметь числовое значение`);
  }
  if (answers.length < 10) {
    throw new Error(`Получено некорректное количество ответов`);
  }
  // считаем правильные ответы
  const rightAnswers = answers.filter((answer) => {
    return answer[0] === true;
  });
  // считаем быстрые ответы
  const fastAnswers = rightAnswers.filter((answer) => {
    return answer[1] < BonusTime.FAST;
  });
  // считаем долгие ответы
  const slowAnswers = rightAnswers.filter((answer) => {
    return answer[1] > BonusTime.SLOW;
  });
  // общее кол-во набранных очков
  const points = rightAnswers.length * BonusPoint.ANSWER + fastAnswers.length * BonusPoint.TIME - slowAnswers.length * BonusPoint.TIME + lives * BonusPoint.LIFE;
  return points;
};

export default countPoints;

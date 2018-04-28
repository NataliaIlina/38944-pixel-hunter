import {Result} from '../game/game-data';
const MAX_ANSWERS_NUMBER = 10;

const BonusPoint = {
  ANSWER: 100,
  TIME: 50,
  LIFE: 50
};

const countAnswers = (result) => {
  if (!Array.isArray(result.answers)) {
    throw new Error(`Ожидается получить массив с ответами`);
  }
  if (result.answers.length < MAX_ANSWERS_NUMBER) {
    return false;
  }
  // считаем правильные ответы
  const rightAnswers = result.answers.filter((answer) => answer !== Result.WRONG);
  // считаем быстрые ответы
  const fastAnswers = rightAnswers.filter((answer) => answer === Result.FAST);
  // считаем долгие ответы
  const slowAnswers = rightAnswers.filter((answer) => answer === Result.SLOW);
  // общее кол-во ответов
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

import {Result, BonusTime} from './game-data';

const getAnswerType = (answer) => {
  if (!answer.isCorrect) {
    return Result.WRONG;
  }
  if (answer.isCorrect && answer.time < BonusTime.FAST) {
    return Result.FAST;
  }
  if (answer.isCorrect && answer.time > BonusTime.SLOW) {
    return Result.SLOW;
  }
  return Result.CORRECT;
};

const adaptResults = (result) => {
  return {
    'lives': result.lives,
    'answers': result.answers
  };
};

export {adaptResults, getAnswerType};

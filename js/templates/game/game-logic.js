import {Result, BonusTime} from './game-data';

const getAnswerType = (answer) => {
  let type;
  if (answer.isCorrect) {
    type = Result.CORRECT;
  }
  if (answer.isCorrect && answer.time < BonusTime.FAST) {
    type = Result.FAST;
  }
  if (answer.isCorrect && answer.time > BonusTime.SLOW) {
    type = Result.SLOW;
  }
  if (!answer.isCorrect) {
    type = Result.WRONG;
  }
  return type;
};

const adaptResults = (result) => {
  return {
    'lives': result.lives,
    'answers': result.answers
  };
};

export {adaptResults, getAnswerType};

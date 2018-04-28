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

const adaptData = (data) => {
  return {
    'lives': data.lives,
    'answers': data.answers
  };
};

export {adaptData, getAnswerType};

import {BonusTime} from '../../data/count-points';

const getAnswerType = (answer) => {
  let type;
  if (answer.isCorrect) {
    type = `correct`;
  }
  if (answer.isCorrect && answer.time < BonusTime.FAST) {
    type = `fast`;
  }
  if (answer.isCorrect && answer.time > BonusTime.SLOW) {
    type = `slow`;
  }
  if (!answer.isCorrect) {
    type = `wrong`;
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

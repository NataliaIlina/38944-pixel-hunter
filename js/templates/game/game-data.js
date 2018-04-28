const Initial = {
  LEVEL: 0,
  TIME: 30,
  LIVES: 3
};

const INITIAL_GAME = Object.freeze({
  level: Initial.LEVEL,
  time: Initial.TIME,
  lives: Initial.LIVES
});

const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

const Result = {
  CORRECT: `correct`,
  WRONG: `wrong`,
  FAST: `fast`,
  SLOW: `slow`
};

const BonusTime = {
  FAST: 10,
  SLOW: 20
};

export {Initial, AnswerType, Result, BonusTime, INITIAL_GAME};

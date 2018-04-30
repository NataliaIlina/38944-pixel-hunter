const Initial = {
  LEVEL: 0,
  TIME: 30,
  LOW_TIME: 5,
  END_TIME: 0,
  TICK_TIME: 1000,
  MAX_LIVES: 3,
  MIN_LIVES: 0,
  LEVEL_STEP: 1
};

const INITIAL_GAME = Object.freeze({
  level: Initial.LEVEL,
  time: Initial.TIME,
  lives: Initial.MAX_LIVES
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

const Initial = {
  LEVEL: 0,
  TIME: 30,
  LIVES: 3
};

const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

const INITIAL_GAME = Object.freeze({
  level: Initial.LEVEL,
  time: Initial.TIME,
  lives: Initial.LIVES
});


export {Initial, QuestionType, AnswerType, INITIAL_GAME};

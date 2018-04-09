import {assert} from 'chai';
import countPoints from './count-points.js';

const Answer = {
  RIGHT: {
    isCorrect: true,
    time: 15
  },
  WRONG: {
    isCorrect: false,
    time: 20
  },
  FAST: {
    isCorrect: true,
    time: 5
  },
  SLOW: {
    isCorrect: true,
    time: 30
  }
};

const allAnswersRight = new Array(10).fill(Answer.RIGHT);
const allAnswersFast = new Array(10).fill(Answer.FAST);
const allAnswersSlow = new Array(10).fill(Answer.SLOW);
const answersWrongAndRight = new Array(10).fill(Answer.RIGHT, 0, 7).fill(Answer.WRONG, 7, 10);

describe(`Check the points`, () => {

  it(`should return positive number of points if get all answers`, () => {
    assert.equal(countPoints(allAnswersRight, 3), 1150);
    assert.equal(countPoints(allAnswersRight, 2), 1100);
    assert.equal(countPoints(allAnswersRight, 1), 1050);
    assert.equal(countPoints(allAnswersRight, 0), 1000);
    assert.equal(countPoints(allAnswersFast, 3), 1650);
    assert.equal(countPoints(allAnswersSlow, 1), 550);
    assert.equal(countPoints(answersWrongAndRight), 700);
  });

  it(`should return error if get not all answers or no array`, () => {
    assert.throws(() => countPoints(new Array(3).fill(Answer.WRONG)), /Получено некорректное количество ответов/);
    assert.throws(() => countPoints([], 0), /Получено некорректное количество ответов/);
    assert.throws(() => countPoints(``, 0), /Ожидается получить массив с ответами/);
    assert.throws(() => countPoints(`if test get a string`, 0), /Ожидается получить массив с ответами/);
  });

  it(`should return error if set lives not a number`, () => {
    assert.throws(() => countPoints(allAnswersRight, []), /Количество жизней должно иметь числовое значение/);
    assert.throws(() => countPoints(allAnswersRight, `string`), /Количество жизней должно иметь числовое значение/);
    assert.throws(() => countPoints(allAnswersRight, false), /Количество жизней должно иметь числовое значение/);
  });

});

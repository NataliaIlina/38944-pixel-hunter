import {assert} from 'chai';
import countPoints from './count-points.js';

const allAnswersRight = [
  [true, 20], [true, 20], [true, 20], [true, 20], [true, 20],
  [true, 20], [true, 20], [true, 20], [true, 20], [true, 20]
];

const allAnswersRightAndFast = [
  [true, 5], [true, 5], [true, 5], [true, 5], [true, 5],
  [true, 5], [true, 5], [true, 5], [true, 5], [true, 5]
];

describe(`Check the points`, () => {

  it(`should return positive number of points if get all answers`, () => {
    assert.equal(countPoints(allAnswersRight, 3), 1150);
    assert.equal(countPoints(allAnswersRight, 2), 1100);
    assert.equal(countPoints(allAnswersRight, 1), 1050);
    assert.equal(countPoints(allAnswersRight, 0), 1000);
    assert.equal(countPoints(allAnswersRightAndFast, 3), 1650);
    assert.equal(countPoints([
      [true, 20], [false, 20], [true, 20], [true, 20], [true, 20],
      [true, 20], [true, 20], [false, 20], [true, 20], [true, 20]
    ], 0), 800);
    assert.equal(countPoints([
      [true, 5], [true, 20], [true, 20], [true, 20], [true, 20],
      [true, 5], [true, 20], [true, 20], [true, 20], [true, 20]
    ], 0), 1100);
    assert.equal(countPoints([
      [true, 30], [true, 20], [true, 20], [true, 20], [true, 20],
      [true, 30], [true, 20], [true, 20], [true, 20], [true, 20]
    ], 0), 900);
    assert.equal(countPoints([
      [false, 30], [true, 20], [true, 20], [false, 5], [true, 20],
      [true, 5], [true, 20], [false, 20], [true, 5], [true, 30]
    ], 0), 750);
    assert.equal(countPoints([
      [false, 30], [true, 20], [true, 20], [false, 5], [true, 20],
      [true, 5], [true, 20], [false, 20], [true, 5], [true, 30]
    ]), 750);
  });

  it(`should return error if get not all answers or no array`, () => {
    assert.throws(() => countPoints([
      [false, 30], [true, 20], [true, 20], [false, 5], [false, 20]], 0), /Получено некорректное количество ответов/);
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

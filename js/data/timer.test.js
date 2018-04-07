import {assert} from 'chai';
import Timer from './timer.js';

describe(`Test timer`, () => {

  it(`should get correct time`, () => {
    assert.equal(new Timer(10).tick(), 9);
    assert.equal(new Timer(138).tick(), 137);
    assert.equal(new Timer(1).tick(), `Таймер закончился`);
  });

  it(`should not set negative values`, () => {
    assert.throws(() => new Timer(-5).tick(), /Значение таймера должно быть больше 0/);
    assert.throws(() => new Timer(0).tick(), /Значение таймера должно быть больше 0/);
  });

  it(`should not set not a number values`, () => {
    assert.throws(() => new Timer(``).tick(), /Значение таймера должно быть числом/);
    assert.throws(() => new Timer(true).tick(), /Значение таймера должно быть числом/);
    assert.throws(() => new Timer({}).tick(), /Значение таймера должно быть числом/);
    assert.throws(() => new Timer(null).tick(), /Значение таймера должно быть числом/);
  });
});

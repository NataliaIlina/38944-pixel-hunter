import {INITIAL_LEVEL_TIME} from './game-data';

const changeLevel = (game, level) => {
  if (typeof level !== `number`) {
    throw new Error(`Ожидается число`);
  } else {
    return Object.assign({}, game, {
      level
    });
  }
};

const die = (game) => {
  const lives = game.lives - 1;

  return Object.assign({}, game, {
    lives
  });
};

const tick = (game) => {
  const time = game.time - 1;

  return Object.assign({}, game, {
    time
  });
};

const restartTime = (game) => {
  const time = INITIAL_LEVEL_TIME;

  return Object.assign({}, game, {
    time
  });
};

export {changeLevel, die, tick, restartTime};

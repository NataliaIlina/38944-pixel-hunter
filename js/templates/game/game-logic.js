const changeLevel = (game, level) => {
  if (typeof level !== `number` || level < 0) {
    throw new Error(`Ожидается положительное число`);
  } else {
    return Object.assign({}, game, {
      level
    });
  }
};

export {changeLevel};

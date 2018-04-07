class Timer {
  constructor(value) {
    if (typeof value !== `number`) {
      throw new Error(`Значение таймера должно быть числом`);
    }
    if (value <= 0) {
      throw new Error(`Значение таймера должно быть больше 0`);
    }
    this.time = value;
  }

  tick() {
    return this.time === 1 ? `Таймер закончился` : --this.time;
  }
}

export default Timer;

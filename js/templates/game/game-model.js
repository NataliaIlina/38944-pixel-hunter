import {INITIAL_LEVEL_TIME, GAME_LEVELS, INITIAL_GAME} from './game-data';
import {changeLevel, die, tick, restartTime} from './game-logic';

const getLevel = (num) => GAME_LEVELS[num];
// модель игры, обрабатывает данные
class GameModel {
  constructor(player) {
    this.player = player;
    this.restart();
  }
  // возвращает состояние игры
  get state() {
    return this._state;
  }
  // инициализация данных
  restart() {
    this._state = INITIAL_GAME;
  }
  // обновляет значение поля time на исходное
  restartTime() {
    this._state = restartTime(this._state);
  }
  // условие выхода из игры
  isDead() {
    return this._state.lives < 0;
  }
  // потеря одной жизни
  die() {
    this._state = die(this._state);
  }
  // есть ли следующий лвл
  hasNextLevel() {
    return getLevel(this._state.level + 1) !== void 0;
  }
  // переключение на след лвл
  nextLevel() {
    this._state = changeLevel(this._state, this._state.level + 1);
  }
  // состояние текущего уровня
  getCurrentLevel() {
    return getLevel(this._state.level);
  }
  // обработка ответа пользователя
  getAnswer(answer) {
    this._state.answers.push(
        {isCorrect: answer, time: INITIAL_LEVEL_TIME - this._state.time}
    );
  }
  // уменьшает значение поля time на 1
  tick() {
    this._state = tick(this._state);
  }
}

export default GameModel;

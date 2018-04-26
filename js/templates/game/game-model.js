import {Initial, INITIAL_GAME} from './game-data';

// модель игры, обрабатывает данные
class GameModel {
  constructor(data, player) {
    this.data = data;
    this.player = player;
    this.restart();
  }
  // возвращает состояние игры
  get state() {
    return this._state;
  }
  // состояние текущего уровня
  get currentLevel() {
    return this.data[this._state.level];
  }
  // инициализация данных
  restart() {
    this._state = Object.assign({}, INITIAL_GAME);
    this._state.answers = [];
  }
  // условие выхода из игры
  isDead() {
    return this._state.lives <= 0;
  }
  // потеря одной жизни
  die() {
    this._state.lives--;
  }
  // есть ли следующий лвл
  hasNextLevel() {
    return this.data[this._state.level + 1] !== void 0;
  }
  // переключение на след лвл
  nextLevel() {
    this._state.level++;
  }
  // обработка ответа пользователя
  getAnswer(answer) {
    this._state.answers.push(
        {isCorrect: answer, time: Initial.TIME - this._state.time}
    );
  }
  // уменьшает значение поля time на 1
  tick() {
    this._state.time--;
  }
  // обновляет значение поля time на исходное
  restartTime() {
    this._state.time = Initial.TIME;
  }
}

export default GameModel;

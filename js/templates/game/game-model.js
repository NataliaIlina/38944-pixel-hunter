import {Initial, INITIAL_GAME} from './game-data';
import {getAnswerType, adaptData} from './game-logic';
import Application from '../../application';

// модель игры, обрабатывает данные
class GameModel {
  constructor(data, player) {
    this._data = data;
    this._player = player;
    this.restart();
  }
  // возвращает состояние игры
  get state() {
    return this._state;
  }
  // состояние текущего уровня
  get currentLevel() {
    return this._data[this._state.level];
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
    return this._data[this._state.level + 1] !== void 0;
  }
  // переключение на след лвл
  nextLevel() {
    this._state.level++;
  }
  // обработка ответа пользователя
  getAnswer(answer) {
    const userAnswer = {isCorrect: answer, time: Initial.TIME - this._state.time};
    this._state.answers.push(
        getAnswerType(userAnswer)
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

  saveResults() {
    Application.showStats(adaptData(this.state), this._player);
  }
}

export default GameModel;

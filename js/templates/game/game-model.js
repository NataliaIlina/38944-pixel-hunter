import {Initial, INITIAL_GAME} from './game-data';
import {getAnswerType, adaptResults} from './game-logic';
import Application from '../../application';

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
    return this._state.lives <= Initial.MIN_LIVES;
  }
  // потеря одной жизни
  die() {
    this._state.lives--;
  }
  // есть ли следующий лвл
  hasNextLevel() {
    return this.data[this._state.level + Initial.LEVEL_STEP] !== void 0;
  }
  // переключение на след лвл
  changeLevel() {
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
    Application.showStats(adaptResults(this.state), this.player);
  }
}

export default GameModel;

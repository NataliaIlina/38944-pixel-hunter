import GameFirstView from './game-first-view';
import GameSecondView from './game-second-view';
import GameThirdView from './game-third-view';
import HeaderView from '../header/header-view';
import ResultView from '../result/result-view';
import FooterView from '../footer/footer-view';
import ModalView from './modal-view';
import Application from '../../application';

const LITTLE_TIME = 5;
const views = {
  'two-of-two': GameFirstView,
  'tinder-like': GameSecondView,
  'one-of-three': GameThirdView
};

class GameScreen {
  constructor(model) {
    this._model = model;
    this._header = this.renderHeader();
    this._content = this.renderLevel(this._model.currentLevel);
    this._results = new ResultView(this._model.state.answers);
    this._footer = new FooterView();

    this._root = document.createElement(`div`);
    this._root.appendChild(this._header.element);
    this._root.appendChild(this._content.element);
    this._root.appendChild(this._results.element);
    this._root.appendChild(this._footer.element);
    this._interval = null;
  }

  get element() {
    return this._root;
  }

  renderLevel(level) {
    // получаем нужную вьюшку
    const View = views[level.type];
    const content = new View(level);
    content.onAnswer = this.onAnswer.bind(this);
    return content;
  }

  // собираем хэдер + обработчики
  renderHeader() {
    const header = new HeaderView(this._model.state);
    header.onBackButtonClick = () => {
      this.stopGame();
      this._root.appendChild(this.renderModal().element);
    };
    if (this._model.state.time <= LITTLE_TIME) {
      header.element.querySelector(`.game__timer`).classList.add(`blinker`);
    }
    return header;
  }
  // собираем модалку + обработчики
  renderModal() {
    const modal = new ModalView();
    modal.onResetClick = () => {
      this.endGame();
      Application.showGreeting();
      modal.element.remove();
    };
    modal.onContinueClick = () => {
      this.continueGame();
      modal.element.remove();
    };
    return modal;
  }
  // таймер для игры
  startTimer() {
    this._interval = setInterval(() => {
      this._model.tick();
      if (this._model.state.time <= 0) {
        this.stopGame();
        this.onAnswer(false);
      }
      this.updateHeader();
    }, 1000);
  }
  // инициализация игры - установка первоначальных параметров + старт игры
  init() {
    this._model.restart();
    this.startGame();
  }

  startGame() {
    this.changeLevel();
    this.startTimer();
  }

  stopGame() {
    clearInterval(this._interval);
  }

  continueGame() {
    this.startTimer();
  }

  endGame(save) {
    if (save) {
      this._model.saveResults();
      // Application.showStats();
    }
    this._model.restart();
  }
  // обработка ответа пользователя
  onAnswer(answer) {
    this.stopGame();
    this._model.getAnswer(answer);

    if (!this._model.hasNextLevel() || this._model.isDead() && !answer) {
      this.endGame(true);
    } else if (!answer) {
      this._model.die();
      this._model.nextLevel();
      this.startGame();
    } else {
      this._model.nextLevel();
      this.startGame();
    }
  }
  // обновление хэдера
  updateHeader() {
    const header = this.renderHeader();
    this._root.replaceChild(header.element, this._header.element);
    this._header = header;
  }
  // обновление результатов
  updateResults() {
    const results = new ResultView(this._model.state.answers);
    this._root.replaceChild(results.element, this._results.element);
    this._results = results;
  }
  // смена игрового экрана
  changeContentView(view) {
    this._root.replaceChild(view.element, this._content.element);
    this._content = view;
  }
  // смена уровня
  changeLevel() {
    this._model.restartTime();
    this.changeContentView(this.renderLevel(this._model.currentLevel));
    this.updateResults();
    this.updateHeader();
  }
}

export default GameScreen;

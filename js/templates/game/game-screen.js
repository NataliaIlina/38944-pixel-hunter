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
    this.model = model;
    this.header = this._renderHeader();
    this.content = this._renderLevel(this.model.currentLevel);
    this.results = new ResultView(this.model.state.answers);
    this.footer = new FooterView();

    this.root = document.createElement(`div`);
    this.root.appendChild(this.header.element);
    this.root.appendChild(this.content.element);
    this.root.appendChild(this.results.element);
    this.root.appendChild(this.footer.element);
    this._interval = null;
  }

  get element() {
    return this.root;
  }

  _renderLevel(level) {
    // получаем нужную вьюшку
    const View = views[level.type];
    const content = new View(level);
    content.onAnswer = this._onAnswer.bind(this);
    return content;
  }

  // собираем хэдер + обработчики
  _renderHeader() {
    const header = new HeaderView(this.model.state);
    header.onBackButtonClick = () => {
      this._stopGame();
      this.root.appendChild(this._renderModal().element);
    };
    if (this.model.state.time <= LITTLE_TIME) {
      header.element.querySelector(`.game__timer`).classList.add(`blinker`);
    }
    return header;
  }
  // собираем модалку + обработчики
  _renderModal() {
    const modal = new ModalView();
    modal.onResetClick = () => {
      this._endGame();
      Application.showGreeting();
      modal.element.remove();
    };
    modal.onContinueClick = () => {
      this._continueGame();
      modal.element.remove();
    };
    return modal;
  }
  // таймер для игры
  _startTimer() {
    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.state.time <= 0) {
        this._stopGame();
        this._onAnswer(false);
      }
      this._updateHeader();
    }, 1000);
  }
  // инициализация игры - установка первоначальных параметров + старт игры
  init() {
    this.model.restart();
    this._startGame();
  }

  _startGame() {
    this._changeLevel();
    this._startTimer();
  }

  _stopGame() {
    clearInterval(this._interval);
  }

  _continueGame() {
    this._startTimer();
  }

  _endGame(save) {
    if (save) {
      this.model.saveResults();
      // Application.showStats();
    }
    this.model.restart();
  }
  // обработка ответа пользователя
  _onAnswer(answer) {
    this._stopGame();
    this.model.getAnswer(answer);

    if (!this.model.hasNextLevel() || this.model.isDead() && !answer) {
      this._endGame(true);
    } else if (!answer) {
      this.model.die();
      this.model.nextLevel();
      this._startGame();
    } else {
      this.model.nextLevel();
      this._startGame();
    }
  }
  // обновление хэдера
  _updateHeader() {
    const header = this._renderHeader();
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }
  // обновление результатов
  _updateResults() {
    const results = new ResultView(this.model.state.answers);
    this.root.replaceChild(results.element, this.results.element);
    this.results = results;
  }
  // смена игрового экрана
  _changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }
  // смена уровня
  _changeLevel() {
    this.model.restartTime();
    this._changeContentView(this._renderLevel(this.model.currentLevel));
    this._updateResults();
    this._updateHeader();
  }
}

export default GameScreen;

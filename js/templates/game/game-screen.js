import GameFirstView from './game-first-view.js';
import GameSecondView from './game-second-view.js';
import GameThirdView from './game-third-view.js';
import HeaderView from '../header/header-view.js';
import ResultView from '../result-view.js';
import FooterView from '../footer/footer-view';
import ModalView from './modal-view';
import Application from '../../application';

const views = {
  'two-images': GameFirstView,
  'one-image': GameSecondView,
  'three-images': GameThirdView
};

const totalResults = [
  {
    level: 0,
    time: 30,
    lives: 1,
    victory: true,
    answers: new Array(10).fill({isCorrect: true, time: 5})
  },
  {
    level: 0,
    time: 30,
    lives: 3,
    victory: true,
    answers: new Array(10).fill({isCorrect: true, time: 20})
  }
];


class GameScreen {
  constructor(model) {
    this.model = model;
    this.header = this.renderHeader();
    this.View = this.chooseView(this.model.getCurrentLevel());
    this.content = new this.View(this.model.getCurrentLevel());
    this.content.onAnswer = this.answer.bind(this);
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
  // не нравится эта функция
  chooseView(level) {
    // из вьюшек выбираем ту, которая соответствует типу лвла
    return views[level.type];
  }
  // собираем хэдер + обработчики
  renderHeader() {
    const header = new HeaderView(this.model.state);
    header.onBackButtonClick = () => {
      this.stopGame();
      this.root.appendChild(this.renderModal().element);
    };
    if (this.model.state.time <= 5) {
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
      this.model.tick();
      if (this.model.state.time <= 0) {
        this.stopGame();
        this.answer(false);
      }
      this.updateHeader();
    }, 1000);
  }
  // инициализация игры - установка первоначальных параметров + старт игры
  init() {
    this.model.restart();
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
    setInterval(this.startTimer());
  }

  endGame() {
    totalResults.unshift(this.model.state);
    Application.showStats(totalResults);
    this.model.restart();
  }
  // обработка ответа пользователя
  answer(answer) {
    this.stopGame();
    this.model.getAnswer(answer);

    if (answer) {
      if (this.model.hasNextLevel()) {
        this.model.nextLevel();
        this.startGame();
      } else {
        this.endGame();
      }
    } else {
      if (!this.model.isDead() && this.model.hasNextLevel()) {
        this.model.die();
        this.model.nextLevel();
        this.startGame();
      } else {
        this.endGame();
      }
    }
  }
  // обновление хэдера
  updateHeader() {
    const header = this.renderHeader();
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }
  // обновление результатов
  updateResults() {
    const results = new ResultView(this.model.state.answers);
    this.root.replaceChild(results.element, this.results.element);
    this.results = results;
  }
  // смена уровня
  changeLevel() {
    this.model.restartTime();
    // с переменной View забористо получилось
    this.View = this.chooseView(this.model.getCurrentLevel());
    const level = new this.View(this.model.getCurrentLevel());
    level.onAnswer = this.answer.bind(this);
    this.changeContentView(level);
    this.updateResults();
    this.updateHeader();
  }
  // смена игрового экрана
  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }
}

export default GameScreen;

import GameFirstView from './game-first-view.js';
import GameSecondView from './game-second-view.js';
import GameThirdView from './game-third-view.js';
import HeaderView from '../header/header-view.js';
import ResultView from '../result-view.js';
import FooterView from '../footer/footer-view';
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
    this.header = new HeaderView(this.model.state);
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

  init() {
    this.restartGame();
    this.startGame();
  }

  answer(answer) {
    this.stopGame();
    this.model.getAnswer(answer);

    if (!answer) {
      this.model.die();
    }

    if (!this.model.isDead() && this.model.hasNextLevel()) {
      this.model.nextLevel();
      this.startGame();
    } else {
      this.endGame();
    }
  }

  startGame() {
    this.changeLevel();

    this._interval = setInterval(() => {
      this.model.tick();
      if (this.model.state.time <= 0) {
        this.stopGame();
        this.answer(false);
      }
      this.updateHeader();
    }, 1000);
  }

  endGame() {
    totalResults.unshift(this.model.state);
    Application.showStats(totalResults);
  }

  stopGame() {
    clearInterval(this._interval);
  }

  restartGame() {
    this.model.restart();
  }

  updateHeader() {
    const header = new HeaderView(this.model.state);
    this.root.replaceChild(header.element, this.header.element);
    this.header = header;
  }

  updateResults() {
    const results = new ResultView(this.model.state.answers);
    this.root.replaceChild(results.element, this.results.element);
    this.results = results;
  }

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

  changeContentView(view) {
    this.root.replaceChild(view.element, this.content.element);
    this.content = view;
  }
}

export default GameScreen;

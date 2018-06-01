(function () {
'use strict';

const getElementFromTemplate = (template) => {
  const element = document.createElement(`div`);
  element.innerHTML = template;
  return element;
};

class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error(`Невозможно создать объект с таким именем`);
    }
  }

  get template() {
    throw new Error(`Не найден подходящий шаблон`);
  }

  get element() {
    if (this._element) {
      return this._element;
    }
    this._element = this.render();
    this.bind(this._element);
    return this._element;
  }

  render() {
    return getElementFromTemplate(this.template);
  }

  bind() {

  }
}

class IntroView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div id="main" class="central__content">
        <div id="intro" class="intro">
          <h1 class="intro__asterisk rotate">*</h1>
          <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
        </div>
      </div>`;
  }

  render() {
    const element = getElementFromTemplate(this.template);
    element.classList.add(`intro-layout`);
    return element;
  }

  hide() {
    this.element.style = `opacity: 0; transition: opacity 2s linear`;
  }
}

class FooterView extends AbstractView {
  get template() {
    return `<footer class="footer">
        <a href="https://htmlacademy.ru" class="social-link social-link--academy">HTML Academy</a>
        <span class="footer__made-in">Сделано в <a href="https://htmlacademy.ru" class="footer__link">HTML Academy</a> &copy; 2016</span>
        <div class="footer__social-links">
          <a href="https://twitter.com/htmlacademy_ru" class="social-link  social-link--tw">Твиттер</a>
          <a href="https://www.instagram.com/htmlacademy/" class="social-link  social-link--ins">Инстаграм</a>
          <a href="https://www.facebook.com/htmlacademy" class="social-link  social-link--fb">Фэйсбук</a>
          <a href="https://vk.com/htmlacademy" class="social-link  social-link--vk">Вконтакте</a>
        </div>
      </footer>`;
  }
}

class GreetingView extends AbstractView {
  get template() {
    return `<div class="greeting central--blur">
        <div class="greeting__logo"><img src="img/logo_big.png" width="201" height="89" alt="Pixel Hunter"></div>
        <h1 class="greeting__asterisk">*</h1>
        <div class="greeting__challenge">
          <h3>Лучшие художники-фотореалисты бросают&nbsp;тебе&nbsp;вызов!</h3>
          <p>Правила игры просты.<br>
            Нужно отличить рисунок&nbsp;от фотографии и сделать выбор.<br>
            Задача кажется тривиальной, но не думай, что все так просто.<br>
            Фотореализм обманчив и коварен.<br>
            Помни, главное — смотреть очень внимательно.</p>
        </div>
        <div class="greeting__continue"><span><img src="img/arrow_right.svg" width="64" height="64" alt="Next"></span></div>
      </div>
      ${new FooterView().template}`;
  }

  bind() {
    this.element.querySelector(`.greeting__continue`).addEventListener(`click`, () => {
      Application.showRules();
    });
  }

  hide() {
    this.element.children[0].style = `opacity: 0`;
  }

  show() {
    this.element.children[0].style = ``;
    this.element.children[0].classList.add(`fade-in`);
  }

  addLoader(loader) {
    this.element.appendChild(loader);
  }

  removeLoader(loader) {
    loader.remove();
  }
}

const Initial = {
  LEVEL: 0,
  TIME: 30,
  LOW_TIME: 5,
  END_TIME: 0,
  TICK_TIME: 1000,
  MAX_LIVES: 3,
  MIN_LIVES: 0,
  LEVEL_STEP: 1
};

const INITIAL_GAME = Object.freeze({
  level: Initial.LEVEL,
  time: Initial.TIME,
  lives: Initial.MAX_LIVES
});

const QuestionType = {
  TWO_OF_TWO: `two-of-two`,
  TINDER_LIKE: `tinder-like`,
  ONE_OF_THREE: `one-of-three`
};

const AnswerType = {
  PAINTING: `painting`,
  PHOTO: `photo`
};

const Result = {
  CORRECT: `correct`,
  WRONG: `wrong`,
  FAST: `fast`,
  SLOW: `slow`
};

const BonusTime = {
  FAST: 10,
  SLOW: 20
};

class HeaderView extends AbstractView {
  constructor(game) {
    super();
    this.game = game;
  }

  get template() {
    return `<header class="header">
      <div class="header__back">
        <button class="back">
          <img src="img/arrow_left.svg" width="45" height="45" alt="Back">
          <img src="img/logo_small.svg" width="101" height="44">
        </button>
      </div>
      ${this.game ? `<h1 class="game__timer">${this.game.time}</h1>
      <div class="game__lives">
        ${new Array(Initial.MAX_LIVES - this.game.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
        ${new Array(this.game.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      </div>` : ``}
      </header>`;
  }

  bind() {
    this.element.querySelector(`.back`).addEventListener(`click`, () => {
      this.onBackButtonClick();
    });
  }

  onBackButtonClick() {

  }
}

class RulesView extends AbstractView {
  get template() {
    return `<div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>
    ${new FooterView().template}`;
  }

  _renderHeader() {
    const header = new HeaderView();
    header.onBackButtonClick = () => {
      Application.showGreeting();
    };
    return header.element;
  }

  render() {
    const element = getElementFromTemplate(this.template);
    element.insertAdjacentElement(`afterbegin`, this._renderHeader());
    return element;
  }

  bind() {
    const form = this.element.querySelector(`.rules__form`);
    const button = form.querySelector(`.rules__button`);
    const userName = form.querySelector(`.rules__input`);

    userName.addEventListener(`input`, () => {
      button.disabled = userName.value ? false : true;
    });

    form.addEventListener(`submit`, (evt) => {
      evt.preventDefault();
      Application.showGame(userName.value);
      userName.value = ``;
      button.disabled = true;
    });
  }
}

const MAX_CHECKED_NUMBER = 2;

class GameFirstView extends AbstractView {
  constructor(level) {
    super();
    this.answers = level.answers;
    this.question = level.question;
  }

  get template() {
    return `<div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content">
  ${this.answers.map((answer, index) => {
    return `<div class="game__option">
      <img src="${answer.image.url}" alt="Option ${index + 1}" width="${answer.image.width}" height="${answer.image.height}">
      <label class="game__answer  game__answer--photo">
        <input name="question${index + 1}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer  game__answer--paint">
        <input name="question${index + 1}" type="radio" value="painting">
        <span>Рисунок</span>
      </label>
    </div>`;
  }).join(``)}
      </form>
    </div>`;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);

    form.addEventListener(`change`, () => {
      // кол-во чекнутых кнопок
      const checkedButtons = form.querySelectorAll(`input[type="radio"]:checked`);
      // если 2 - проверяем ответы
      if (checkedButtons.length === MAX_CHECKED_NUMBER) {
        const answerFirst = form.querySelector(`input[name=question1]:checked`);
        const answerSecond = form.querySelector(`input[name=question2]:checked`);
        if (answerFirst && answerSecond) {
          const answer = answerFirst.value === this.answers[0].type && answerSecond.value === this.answers[1].type;
          this.onAnswer(answer);
        }
        form.reset();
      }
    });
  }

  onAnswer() {

  }
}

class GameSecondView extends AbstractView {
  constructor(level) {
    super();
    this.answers = level.answers;
    this.question = level.question;
  }

  get template() {
    return `<div class="game">
    <p class="game__task">${this.question}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${this.answers[0].image.url}" alt="Option 1" width="${this.answers[0].image.width}" height="${this.answers[0].image.height}">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer  game__answer--wide  game__answer--paint">
            <input name="question1" type="radio" value="painting">
            <span>Рисунок</span>
          </label>
        </div>
      </form>
    </div>`;
  }

  bind() {
    const form = this.element.querySelector(`.game__content`);
    form.addEventListener(`change`, () => {
      const userAnswer = form.querySelector(`input[name=question1]:checked`).value;
      const answer = userAnswer === this.answers[0].type;
      this.onAnswer(answer);
      form.reset();
    });
  }

  onAnswer() {

  }
}

class GameThirdView extends AbstractView {
  constructor(level) {
    super();
    this.level = level;
    this.answers = level.answers;
    this.question = level.question;
  }

  get template() {
    return `<div class="game">
      <p class="game__task">${this.question}</p>
      <form class="game__content  game__content--triple">
  ${this.answers.map((answer) => {
    return `<div class="game__option">
      <img src="${answer.image.url}" alt="Option 1" width="${answer.image.width}" height="${answer.image.height}">
    </div>`;
  })}
      </form>
    </div>`;
  }

  bind() {
    // ищем тип правильного ответа
    const wrightType = this.question.includes(`фото`) ? AnswerType.PHOTO : AnswerType.PAINTING;
    // массив адресов картинок
    const srcArray = this.answers.map((item) => item.image.url);
    const form = this.element.querySelector(`.game__content`);

    form.addEventListener(`click`, (evt) => {
      // индекс src элемента. по которому кликнули
      const answerIndex = srcArray.indexOf(evt.target.children[0].src);
      // проверяем совпадает ли тип выбранной картинки с типом правильного ответа
      const answer = this.answers[answerIndex].type === wrightType;
      this.onAnswer(answer);
    });
  }

  onAnswer() {

  }
}

class ResultView extends AbstractView {
  constructor(answers) {
    super();
    this.answers = answers;
  }

  get template() {
    return `<div class="stats">
      <ul class="stats">
        ${this.answers.map((className) => `<li class="stats__result stats__result--${className}"></li>`).join(``)}
        ${new Array(10 - this.answers.length).fill(`<li class="stats__result stats__result--unknown"></li>`).join(``)}
      </ul>
    </div>`;
  }
}

class ModalView extends AbstractView {
  constructor() {
    super();
  }

  get template() {
    return `<div class="game__modal">
        <p class="game__modal-title">
          Все результаты текущей игры будут утеряны.<br /> Хотите выйти?
        </p>
        <button type="button" class="game__modal-button  game__modal-button--reset">Да</button>
        <button type="button" class="game__modal-button  game__modal-button--continue">Нет</button>
      </div>`;
  }

  bind() {
    this.element.querySelector(`.game__modal-button--reset`).addEventListener(`click`, () => {
      this.onResetClick();
    });
    this.element.querySelector(`.game__modal-button--continue`).addEventListener(`click`, () => {
      this.onContinueClick();
    });
  }

  onResetClick() {

  }

  onContinueClick() {

  }
}

const Views = {
  [QuestionType.TWO_OF_TWO]: GameFirstView,
  [QuestionType.TINDER_LIKE]: GameSecondView,
  [QuestionType.ONE_OF_THREE]: GameThirdView
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
  // инициализация игры - установка первоначальных параметров + старт игры
  init() {
    this.model.restart();
    this._startGame();
  }

  _renderLevel(level) {
    // получаем нужную вьюшку
    const View = Views[level.type];
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
    if (this.model.state.time <= Initial.LOW_TIME) {
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
      if (this.model.state.time <= Initial.END_TIME) {
        this._stopGame();
        this._onAnswer(false);
      }
      this._updateHeader();
    }, Initial.TICK_TIME);
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
      this.model.changeLevel();
      this._startGame();
    } else {
      this.model.changeLevel();
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

const getAnswerType = (answer) => {
  if (!answer.isCorrect) {
    return Result.WRONG;
  }
  if (answer.isCorrect && answer.time < BonusTime.FAST) {
    return Result.FAST;
  }
  if (answer.isCorrect && answer.time > BonusTime.SLOW) {
    return Result.SLOW;
  }
  return Result.CORRECT;
};

const adaptResults = (result) => {
  return {
    'lives': result.lives,
    'answers': result.answers
  };
};

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

const MAX_ANSWERS_NUMBER = 10;

const BonusPoint = {
  ANSWER: 100,
  TIME: 50,
  LIFE: 50
};

const countAnswers = (result) => {
  if (!Array.isArray(result.answers)) {
    throw new Error(`Ожидается получить массив с ответами`);
  }
  if (result.answers.length < MAX_ANSWERS_NUMBER) {
    return false;
  }
  // считаем правильные ответы
  const rightAnswers = result.answers.filter((answer) => answer !== Result.WRONG);
  // считаем быстрые ответы
  const fastAnswers = rightAnswers.filter((answer) => answer === Result.FAST);
  // считаем долгие ответы
  const slowAnswers = rightAnswers.filter((answer) => answer === Result.SLOW);
  // общее кол-во ответов
  const AnswerResult = {
    RIGHT: rightAnswers.length,
    FAST: fastAnswers.length,
    SLOW: slowAnswers.length,
    LIVES: result.lives
  };

  return AnswerResult;
};

const countPoints = (answers) => {
  // общее кол-во набранных очков
  const points = answers.RIGHT * BonusPoint.ANSWER + answers.FAST * BonusPoint.TIME - answers.SLOW * BonusPoint.TIME + answers.LIVES * BonusPoint.LIFE;
  return points;
};

class StatsView extends AbstractView {
  constructor(result, points, index) {
    super();
    this.result = result;
    this.points = points;
    this.index = index;
    this.answers = this.result.answers;
    this.view = new ResultView(this.answers).template;
    this.answerResult = countAnswers(this.result);
    this.total = countPoints(this.answerResult);
  }

  get template() {
    return `<table class="result__table">
    ${this.answerResult ? `
      <tr>
        <td class="result__number">${this.index}.</td>
        <td colspan="2">
          ${this.view}
        </td>
        <td class="result__points">×&nbsp;${this.points.ANSWER}</td>
        <td class="result__total">${this.points.ANSWER * this.answerResult.RIGHT}</td>
      </tr>
      ${this.answerResult.FAST ? `<tr>
              <td></td>
              <td class="result__extra">Бонус за скорость:</td>
              <td class="result__extra">${this.answerResult.FAST}&nbsp;<span class="stats__result stats__result--fast"></span></td>
              <td class="result__points">×&nbsp;${this.points.TIME}</td>
              <td class="result__total">${this.answerResult.FAST * this.points.TIME}</td>
            </tr>` : ``}
      ${this.answerResult.LIVES ? `<tr>
              <td></td>
              <td class="result__extra">Бонус за жизни:</td>
              <td class="result__extra">${this.answerResult.LIVES}&nbsp;<span class="stats__result stats__result--alive"></span></td>
              <td class="result__points">×&nbsp;${this.points.LIFE}</td>
              <td class="result__total">${this.answerResult.LIVES * this.points.LIFE}</td>
            </tr>` : ``}
      ${this.answerResult.SLOW ? `<tr>
              <td></td>
              <td class="result__extra">Штраф за медлительность:</td>
              <td class="result__extra">${this.answerResult.SLOW}&nbsp;<span class="stats__result stats__result--slow"></span></td>
              <td class="result__points">×&nbsp;${this.points.TIME}</td>
              <td class="result__total">-${this.answerResult.SLOW * this.points.TIME}</td>
            </tr>` : ``}
      <tr>
        <td colspan="5" class="result__total  result__total--final">${this.total}</td>
      </tr>` : `<tr>
        <td class="result__number">${this.index}</td>
        <td>
          ${this.view}
        </td>
        <td class="result__total"></td>
        <td class="result__total  result__total--final">fail</td>
      </tr>`}
    </table>`;
  }
}

const MIN_ANWSERS_FOR_WIN = 7;

class StatisticsView extends AbstractView {
  constructor(results) {
    super();
    this.results = results.reverse();
    // у последней попытки считаем кол-во правильных ответов
    this.rightAnswers = this.results[0].answers.filter((answer) => answer !== `wrong`).length;
    // превращаем массив в шаблоны
    this.stats = this.results.map((result, index) => {
      return new StatsView(result, BonusPoint, index + 1).template;
    }).join(``);
  }

  get template() {
    return `<div class="result">
      <h1>${this.rightAnswers >= MIN_ANWSERS_FOR_WIN ? `Победа!` : `Поражение :(`}</h1>
      ${this.stats}
      </div>`;
  }

  _renderHeader() {
    const header = new HeaderView();
    header.onBackButtonClick = () => {
      Application.showGreeting();
    };
    return header.element;
  }

  render() {
    const element = getElementFromTemplate(this.template);
    element.insertAdjacentElement(`afterbegin`, this._renderHeader());
    return element;
  }
}

class ErrorView extends AbstractView {
  constructor(error) {
    super();
    this.error = error;
  }

  get template() {
    return `<div class="error">${this.error}</div>`;
  }

  bind() {
    this.element.addEventListener(`click`, () => {
      this.element.remove();
    });
  }
}

const resize = (frame, image) => {
  let width = image.width;
  let height = image.height;

  const ratio = width / height;

  if (width > frame.width) {
    width = frame.width;
    height = width / ratio;
  }
  if (height > frame.height) {
    height = frame.height;
    width = height * ratio;
  }

  width = Math.floor(width);
  height = Math.floor(height);

  return {width, height};
};

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  }
  throw new Error(`${response.status}: ${response.statusText}`);
};

const toJSON = (response) => response.json();
// обработчик ошибок
const onError = (error) => {
  const errorPopup = new ErrorView(error).element;
  document.body.insertAdjacentElement(`afterbegin`, errorPopup);
};
// грузим данные с адреса
const loadData = (url) => {
  return fetch(url)
      .then(checkStatus)
      .then(toJSON);
};
// промис под одну картинку
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = () => reject(`Не удалось загрузить картнку: ${url}`);
  });
};
// изменяем размеры картинок в исходникак под фреймы
const preloadImages = (data) => {
  // массив для промисов
  const promises = [];
  data.forEach((question) => {
    const answers = question.answers;
    answers.forEach((answer) => {
      // для каждой картинки создаем промис и пушим в массив
      promises.push(loadImage(answer.image.url)
      // при успешкной загрузке меняем размер в исходных данных
          .then((image) => {
            const newSize = resize(answer.image, image);
            answer.image.width = newSize.width;
            answer.image.height = newSize.height;
          })
          .catch((error) => onError(error)));
    });
  });
  // возвращаем промисы всех картинок
  return Promise.all(promises);
};

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = 30081986;
const DEFAULT_NAME = `unknown_raccoon`;

class Loader {
  static saveResults(data, name = DEFAULT_NAME) {
    const settings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, settings)
        .then(checkStatus)
        .catch((error) => onError(`Не удалось сохранить результаты текущей игры (${error})`));
  }

  static loadResults(name = DEFAULT_NAME) {
    return loadData(`${SERVER_URL}/stats/${APP_ID}-${name}`)
        .catch((error) => onError(`Произошла ошибка загрузки статистики (${error})`));
  }

  static loadQuestions() {
    return loadData(`${SERVER_URL}/questions`);
  }
}

const TIME_FOR_REMOVE_LOADER = 2000;
const main = document.querySelector(`.central`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};
let gameData;

class Application {

  static start() {
    const intro = new IntroView();
    const greeting = new GreetingView();
    greeting.hide();
    greeting.addLoader(intro.element);
    changeView(greeting.element);
    Loader.loadQuestions()
        .then((data) => {
          gameData = data;
          return data;
        })
        .then((data) => preloadImages(data))
        .then(() => intro.hide())
        .then(() => greeting.show())
        .then(() => setTimeout(() => {
          greeting.removeLoader(intro.element);
        }, TIME_FOR_REMOVE_LOADER))
        .catch((error) => onError(`Произошла ошибка загрузки данных (${error})`));
  }

  static showGreeting() {
    const greeting = new GreetingView();
    changeView(greeting.element);
  }

  static showRules() {
    const rules = new RulesView();
    changeView(rules.element);
  }

  static showGame(playerName) {
    const gameModel = new GameModel(gameData, playerName);
    const gameScreen = new GameScreen(gameModel);
    changeView(gameScreen.element);
    gameScreen.init();
  }

  static showStats(model, player) {
    Loader.saveResults(model, player)
        .then(() => Loader.loadResults(player))
        .then((data) => new StatisticsView(data))
        .then((stats) => changeView(stats.element))
        .catch(() => this.showGreeting());
  }
}

Application.start();

}());

//# sourceMappingURL=main.js.map

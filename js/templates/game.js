import GameFirstView from './game-first-view.js';
import GameSecondView from './game-second-view.js';
import GameThirdView from './game-third-view.js';
import HeaderView from './header-view.js';
import {initialState} from '../data/data.js';
import {changeView} from '../utils/util.js';
import endScreen from './stats.js';
import renderResult from './results.js';
import LevelType from '../data/level.js';
import getRandomNumber from '../utils/get-random-number.js';
const MAX_ANSWERS = 10;

const gameState = Object.assign({}, initialState);
// игровой экран
const gameScreen = document.createElement(`div`);

// массив уровней игры
const gameLevels = [
  new GameFirstView(LevelType.FIRST),
  new GameSecondView(LevelType.SECOND),
  new GameThirdView(LevelType.THIRD)
];

const renderGame = (level) => {
  // обнуляем содержимое экрана
  gameScreen.innerHTML = ``;
  // добавляем хедер
  gameScreen.insertAdjacentElement(`afterbegin`, new HeaderView(gameState).element);
  // добавляем элемент игры
  gameScreen.appendChild(level.element);
  gameScreen.appendChild(renderResult(gameState.answers));
};


const onUserAnswer = () => {
  gameState.answers.push({isCorrect: true, time: 7});
  if (gameState.answers.length === MAX_ANSWERS || gameState.lives === 0) {
    changeView(endScreen);
  } else {
    renderGame(gameLevels[getRandomNumber(0, 2)]);
  }
};

const onWrongUserAnswer = () => {
  gameState.answers.push({isCorrect: false, time: 15});
  gameState.lives -= 1;
  if (gameState.answers.length === MAX_ANSWERS || gameState.lives === 0) {
    changeView(endScreen);
  } else {
    renderGame(gameLevels[getRandomNumber(0, 2)]);
  }
};

gameLevels.forEach((level) => {
  level.onAnswer = onUserAnswer;
  level.onWrongAnswer = onWrongUserAnswer;
});


renderGame(gameLevels[getRandomNumber(0, 2)]);

export default gameScreen;

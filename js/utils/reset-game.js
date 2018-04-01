import greetingScreen from '../templates/greeting.js';
import showScreen from '../utils/show-screen.js';

const resetGame = (screen) => {
  screen.querySelector(`.back`).addEventListener(`click`, () => {
    showScreen(greetingScreen);
  });
};

export default resetGame;

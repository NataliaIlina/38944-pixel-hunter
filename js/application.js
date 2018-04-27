import IntroView from './templates/intro/intro-view';
import GreetingView from './templates/greeting/greeting-view';
import RulesView from './templates/rules/rules-view';
import GameScreen from './templates/game/game-screen';
import GameModel from './templates/game/game-model';
import StatisticsView from './templates/statistics/statistics-view';
import Loader from './loader/loader';

const main = document.querySelector(`.central`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};
let gameData;

class Application {

  static start() {
    const intro = new IntroView();
    changeView(intro.element);
    Loader.loadQuestions()
        .then((data) => {
          gameData = data;
          return data;
        })
        .then((data) => Loader.preloadImages(data))
        // анимация исчезновения экрана
        .then(() => intro.remove())
        // появление экрана
        .then(() => {
          setTimeout(() => {
            this.showGreeting();
          }, 2000);
        });
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
        .then((elem) => changeView(elem.element));
  }
}

export default Application;

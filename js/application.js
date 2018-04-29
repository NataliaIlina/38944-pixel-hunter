import IntroView from './templates/intro/intro-view';
import GreetingView from './templates/greeting/greeting-view';
import RulesView from './templates/rules/rules-view';
import GameScreen from './templates/game/game-screen';
import GameModel from './templates/game/game-model';
import StatisticsView from './templates/statistics/statistics-view';
import Loader from './loader/loader';

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
        .then((data) => Loader.preloadImages(data))
        .then(() => intro.hide())
        .then(() => greeting.show())
        .then(() => setTimeout(() => {
          greeting.removeLoader(intro.element);
        }, TIME_FOR_REMOVE_LOADER));
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
        .then((elem) => changeView(elem.element))
        .catch(() => this.showGreeting());
  }
}

export default Application;

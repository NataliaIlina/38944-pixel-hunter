import IntroView from './templates/intro/intro-view';
import GreetingView from './templates/greeting/greeting-view';
import RulesView from './templates/rules/rules-view';
import GameScreen from './templates/game/game-screen';
import GameModel from './templates/game/game-model';
import StatisticsView from './templates/statistics/statistics-view';
import {loadData, loadImages} from './utils/loader';

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
    loadData()
        .then((data) => {
          gameData = data;
          return data;
        })
        .then((data) => loadImages(data))
        .then(() => this.showGreeting());
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

  static showStats(model) {
    const statistics = new StatisticsView(model);
    changeView(statistics.element);
  }
}

export default Application;

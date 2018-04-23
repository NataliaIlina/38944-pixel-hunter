import IntroView from './templates/intro/intro-view';
import GreetingView from './templates/greeting/greeting-view';
import RulesView from './templates/rules/rules-view';
import GameScreen from './templates/game/game-screen';
import GameModel from './templates/game/game-model';
import StatisticsView from './templates/statistics/statistics-view';

const main = document.querySelector(`.central`);
const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
};

class Application {

  static showIntro() {
    const intro = new IntroView();
    changeView(intro.element);
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
    const gameModel = new GameModel(playerName);
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

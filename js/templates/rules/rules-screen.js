import {changeView} from '../../utils/util';
import nextScreen from '../game/game-screen';
import RulesView from './rules-view';

const renderRulesScreen = () => {
  const screen = new RulesView();
  screen.onFormSubmit = () => {
    changeView(nextScreen);
  };
  return screen;
};

export default renderRulesScreen;

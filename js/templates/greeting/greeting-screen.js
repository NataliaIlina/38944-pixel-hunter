import GreetingView from './greeting-view';
import {changeView} from '../../utils/util';
import renderRulesScreen from '../rules/rules-screen';

const renderGreetingScreen = () => {
  const greeting = new GreetingView();
  greeting.onButtonClick = () => {
    changeView(renderRulesScreen().element);
  };
  return greeting;
};

export default renderGreetingScreen;

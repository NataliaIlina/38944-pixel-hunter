import IntroView from './intro-view';
import {changeView} from '../../utils/util';
import renderGreetingScreen from '../greeting/greeting-screen';

const renderIntroScreen = () => {
  const intro = new IntroView();
  intro.onButtonClick = () => {
    changeView(renderGreetingScreen().element);
  };
  return intro;
};

export default renderIntroScreen;

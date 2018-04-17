import renderGreetingScreen from './templates/intro/intro-screen';
import {changeView} from './utils/util';

changeView(renderGreetingScreen().element);

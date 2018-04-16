// import getElementFromTemplate from '../utils/create-elem.js';
import HeaderView from './header-view.js';
import {totalResults} from '../data/data.js';
import StatisticsView from './statistic-view.js';

const header = new HeaderView();

const currentScreen = new StatisticsView(totalResults).element;
currentScreen.insertAdjacentElement(`afterbegin`, header.element);


export default currentScreen;

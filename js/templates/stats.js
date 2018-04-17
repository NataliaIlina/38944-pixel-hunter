// import getElementFromTemplate from '../utils/create-elem.js';
import renderHeader from './header/header-screen.js';
import {totalResults} from '../data/data.js';
import StatisticsView from './statistic-view.js';

const header = renderHeader();

const currentScreen = new StatisticsView(totalResults).element;
currentScreen.insertAdjacentElement(`afterbegin`, header.element);


export default currentScreen;

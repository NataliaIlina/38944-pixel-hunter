import {totalResults} from '../../data/data.js';
import StatisticsView from './statistic-view.js';

const statsScreen = new StatisticsView(totalResults).element;

export default statsScreen;

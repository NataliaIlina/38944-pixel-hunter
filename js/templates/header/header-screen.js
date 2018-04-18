import HeaderView from './header-view';
import {resetGame} from '../../utils/util';

const renderHeader = (game) => {
  const header = new HeaderView(game);
  header.onButtonClick = () => {
    resetGame();
  };
  return header;
};

export default renderHeader;

const main = document.querySelector(`.central`);
import FooterView from '../templates/footer.js';
import greetingScreen from '../templates/greeting.js';

const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
  main.insertAdjacentElement(`beforeend`, new FooterView().element);
};

const resetGame = () => {
  changeView(greetingScreen);
};

export {changeView, resetGame};

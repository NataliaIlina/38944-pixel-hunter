const main = document.querySelector(`.central`);
import FooterView from '../templates/footer/footer-view';
import renderGreetingScreen from '../templates/greeting/greeting-screen';

const changeView = (element) => {
  main.innerHTML = ``;
  main.appendChild(element);
  main.insertAdjacentElement(`beforeend`, new FooterView().element);
};

const resetGame = () => {
  changeView(renderGreetingScreen().element);
};

export {changeView, resetGame};

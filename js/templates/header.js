import renderButton from './back-button.js';

const renderHeader = (game) => {
  const header = document.createElement(`header`);
  header.classList.add(`header`);
  if (game) {
    header.innerHTML = `
    <h1 class="game__timer">${game.time}</h1>
    <div class="game__lives">
      ${new Array(3 - game.lives).fill(`<img src="img/heart__empty.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
      ${new Array(game.lives).fill(`<img src="img/heart__full.svg" class="game__heart" alt="Life" width="32" height="32">`).join(``)}
    </div>`;
  }
  header.insertAdjacentElement(`afterbegin`, renderButton());
  return header;
};

export default renderHeader;

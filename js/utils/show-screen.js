const mainScreen = document.querySelector(`.central`);

const showScreen = (template) => {
  mainScreen.innerHTML = ``;
  mainScreen.appendChild(template);
};

export default showScreen;

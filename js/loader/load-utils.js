import ErrorView from './error-view';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => response.json();

const onError = (error) => {
  const errorPopup = new ErrorView(error).element;
  document.body.insertAdjacentElement(`afterbegin`, errorPopup);
};

// получаем адреса картинок из данных
const getImagesUrls = (data) => {
  // все ответы
  const answers = data.map((item) => item.answers);
  const urls = [];
  // для каждого массива с ответами получаем url картинок
  answers.forEach((answer) => {
    answer.forEach((item) => {
      urls.push(item.image.url);
    });
  });
  return urls;
};

// грузим данные с адреса
const loadData = (url) => {
  return fetch(url)
      .then(checkStatus)
      .then(toJSON);
};
// промис под одну картинку
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(`Не удалось загрузить картнку: ${url}`);
    image.src = url;
  });
};

export {checkStatus, onError, loadData, getImagesUrls, loadImage};

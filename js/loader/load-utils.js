import ErrorView from './error-view';
import {resize} from '../utils/resize';

const checkStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
};

const toJSON = (response) => response.json();
// обработчик ошибок
const onError = (error) => {
  const errorPopup = new ErrorView(error).element;
  document.body.insertAdjacentElement(`afterbegin`, errorPopup);
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
    image.src = url;
    image.onload = () => resolve(image);
    image.onerror = () => reject(`Не удалось загрузить картнку: ${url}`);
  });
};
// изменяем размеры картинок в исходникак под фреймы
const preloadImages = (data) => {
  // массив для промисов
  const promises = [];
  data.forEach((question) => {
    const answers = question.answers;
    answers.forEach((answer) => {
      // для каждой картинки создаем промис и пушим в массив
      promises.push(loadImage(answer.image.url)
      // при успешкной загрузке меняем размер в исходных данных
          .then((image) => {
            const newSize = resize(answer.image, image);
            answer.image.width = newSize.width;
            answer.image.height = newSize.height;
          })
          .catch((error) => onError(error)));
    });
  });
  // возвращаем промисы всех картинок
  return Promise.all(promises);
};

export {checkStatus, onError, loadData, preloadImages};

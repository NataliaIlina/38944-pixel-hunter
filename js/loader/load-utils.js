import ErrorView from './error-view';
import {resize, frameSize} from '../utils/resize';

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
// изменяем размеры картинок в исходникак под фреймы
const resizeImages = (data) => {
  data.forEach((question) => {
    const type = question.type;
    const answers = question.answers;
    answers.forEach((answer) => {
      const image = new Image();
      image.src = answer.image.url;
      image.onload = () => {
        const newSize = resize(frameSize[type], {width: image.width, height: image.height});
        answer.image.width = newSize.width;
        answer.image.height = newSize.height;
      };
    });
  });
  return data;
};

export {checkStatus, onError, loadData, getImagesUrls, loadImage, resizeImages};

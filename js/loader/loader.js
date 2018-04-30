import {checkStatus, onError, loadData, getImagesUrls, loadImage} from './load-utils';
import {resize, frameSize} from '../utils/resize';

const SERVER_URL = `https://es.dump.academy/pixel-hunter`;
const APP_ID = 30081986;
const DEFAULT_NAME = `unknown_raccoon`;

class Loader {
  static saveResults(data, name = DEFAULT_NAME) {
    const settings = {
      body: JSON.stringify(data),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${SERVER_URL}/stats/${APP_ID}-${name}`, settings)
        .then(checkStatus)
        .catch((error) => onError(`Не удалось сохранить результаты текущей игры (${error})`));
  }

  static loadResults(name = DEFAULT_NAME) {
    return loadData(`${SERVER_URL}/stats/${APP_ID}-${name}`)
        .catch((error) => onError(`Произошла ошибка загрузки статистики (${error})`));
  }

  static loadQuestions() {
    return loadData(`${SERVER_URL}/questions`)
    // меняем размер картинок по типу игры
        .then((data) => {
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
        })
        .catch((error) => onError(`Произошла ошибка загрузки данных (${error})`));
  }

  static preloadImages(data) {
    const urls = getImagesUrls(data);
    const promises = urls.map((url) => {
      return loadImage(url);
    });
    return Promise.all(promises);
  }
}

export default Loader;

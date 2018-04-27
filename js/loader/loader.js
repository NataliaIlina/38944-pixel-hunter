import {checkStatus, onError, loadData, getImagesUrls, loadImage} from './load-utils';

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
        .catch(onError);
  }

  static loadResults(name = DEFAULT_NAME) {
    return loadData(`${SERVER_URL}/stats/${APP_ID}-${name}`);
  }

  static loadQuestions() {
    return loadData(`${SERVER_URL}/questions`);
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

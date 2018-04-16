// возвращает целое число от min до max включительно
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};
export default getRandomNumber;

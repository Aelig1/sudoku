export const shuffleArray = <T>(array: Array<T>): Array<T> => {
  return Array.from(array).sort(() => Math.random() - .5);
};

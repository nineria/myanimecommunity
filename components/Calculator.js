export const kFormatter = (num) => {
  const thousand = 999;
  const million = 999999;

  if (Math.abs(num) > thousand && Math.abs(num) < million) {
    return Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + "K";
  } else if (Math.abs(num) > million) {
    return Math.sign(num) * (Math.abs(num) / 1000000).toFixed(1) + "M";
  } else {
    return Math.sign(num) * Math.abs(num);
  }
};

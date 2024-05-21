export const addCommas = (num: number | string) => {
  if (typeof num === 'number') return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  else return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeCommas = (val: string) => {
  return val.replaceAll(',', '');
};

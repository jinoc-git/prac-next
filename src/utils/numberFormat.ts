export const addCommas = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const removeCommas = (val: string) => {
  return Number(val.replaceAll(',', ''));
};

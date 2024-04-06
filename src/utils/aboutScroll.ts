const eventFunc = (e: TouchEvent) => {
  e.preventDefault();
};

export const disableScroll = () => {
  document.addEventListener('touchmove', eventFunc, { passive: false });
};

export const enableScroll = () => {
  document.removeEventListener('touchmove', eventFunc);
};

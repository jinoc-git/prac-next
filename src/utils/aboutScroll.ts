const eventFunc = (e: TouchEvent) => {
  e.preventDefault();
};

export const disableScroll = () => {
  document.body.style.overflow = 'hidden';
  document.addEventListener('touchmove', eventFunc, { passive: false });
};

export const enableScroll = () => {
  document.body.style.overflow = 'auto';
  document.removeEventListener('touchmove', eventFunc);
};

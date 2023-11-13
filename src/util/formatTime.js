export const formatTime = (s) => {
  const seconds = s.toFixed();
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    remaining < 10 ? `0${remaining}` : remaining
  }`;
};

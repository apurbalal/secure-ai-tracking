export const formatDuration = (duration: number): string => {
  if (duration < 1000) {
    return `${duration} ms`;
  }
  const seconds = (duration / 1000).toFixed(2);
  return `${seconds} s`;
};

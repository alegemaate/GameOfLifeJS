// Custom mod
export const modulo = (m: number, n: number): number => {
  if (m >= 0) {
    return m % n;
  }
  return (n - Math.abs(m % n)) % n;
};

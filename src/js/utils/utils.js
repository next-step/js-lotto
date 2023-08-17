export function getIntersection(a, b) {
  if (!Array.isArray(a) || !Array.isArray(b)) {
    throw new Error('');
  }
  const includesInA = v => a.includes(v);
  return b.filter(includesInA);
}

export const test = 1;

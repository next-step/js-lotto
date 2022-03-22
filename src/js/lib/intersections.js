export const intersection = (a, b) => new Set([...a].filter((x) => b.has(x)));

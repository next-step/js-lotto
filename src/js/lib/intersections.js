export const intersections = (a, b) =>
	new Set([...a].filter((x) => new Set(b).has(x)));

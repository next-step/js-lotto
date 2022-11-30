export function memoization(Component, initParam) {
  const cache = { ...initParam };

  return (store) => {
    let isChange = false;

    for (const key in cache) {
      if (cache[key] !== store[key]) {
        isChange = true;
      }
      cache[key] = store[key];
    }

    if (isChange) {
      Component(cache);
    }
  }
}

export const curry =
  (fn) =>
  (...args) =>
    args.length >= fn.length
      ? fn(...args)
      : (...rest) => curry(fn)(...args, ...rest);

export const go = (initialValue, ...fns) =>
  fns.reduce((acc, fn) => fn(acc), initialValue);

export const pipe =
  (...fns) =>
  (arg) =>
    go(arg, ...fns);

export const map = curry((fn, iter) => {
  const iterator = iter[Symbol.iterator]();
  const result = [];

  for (const value of iterator) {
    result.push(fn(value));
  }

  return result;
});

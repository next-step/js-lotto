export function curry(fn) {
  return function curried(...args) {
    return args.length >= fn.length
      ? fn(...args)
      : (...rest) => curried(...args, ...rest);
  };
}

export function go(initialValue, ...fns) {
  return fns.reduce((acc, fn) => fn(acc), initialValue);
}

export function pipe(...fns) {
  return (arg) => go(arg, ...fns);
}

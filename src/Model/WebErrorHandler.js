export class WebErrorHandler {
  static errorProxy(object) {
    return new Proxy(object, {
      get: function (target, prop, receiver) {
        const originalFunction = target[prop];

        if (typeof originalFunction === 'function') {
          return function (...args) {
            try {
              const result = originalFunction.apply(this, args);

              if (result instanceof Promise) {
                return result.catch(({ message }) => {
                  alert(message);

                  return null;
                });
              }

              return result;
            } catch ({ message }) {
              alert(message);
            }
          };
        }

        return originalFunction;
      },
    });
  }
}

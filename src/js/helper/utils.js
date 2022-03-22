export const safeExecutor =
  handler =>
  (...args) => {
    try {
      handler(args);
    } catch (error) {
      alert(error.message);
      return null;
    }
  };

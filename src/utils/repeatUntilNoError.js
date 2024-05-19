const repeatUntilNoError = async (callback) => {
  while (true) {
    try {
      const input = await callback();
      return input;
    } catch (e) {
      console.error(e.message);
    }
  }
};

export default repeatUntilNoError;

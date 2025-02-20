const isIntegerString = (str) =>
  /^\d+$/.test(str) && Number.isInteger(Number(str));

export default isIntegerString;

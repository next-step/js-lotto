const html = (stringArray, ...values) =>
  stringArray.reduce(
    (answer, string, index) => answer + string + (values[index] || ""),
    "",
  );

export default html;

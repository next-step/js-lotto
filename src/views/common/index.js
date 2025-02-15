export const renderLineBreak = (count = 1) => {
  Array.from({ length: count }, () => {
    console.log();
  });
};

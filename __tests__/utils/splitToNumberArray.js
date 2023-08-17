describe(() => {
  it.each([
    {
      input: '1, 2, 3, 4',
      output: [1, 2, 3, 4],
    },
    {
      input: '1,   2, 3  , 4   ',
      output: [1, 2, 3, 4],
    },
    {
      input: '1',
      output: [1],
    },
  ])('$input을 입력할시 $output으로 변환된다.', ({ input, output }) => {
    const result = splitToNumberArray(input);
    expect(result).toBe(output);
  });
});

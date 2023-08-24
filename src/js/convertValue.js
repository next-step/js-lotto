export const convertToMatchingDataType = (input) => {
  if (input === "null") {
    return null;
  } else if (input === "undefined") {
    return undefined;
  } else if (/^-?\d+(\.\d+)?$/.test(input)) {
    return parseFloat(input); // 숫자 변환
  } else {
    try {
      return JSON.parse(input);
    } catch (error) {
      return input; // 그대로 반환 (문자열 유지)
    }
  }
};

export const convertToArray = (str) => {
  return str.split(",").map((item) => convertToMatchingDataType(item));
};

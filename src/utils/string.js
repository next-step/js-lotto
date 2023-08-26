const formatNumberToCKoreanCurrency = (number) => new Intl.NumberFormat('KR').format(String(number));

export default formatNumberToCKoreanCurrency;

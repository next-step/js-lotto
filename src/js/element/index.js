export const iconElement = () => {
  const el = document.createElement('span');
  el.setAttribute('class', 'mx-1 text-4xl');
  el.append('🎟');
  return el;
};

export const lottoNumberElement = (lottoNumber) => {
  const el = document.createElement('span');
  el.setAttribute('class', 'lotto-detail');
  el.append(lottoNumber);
  return el;
};

export const lottoElement = (lottoNumber) => {
  const el = document.createElement('li');
  el.setAttribute('class', 'mx-1 text-xl lotto-wrapper');
  el.append(iconElement());
  el.append(lottoNumberElement(lottoNumber));
  return el;
};

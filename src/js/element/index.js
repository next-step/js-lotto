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

export const resultRowElement = (viewObj) => {
  const { equalCount, prizeMoney, winningTicketCount } = viewObj;

  const tr = document.createElement('tr');
  tr.setAttribute('class', 'text-center');

  const td1 = document.createElement('td');
  td1.setAttribute('class', 'p-3');
  td1.append(equalCount);

  const td2 = document.createElement('td');
  td2.setAttribute('class', 'p-3');
  td2.append(prizeMoney.toLocaleString('ko-KR'));

  const td3 = document.createElement('td');
  td3.setAttribute('class', 'p-3');
  td3.append(winningTicketCount);

  tr.append(td1, td2, td3);

  return tr;
};

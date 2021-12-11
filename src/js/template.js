export const matchedCountTemplate = (rank) => `
<thead>
<tr class="text-center">
  <th class="p-3">일치 갯수</th>
  <th class="p-3">당첨금</th>
  <th class="p-3">당첨 갯수</th>
</tr>
</thead>
<tbody>
<tr class="text-center">
  <td class="p-3">3개</td>
  <td class="p-3">5,000</td>
  <td class="p-3">${rank["5등"]}개</td>
</tr>
<tr class="text-center">
  <td class="p-3">4개</td>
  <td class="p-3">50,000</td>
  <td class="p-3">${rank["4등"]}개</td>
</tr>
<tr class="text-center">
  <td class="p-3">5개</td>
  <td class="p-3">1,500,000</td>
  <td class="p-3">${rank["3등"]}개</td>
</tr>
<tr class="text-center">
  <td class="p-3">5개 + 보너스볼</td>
  <td class="p-3">30,000,000</td>
  <td class="p-3">${rank["2등"]}개</td>
</tr>
<tr class="text-center">
  <td class="p-3">6개</td>
  <td class="p-3">2,000,000,000</td>
  <td class="p-3">${rank["1등"]}개</td>
</tr>
</tbody>
` 

export const lottoTemplate = (lottoNumbers = []) => `
  <div>
    <span class="mx-1 text-4xl js-lotto-ticket">🎟️ </span>
    <span class="js-lotto-numbers">${lottoNumbers.join(', ')}</span>
  </div>
`;


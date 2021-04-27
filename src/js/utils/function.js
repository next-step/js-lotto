import {$} from './constant.js'


const calculateEarning = (winNumber)=>
  Math.round((winNumber.threeSameNum * 5000 + winNumber.fourSameNum * 50000 + winNumber.fiveSameNum * 1500000 + winNumber.fiveBonusSameNum * 30000000 + winNumber.sixSameNum * 2000000000 - Number($('.pl-2').value)) / Number($('.pl-2').value) *1000);

export {calculateEarning};

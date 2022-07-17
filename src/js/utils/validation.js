import {PRICE_FOR_ONE} from '../const/const.js'

export const validation = (target) => target % PRICE_FOR_ONE === 0;
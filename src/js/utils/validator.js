'use strict';

export const isEmpty = element => element.value.trim() === '';

export const isValidPrice = element => element.value % 1000 === 0;

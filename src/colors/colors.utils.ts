/* eslint-disable regexp/optimal-quantifier-concatenation -- It's important to keep the groups here. */
export const SHORT_HEX_REG_EXP = /^#([\da-f])([\da-f])([\da-f])([\da-f])?$/m;
export const LONG_HEX_REG_EXP = /^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{0,2})$/m;

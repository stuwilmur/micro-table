// prettier-ignore
export const curry = (func, ...args) => (data) => func(data, ...args);

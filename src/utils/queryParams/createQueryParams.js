const createQueryParams = (params) => {
  return Object.entries(params)
    .reduce((query, [param, value]) => `${query}${param}=${value}&`, '?')
    .slice(0, -1);
};

export { createQueryParams };

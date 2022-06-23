export const bindParamsFilter = (filter) => {
  const params = Object.keys(filter)
    .filter((key) => filter[key] === false || filter[key] === 0 || !!filter[key])
    .map((key) => `${key}=${filter[key]}`);
  return params.join("&");
};

export const getTotalPage = (total, limit) => {
  let totalPage =
    total % limit === 0 ? (total - (total % limit)) / limit : (total - (total % limit)) / limit + 1;
  return totalPage === 0 ? 1 : totalPage;
};

export const bindParamsFilter = (filter) => {
  const params = Object.keys(filter)
    .filter((key) => filter[key] === false || filter[key] === 0 || !!filter[key])
    .map((key) => `${key}=${filter[key]}`);
  return params.join("&");
};

export const convertToNumber = (value) => (Number.isNaN(Number(value)) ? 0 : Number(value));

export const getTotalPage = (total, limit) => {
  let totalPage =
    total % limit === 0 ? (total - (total % limit)) / limit : (total - (total % limit)) / limit + 1;
  totalPage = convertToNumber(totalPage);
  return totalPage === 0 ? 1 : totalPage;
};

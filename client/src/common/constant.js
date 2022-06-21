export class BaseFilter {
  constructor({ page, limit, keyword }) {
    this.page = page || 1;
    this.limit = limit || 4;
    this.keyword = keyword || "";
  }
}

export class ProductsFilter extends BaseFilter {
  constructor({ sort, rating, price, page, limit, keyword, color, category }) {
    super(page, limit, keyword);
    this.sort = sort || "";
    this.rating = rating || "";
    this.price = price || "";
    this.color = color || "";
    this.category = category || "";
  }
}

export class CombosFilter extends BaseFilter {
  constructor({ sort, page, limit, keyword }) {
    super(page, limit, keyword);
    this.sort = sort || "";
  }
}

export class BaseFilter {
  constructor({ page, limit, keyword }) {
    this.page = page || 1;
    this.limit = limit || 4;
    this.keyword = keyword || "";
  }
}

export class ProductsFilter extends BaseFilter {
  constructor({ sort, rating, price, page, limit, keyword, color, category }) {
    super({ page, limit, keyword });
    this.sort = sort || "";
    this.rating = rating || "";
    this.price = price || "";
    this.color = color || "";
    this.category = category || "";
  }
}

export class CombosFilter extends BaseFilter {
  constructor({ sort, page, limit, keyword }) {
    super({ page, limit, keyword });
    this.sort = sort || "";
  }
}

export const NOT_FOUND_IMG =
  "https://firebasestorage.googleapis.com/v0/b/setup-store-v2.appspot.com/o/image-not-found.png?alt=media&amp;token=ef8ba34b-0474-4c3f-8bb6-e6536e819e8f";

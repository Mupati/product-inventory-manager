import { format } from "date-fns";
import { normalize, schema } from "normalizr";

export const formattedDate = () =>
  format(new Date(Date.now()), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

export const normalizeProductInfo = (productInfo) => {
  const name = new schema.Entity("names");
  const price = new schema.Entity("prices");

  const product = new schema.Entity("products", {
    name: name,
    prices: [price],
  });
  return normalize(productInfo, [product]);
};

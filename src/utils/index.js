import { compareDesc, format, isEqual, parseISO } from "date-fns";
import { normalize, schema } from "normalizr";

export const formattedNowDate = () =>
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

// Sort dates and return the latest
export const getLatestDate = (dates) => {
  const latestDate = dates.map((date) => parseISO(date)).sort(compareDesc)[0];
  return latestDate;
};

// Compare Parsed and UnparsedDates
export const checkDateEquality = (unparsedDate, parsedDate) =>
  isEqual(parseISO(unparsedDate), parsedDate);

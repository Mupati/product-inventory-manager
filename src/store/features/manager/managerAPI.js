import axios from "axios";

export const fetchProductData = async () =>
  await axios.get("https://www.mocky.io/v2/5c3e15e63500006e003e9795");

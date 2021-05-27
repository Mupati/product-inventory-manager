import React from "react";
import Product from "./Product";

function ProductList() {
  return [1, 2, 3, 4, 5].map((value) => <Product key={value} />);
}

export default ProductList;

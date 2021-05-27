import React from "react";
import EmptyInventory from "./EmptyInventory";
import Product from "./Product";

function ProductList() {
  const productData = [1, 2, 3, 4, 5];
  return productData.length > 0 ? (
    productData.map((value) => <Product key={value} />)
  ) : (
    <EmptyInventory />
  );
}

export default ProductList;

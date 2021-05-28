import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import EmptyInventory from "./EmptyInventory";
import Product from "./Product";

import { Button } from "@material-ui/core";

function ProductList() {
  const products = useSelector((state) => state.productManager.products);
  const productKeys = Object.keys(products);

  return (
    <Fragment>
      <Button>Add New Product</Button>
      {productKeys.length > 0 ? (
        productKeys.map((productKey) => (
          <Product key={productKey} product={products[productKey]} />
        ))
      ) : (
        <EmptyInventory />
      )}
    </Fragment>
  );
}

export default ProductList;

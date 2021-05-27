import { Button } from "@material-ui/core";
import React, { Fragment } from "react";
import EmptyInventory from "./EmptyInventory";
import Product from "./Product";

function ProductList() {
  const productData = [1, 2, 3, 4, 5];
  return (
    <Fragment>
      <Button>Add New Product</Button>
      {productData.length > 0 ? (
        productData.map((value) => <Product key={value} />)
      ) : (
        <EmptyInventory />
      )}
    </Fragment>
  );
}

export default ProductList;

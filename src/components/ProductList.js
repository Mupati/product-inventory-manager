import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import EmptyInventory from "./EmptyInventory";
import ProductForm from "./ProductForm";
import Product from "./Product";

import { Button } from "@material-ui/core";
import {
  selectProducts,
  showProductForm,
} from "../store/features/manager/managerSlice";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const productKeys = Object.keys(products);

  return (
    <Fragment>
      <Button onClick={() => dispatch(showProductForm("create"))}>
        Add New Product
      </Button>
      <ProductForm />
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

import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import EmptyInventory from "./EmptyInventory";
import ProductForm from "./ProductForm";
import Product from "./Product";

import { Button, Box } from "@material-ui/core";
import {
  selectProducts,
  showProductForm,
} from "../store/features/manager/managerSlice";
import DeleteDialog from "./DeleteDialog";

function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const productKeys = Object.keys(products);

  return (
    <Fragment>
      <Box textAlign="center" mb={2} mt={5}>
        <Button
          variant="contained"
          onClick={() => dispatch(showProductForm("create"))}
          data-testid="add-btn"
        >
          Add New Product
        </Button>
      </Box>
      {/* Product Editing and Addition Drawer */}
      <ProductForm />
      {/* Product Deletion Confirmation Dialog Box */}
      <DeleteDialog />

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

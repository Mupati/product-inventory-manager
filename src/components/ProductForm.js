import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  InputLabel,
  Input,
  Button,
  Drawer,
} from "@material-ui/core";
import {
  hideProductForm,
  selectVisibleFormStatus,
} from "../store/features/manager/managerSlice";

function ProductForm() {
  const onChange = (e) => {
    console.log(e);
  };
  const form = {
    price: 20,
    name: "kofi",
  };

  const action = (e) => {
    console.log(e);
  };

  const type = "create";

  const dispatch = useDispatch();
  const isFormVisible = useSelector(selectVisibleFormStatus);

  return (
    <Drawer
      anchor="right"
      open={isFormVisible}
      onClose={() => dispatch(hideProductForm())}
    >
      <Box display="flex" flexDirection="column" justifyContent="center">
        <FormControl style={{ marginBottom: 15 }}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            value={form.name}
            name="name"
            onChange={onChange}
            id="name"
            aria-describedby="product-name"
          />
        </FormControl>

        <FormControl style={{ marginBottom: 15 }}>
          <InputLabel htmlFor="price">Price</InputLabel>
          <Input
            value={form.price}
            onChange={onChange}
            name="price"
            id="price"
            type="number"
            aria-describedby="product-price"
          />
        </FormControl>

        <Button
          onClick={action}
          color="primary"
          variant="contained"
          style={{ marginTop: 10 }}
        >
          {type === "create" ? "Add Product" : "Edit Product"}
        </Button>
      </Box>
    </Drawer>
  );
}

export default ProductForm;

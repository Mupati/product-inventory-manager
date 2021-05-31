import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Button,
  Drawer,
  Typography,
} from "@material-ui/core";
import {
  hideProductForm,
  selectVisibleForm,
  selectFormAction,
  selectProductToEdit,
  editProduct,
  addProduct,
  selectProductInInventory,
} from "../store/features/manager/managerSlice";
import { formattedNowDate } from "../utils";

function ProductForm() {
  const dispatch = useDispatch();
  const isFormVisible = useSelector(selectVisibleForm);
  const action = useSelector(selectFormAction);
  const productToEdit = useSelector(selectProductToEdit);
  const productAlreadyExists = useSelector(selectProductInInventory);
  const labelText = action === "create" ? "Add Product" : "Edit Product";

  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = () => {
    if (action === "create") {
      dispatch(addProduct({ ...formData, date: formattedNowDate() }));
    } else {
      dispatch(
        editProduct({
          ...formData,
          id: productToEdit.id,
          date: formattedNowDate(),
        })
      );
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
    });
  };

  const handleDrawerClose = () => {
    resetForm();
    dispatch(hideProductForm());
  };

  // Validate form inputs
  const isValidInputs = Number(formData.price) > 0 && formData.name !== "";

  useEffect(() => {
    if (action === "edit") {
      setFormData({
        name: productToEdit.name,
        price: productToEdit.price,
      });
    }
  }, [productToEdit, action]);

  return (
    <Drawer anchor="right" open={isFormVisible} onClose={handleDrawerClose}>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width="300px"
        px={2}
        mt={5}
      >
        <Typography align="center" variant="h6">
          {labelText}
        </Typography>
        <FormControl style={{ marginBottom: 15 }}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            value={formData.name}
            name="name"
            onChange={onChange}
            aria-describedby="product-name"
            required={true}
            variant="outlined"
            error={productAlreadyExists}
            inputProps={{
              "data-testid": "product-name",
            }}
          />
          <FormHelperText id="my-helper-text">
            {productAlreadyExists && "Product already exists. Edit instead"}
          </FormHelperText>
        </FormControl>

        <FormControl style={{ marginBottom: 15 }}>
          <InputLabel htmlFor="price">Price</InputLabel>
          <Input
            value={formData.price}
            onChange={onChange}
            name="price"
            type="number"
            aria-describedby="product-price"
            required={true}
            inputProps={{
              "data-testid": "product-price",
            }}
          />
        </FormControl>

        <Button
          onClick={handleSubmission}
          color="primary"
          variant="contained"
          style={{ marginTop: 10 }}
          disabled={!isValidInputs}
          data-testid="submit-btn"
        >
          {labelText}
        </Button>
      </Box>
    </Drawer>
  );
}

export default ProductForm;

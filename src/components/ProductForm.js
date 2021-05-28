import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  InputLabel,
  Input,
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
} from "../store/features/manager/managerSlice";
import { formattedDate } from "../utils";

function ProductForm() {
  const dispatch = useDispatch();
  const isFormVisible = useSelector(selectVisibleForm);
  const action = useSelector(selectFormAction);
  const productToEdit = useSelector(selectProductToEdit);
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
      dispatch(addProduct({ ...formData, date: formattedDate() }));
    } else {
      dispatch(
        editProduct({
          ...formData,
          id: productToEdit.id,
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
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography align="center">{labelText}</Typography>
        <FormControl style={{ marginBottom: 15 }}>
          <InputLabel htmlFor="name">Name</InputLabel>
          <Input
            value={formData.name}
            name="name"
            onChange={onChange}
            aria-describedby="product-name"
            required={true}
          />
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
          />
        </FormControl>

        <Button
          onClick={handleSubmission}
          color="primary"
          variant="contained"
          style={{ marginTop: 10 }}
        >
          {labelText}
        </Button>
      </Box>
    </Drawer>
  );
}

export default ProductForm;

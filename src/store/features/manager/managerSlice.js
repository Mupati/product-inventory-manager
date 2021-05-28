import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductData } from "./managerAPI";
import { normalizeProductInfo } from "../../../utils";

const initialState = {
  status: "loading",
  products: {},
  prices: {},
  isVisibleForm: {
    status: false,
    task: "",
  },
  productToEdit: {},
};

// Asynchronously Load Initial Product Information
export const getProductData = createAsyncThunk(
  "productManager/fetchProductData",
  async () => {
    const response = await fetchProductData();
    return response.data;
  }
);

const managerSlice = createSlice({
  name: "productMnager",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      console.log(action.payload);
    },
    editProduct: (state, action) => {
      console.log(action.payload);
    },
    deleteProduct: (state, action) => {
      console.log(action.payload);
    },
    showProductForm: (state, action) => {
      console.log("I was called");
      state.isVisibleForm.status = true;
      state.isVisibleForm.task = action.payload.task;
    },
    hideProductForm: (state, action) => {
      state.isVisibleForm.status = false;
      state.isVisibleForm.task = "";
    },
    setProductToEdit: (state, action) => {
      console.log(action.payload);
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(getProductData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductData.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(getProductData.fulfilled, (state, action) => {
        const normalizedData = normalizeProductInfo(action.payload.products);
        state.products = normalizedData.entities.products;
        state.prices = normalizedData.entities.prices;
        state.status = "idle";
      });
  },
});

// Actions
export const {
  addProduct,
  editProduct,
  deleteProduct,
  showProductForm,
  hideProductForm,
  setProductToEdit,
} = managerSlice.actions;

// Selectors
export const selectLoadingStatus = (state) => state.productManager.status;
export const selectProducts = (state) => state.productManager.products;
export const selectPrices = (state) => state.productManager.prices;
export const selectVisibleFormStatus = (state) =>
  state.productManager.isVisibleForm.status;
export const selectVisibleFormTask = (state) =>
  state.productManager.isVisibleForm.task;

export default managerSlice.reducer;

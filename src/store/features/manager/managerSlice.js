import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductData } from "./managerAPI";
import { normalizeProductInfo } from "../../../utils";

const initialState = {
  status: "loading",
  products: {},
  prices: {},
  isVisibleForm: false,
  formAction: "",
  productToEdit: {},
  isVisibleDeleteDialog: false,
  productToDelete: "",
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
      const priceIds = Object.keys(state.prices);
      const lastPriceId = priceIds[priceIds.length - 1];
      const newPriceId = Number(lastPriceId) + 1;

      Object.assign(state.prices, {
        [newPriceId]: {
          id: newPriceId,
          price: Number(action.payload.price),
          date: action.payload.date,
        },
      });

      const productIds = Object.keys(state.products);
      const lastProductId = productIds[productIds.length - 1];
      const newProductId = Number(lastProductId) + 1;
      Object.assign(state.products, {
        [newProductId]: {
          id: newProductId,
          name: action.payload.name,
          prices: [newPriceId],
        },
      });

      state.formAction = "";
      state.isVisibleForm = false;
    },
    editProduct: (state, action) => {
      console.log(action.payload);

      state.formAction = "";
      state.isVisibleForm = false;
    },
    deleteProduct: (state, action) => {
      delete state.products[Number(state.productToDelete)];
      state.isVisibleDeleteDialog = false;
    },
    showProductForm: (state, action) => {
      state.formAction = action.payload;
      state.isVisibleForm = true;
    },
    hideProductForm: (state, action) => {
      state.isVisibleForm = false;
      state.formAction = "";
      state.productToEdit = {};
    },
    showDeleteDialog: (state, action) => {
      state.isVisibleDeleteDialog = true;
    },
    hideDeleteDialog: (state, action) => {
      state.isVisibleDeleteDialog = false;
    },
    setProductToEdit: (state, action) => {
      state.productToEdit = action.payload;
    },
    setProductToDelete: (state, action) => {
      state.productToDelete = action.payload;
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

        console.log(state.products);
        console.log(state.prices);
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
  setProductToDelete,
  showDeleteDialog,
  hideDeleteDialog,
} = managerSlice.actions;

// Selectors
export const selectLoadingStatus = (state) => state.productManager.status;
export const selectProducts = (state) => state.productManager.products;
export const selectPrices = (state) => state.productManager.prices;
export const selectVisibleForm = (state) => state.productManager.isVisibleForm;
export const selectFormAction = (state) => state.productManager.formAction;

export const selectVisibleDeleteDialog = (state) =>
  state.productManager.isVisibleDeleteDialog;

export const selectProductToDelete = (state) =>
  state.productManager.productToDelete;

export const selectProductToEdit = (state) =>
  state.productManager.productToEdit;

export default managerSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductData } from "./managerAPI";
import { normalizeProductInfo } from "../../../utils";

export const initialState = {
  status: "loading",
  products: {},
  prices: {},
  isVisibleForm: false,
  formAction: "",
  productToEdit: {},
  isVisibleDeleteDialog: false,
  productToDelete: "",
  isProductInInventory: false,
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
  name: "productManager",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      // Reset productInInventory before adding new one
      // in case you are receiving feedback after trying to add an existing product
      state.isProductInInventory = false;
      const productIds = Object.keys(state.products);

      // Check if the product being added already exists
      const productAlreadyExists = productIds.some(
        (id) => state.products[id].name === action.payload.name
      );

      if (productAlreadyExists) {
        state.isProductInInventory = true;
      } else {
        // Add New Product's price
        const priceIds = Object.keys(state.prices);
        // The key/id for the new price is the last id/key + 1
        const newPriceId = Number(priceIds[priceIds.length - 1]) + 1;
        Object.assign(state.prices, {
          [newPriceId]: {
            id: newPriceId,
            price: Number(action.payload.price),
            date: action.payload.date,
          },
        });

        // Add the new product name to the products state
        // and add the id of it's price to the prices array of the product

        // The key/id for the new product is the last id/key + 1
        // When the product list is empty, set the newProductId to 1
        const newProductId =
          productIds.length === 0
            ? 1
            : Number(productIds[productIds.length - 1]) + 1;
        Object.assign(state.products, {
          [newProductId]: {
            id: newProductId,
            name: action.payload.name,
            prices: [newPriceId],
          },
        });

        // reset form states
        state.formAction = "";
        state.isVisibleForm = false;
      }
    },
    editProduct: (state, action) => {
      const priceIds = Object.keys(state.prices);
      // The key/id for the new price is the last id/key + 1
      const newPriceId = Number(priceIds[priceIds.length - 1]) + 1;
      Object.assign(state.prices, {
        [newPriceId]: {
          id: newPriceId,
          price: Number(action.payload.price),
          date: action.payload.date,
        },
      });

      // Update the price and name with new data and add the new priceId to the prices array
      state.products[action.payload.id] = {
        ...state.products[action.payload.id],
        name: action.payload.name,
        prices: state.products[action.payload.id]["prices"].concat(newPriceId),
      };
      // reset form states
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
      state.isProductInInventory = false;
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

export const selectProductInInventory = (state) =>
  state.productManager.isProductInInventory;

export default managerSlice.reducer;

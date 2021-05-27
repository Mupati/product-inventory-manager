import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductData } from "./managerAPI";

const initialState = {
  status: "loading",
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
        console.log(action.data);
        state.status = "idle";
      });
  },
});

export default managerSlice.reducer;

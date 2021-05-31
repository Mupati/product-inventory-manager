import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";

import DeleteDialog from "../DeleteDialog";
import { normalizedProducts, normalizedPrices } from "../../utils/test-data";
import {
  deleteProduct,
  hideDeleteDialog,
} from "../../store/features/manager/managerSlice";

const mockStore = configureStore([]);
describe("<DeleteDialog />", () => {
  let store;
  const initialState = {
    products: normalizedProducts,
    prices: normalizedPrices,
    isVisibleDeleteDialog: true,
    isVisibleForm: false,
    productToEdit: {},
    productToDelete: "1",
  };

  beforeEach(() => {
    store = mockStore({
      productManager: initialState,
    });

    render(
      <Provider store={store}>
        <DeleteDialog />
      </Provider>
    );
  });

  test("Renders Delete Dialog", () => {
    expect(
      screen.getByText(/Do you want to Delete the Product/i)
    ).toBeInTheDocument();
  });

  test("Cancel Button triggers hideDeleteDialog action", () => {
    const cancelBtn = screen.queryByTestId("cancel-btn");
    fireEvent.click(cancelBtn);

    expect(store.getActions()).toEqual([hideDeleteDialog()]);
  });

  test("Confirm Button triggers deleteProduct action", () => {
    const confirmBtn = screen.queryByTestId("confirm-btn");
    fireEvent.click(confirmBtn);

    expect(store.getActions()).toEqual([deleteProduct()]);
  });
});

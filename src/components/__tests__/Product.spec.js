import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";

import Product from "../Product";
import { normalizedProducts, normalizedPrices } from "../../utils/test-data";
import {
  setProductToDelete,
  setProductToEdit,
  showDeleteDialog,
  showProductForm,
} from "../../store/features/manager/managerSlice";

const mockStore = configureStore([]);
describe("<Product />", () => {
  let store;
  const initialState = {
    products: normalizedProducts,
    prices: normalizedPrices,
    formAction: "",
    isVisibleDeleteDialog: false,
    isVisibleForm: false,
    productToEdit: {},
    productToDelete: "",
  };

  const singleProduct = {
    id: 1,
    name: "Exforge 10mg",
    prices: [1, 2],
  };
  beforeEach(() => {
    store = mockStore({
      productManager: initialState,
    });

    render(
      <Provider store={store}>
        <Product product={singleProduct} />
      </Provider>
    );
  });

  test("Renders single product", () => {
    expect(screen.queryAllByTestId("product-card").length).toEqual(1);
    expect(screen.getByText("Exforge 10mg")).toBeInTheDocument();
    expect(screen.getByText("GHs 10.99")).toBeInTheDocument();
  });

  test("Edit Button triggers setProductToEdit and showProductForm actions", () => {
    const editBtn = screen.queryByTestId("edit-btn");
    fireEvent.click(editBtn);

    expect(store.getActions()).toEqual([
      setProductToEdit({ ...singleProduct, price: 10.99 }),
      showProductForm("edit"),
    ]);
  });

  test("Delete button triggers setProductToDelete and showDeleteDialog actions", () => {
    const deleteBtn = screen.queryByTestId("delete-btn");
    fireEvent.click(deleteBtn);

    expect(store.getActions()).toEqual([
      setProductToDelete(1),
      showDeleteDialog(),
    ]);
  });
});

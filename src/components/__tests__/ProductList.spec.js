import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";

import ProductList from "../ProductList";
import { normalizedProducts, normalizedPrices } from "../../utils/test-data";
import { showProductForm } from "../../store/features/manager/managerSlice";

const mockStore = configureStore([]);
describe("<ProductList />", () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      productManager: {
        products: normalizedProducts,
        prices: normalizedPrices,
        isVisibleDeleteDialog: false,
        isVisibleForm: false,
        formAction: "",
      },
    });

    render(
      <Provider store={store}>
        <ProductList />
      </Provider>
    );
  });
  test("3 Initial products in the inventory are loaded", () => {
    expect(screen.queryAllByTestId("product-card").length).toEqual(3);
  });

  test("Add Button triggers showProductForm action", () => {
    const addBtn = screen.queryByTestId("add-btn");
    fireEvent.click(addBtn);

    expect(store.getActions()).toEqual([showProductForm("create")]);
  });
});

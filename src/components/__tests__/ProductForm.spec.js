import React from "react";
import { Provider } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";

import ProductForm from "../ProductForm";
import { normalizedProducts, normalizedPrices } from "../../utils/test-data";
import {
  addProduct,
  editProduct,
} from "../../store/features/manager/managerSlice";
import { formattedNowDate } from "../../utils";

const mockStore = configureStore([]);
describe(" Edit <ProductForm />", () => {
  let store;
  const initialState = {
    products: normalizedProducts,
    prices: normalizedPrices,
    formAction: "edit",
    isVisibleForm: true,
    productToEdit: {
      id: 1,
      name: "Exforge 10mg",
      price: 10.99,
    },
  };

  beforeEach(() => {
    store = mockStore({
      productManager: initialState,
    });

    render(
      <Provider store={store}>
        <ProductForm />
      </Provider>
    );
  });

  test("Renders ProductForm with product to edit", () => {
    expect(screen.getByTestId("product-name").value).toBe("Exforge 10mg");
    expect(screen.getByTestId("product-price").value).toBe("10.99");
  });

  test("Edit Product Button triggers editProduct and hideProductForm actions", () => {
    const editProdBtn = screen.queryByTestId("submit-btn");
    fireEvent.click(editProdBtn);

    expect(expect.arrayContaining(store.getActions())).toEqual(
      expect.arrayContaining([
        editProduct(
          expect.objectContaining({
            id: 1,
            name: "Exforge 10mg",
            price: 10.99,
          })
        ),
      ])
    );
  });
});

describe(" Create <ProductForm />", () => {
  let store;
  const initialState = {
    products: normalizedProducts,
    prices: normalizedPrices,
    formAction: "create",
    isVisibleForm: true,
  };

  beforeEach(() => {
    store = mockStore({
      productManager: initialState,
    });

    render(
      <Provider store={store}>
        <ProductForm />
      </Provider>
    );
  });

  test("Renders ProductForm with product to edit", () => {
    expect(screen.getByTestId("product-name").value).toBe("");
    expect(screen.getByTestId("product-price").value).toBe("");
  });

  test("Add Product Button is disabled when inputs are invalid", () => {
    expect(screen.queryByTestId("submit-btn")).toBeDisabled();
  });

  test("Edit Product Button triggers editProduct and hideProductForm actions", () => {
    const createProdBtn = screen.queryByTestId("submit-btn");

    fireEvent.change(screen.getByTestId("product-name"), {
      target: { value: "Chloroquine mg" },
    });
    fireEvent.change(screen.getByTestId("product-price"), {
      target: { value: 23.0 },
    });

    fireEvent.click(createProdBtn);

    expect(store.getActions()).toEqual([
      addProduct(
        expect.objectContaining({
          name: "Chloroquine mg",
          price: "23",
        })
      ),
    ]);
  });
});

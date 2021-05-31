import {
  normalizedPrices,
  normalizedProducts,
  pricesAfterEdit,
  productsAfterEdit,
  productsAfterAdding,
  pricesAfterAdding,
} from "../../../utils/test-data";
import managerReducer, {
  addProduct,
  deleteProduct,
  editProduct,
  initialState,
  setLoadingStatus,
  setProductToDelete,
} from "./managerSlice";

describe("ManagerSlice", () => {
  test("should handle setLoadingStatus", () => {
    let newState = managerReducer(initialState, setLoadingStatus("idle"));
    expect(newState.status).toEqual("idle");

    newState = managerReducer(initialState, setLoadingStatus("rejected"));
    expect(newState.status).toEqual("rejected");

    newState = managerReducer(initialState, setLoadingStatus("loading"));
    expect(newState.status).toEqual("loading");

    newState = managerReducer(initialState, setLoadingStatus());
    expect(newState.status).toBeUndefined();
  });

  test("should handle setProductToDelete", () => {
    let newState = managerReducer(initialState, setProductToDelete(1));
    expect(newState.productToDelete).toEqual(1);
  });

  test("should handle deleteProduct", () => {
    let newState = managerReducer(
      {
        ...initialState,
        productToDelete: 1,
        prices: normalizedPrices,
        products: normalizedProducts,
      },
      deleteProduct()
    );
    expect(newState.products).toEqual({
      2: {
        id: 2,
        name: "Exforge 20mg",
        prices: [3, 4],
      },
      3: {
        id: 3,
        name: "Paracetamol 20MG",
        prices: [5, 6],
      },
    });
  });

  test("should handle editProduct", () => {
    let newState = managerReducer(
      {
        ...initialState,
        prices: normalizedPrices,
        products: normalizedProducts,
      },
      editProduct({
        id: 1,
        name: "Chloroquine mg",
        price: 20.3,
        date: "2020-11-01T17:16:32+00:00",
      })
    );

    expect(newState.products).toEqual(productsAfterEdit);
    expect(newState.prices).toEqual(pricesAfterEdit);
  });

  test("should handle addProduct", () => {
    let newState = managerReducer(
      {
        ...initialState,
        prices: normalizedPrices,
        products: normalizedProducts,
      },
      addProduct({
        name: "Chloroquine mg",
        price: 100.0,
        date: "2021-11-01T17:16:32+00:00",
      })
    );

    expect(newState.products).toEqual(productsAfterAdding);
    expect(newState.prices).toEqual(pricesAfterAdding);
  });

  test("should handle adding an already existing product name", () => {
    let newState = managerReducer(
      {
        ...initialState,
        prices: normalizedPrices,
        products: normalizedProducts,
      },
      addProduct({
        name: "Exforge 10mg",
        price: 100.0,
        date: "2021-11-01T17:16:32+00:00",
      })
    );
    expect(newState.isProductInInventory).toBe(true);
  });
});

import React from "react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { render, screen } from "@testing-library/react";

import managerReducer, {
  setLoadingStatus,
} from "../../store/features/manager/managerSlice";
import Preloader from "../Preloader";

describe("<PreLoader />", () => {
  const store = configureStore({
    reducer: {
      productManager: managerReducer,
    },
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <Preloader />
      </Provider>
    );
  });

  test("Show loading state when fetching data", () => {
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("Show error message when loading data fails", () => {
    store.dispatch(setLoadingStatus("rejected"));
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });
});

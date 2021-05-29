import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "./components/ProductList";
import Preloader from "./components/Preloader";

import {
  getProductData,
  selectLoadingStatus,
} from "./store/features/manager/managerSlice";

import { Box, Container, Typography } from "@material-ui/core";

function App() {
  const dispatch = useDispatch();
  const loadingStatus = useSelector(selectLoadingStatus);

  // API call must run only once.
  // This runs the first time the application is opened. Persisted state is null
  const persistedState = localStorage.getItem("persist:manager");

  useEffect(() => {
    if (!persistedState) dispatch(getProductData());
  }, [dispatch, persistedState]);

  return (
    <Box>
      {loadingStatus !== "idle" ? (
        <Preloader />
      ) : (
        <Container>
          <Typography variant="h4" align="center" style={{ marginTop: 20 }}>
            Mpharma Inventory Manager
          </Typography>
          <ProductList />
        </Container>
      )}
    </Box>
  );
}

export default App;

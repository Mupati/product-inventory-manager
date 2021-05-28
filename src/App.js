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

  useEffect(() => {
    dispatch(getProductData());
  }, [dispatch]);

  return (
    <Box>
      {loadingStatus !== "idle" ? (
        <Preloader />
      ) : (
        <Container>
          <Typography variant="h3" align="center">
            Mpharma Product Manager
          </Typography>
          <ProductList />
        </Container>
      )}
    </Box>
  );
}

export default App;

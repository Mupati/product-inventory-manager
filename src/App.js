import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductList from "./components/ProductList";
import Preloader from "./components/Preloader";

import { getProductData } from "./store/features/manager/managerSlice";

import { Box, Container } from "@material-ui/core";

function App() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.productManager.status);

  useEffect(() => {
    dispatch(getProductData());
  }, [dispatch]);

  return (
    <Box>
      {status !== "idle" ? (
        <Preloader />
      ) : (
        <Container>
          <h1>Mpharma Product Manager</h1>
          <ProductList />
        </Container>
      )}
    </Box>
  );
}

export default App;

import React from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Typography } from "@material-ui/core";
import { showProductForm } from "../store/features/manager/managerSlice";

function EmptyInventory() {
  const dispatch = useDispatch();
  return (
    <Box>
      <Typography gutterBottom variant="h5" component="h2">
        Empty Inventory
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        There are no products in your inventory. This needs immediate attention
      </Typography>
      <Button onClick={() => dispatch(showProductForm("create"))}>
        ReStock Now
      </Button>
    </Box>
  );
}

export default EmptyInventory;

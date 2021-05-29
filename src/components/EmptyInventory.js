import React from "react";
import { Box, Typography } from "@material-ui/core";

function EmptyInventory() {
  return (
    <Box mt={8}>
      <Typography gutterBottom variant="h5" component="h2" align="center">
        Empty Inventory
      </Typography>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p"
        align="center"
      >
        There are no products in your inventory. This needs immediate attention.
        Add new products
      </Typography>
    </Box>
  );
}

export default EmptyInventory;

import React from "react";
import { Box, Button, Typography } from "@material-ui/core";

function EmptyInventory() {
  return (
    <Box>
      <Typography gutterBottom variant="h5" component="h2">
        Empty Inventory
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p">
        There are no products in your inventory. This needs immediate attention
      </Typography>
      <Button>ReStock Now</Button>
    </Box>
  );
}

export default EmptyInventory;

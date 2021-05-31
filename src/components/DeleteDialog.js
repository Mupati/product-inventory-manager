import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@material-ui/core";
import {
  selectProducts,
  selectProductToDelete,
  selectVisibleDeleteDialog,
  hideDeleteDialog,
  deleteProduct,
} from "../store/features/manager/managerSlice";

function DeleteDialog() {
  const dispatch = useDispatch();
  const isOpenDialog = useSelector(selectVisibleDeleteDialog);
  const products = useSelector(selectProducts);
  const productToDeleteKey = useSelector(selectProductToDelete);

  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      maxWidth="xs"
      aria-labelledby="confirmation-dialog-title"
      open={isOpenDialog}
    >
      <DialogTitle id="confirmation-dialog-title">
        Delete {products?.[productToDeleteKey]?.["name"]}
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1">
          Do you want to Delete the Product?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => dispatch(hideDeleteDialog())}
          color="primary"
          data-testid="cancel-btn"
        >
          Cancel
        </Button>
        <Button
          onClick={() => dispatch(deleteProduct())}
          color="secondary"
          variant="contained"
          data-testid="confirm-btn"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteDialog;

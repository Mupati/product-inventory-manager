import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { getLatestDate, checkDateEquality } from "../utils";
import {
  selectPrices,
  setProductToDelete,
  setProductToEdit,
  showDeleteDialog,
  showProductForm,
} from "../store/features/manager/managerSlice";

const useStyles = makeStyles({
  root: {
    maxWidth: 400,
    marginBottom: 20,
    marginRight: "auto",
    marginLeft: "auto",
  },
});

function Product({ product }) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const allPrices = useSelector(selectPrices);

  const productPriceData = product.prices.map((priceId) => allPrices[priceId]);
  const priceDates = productPriceData.map((priceData) => priceData.date);

  const latestPriceData = productPriceData.filter((priceData) =>
    checkDateEquality(priceData.date, getLatestDate(priceDates))
  );

  const handleProductEdit = () => {
    dispatch(setProductToEdit({ ...product, price: latestPriceData[0].price }));
    dispatch(showProductForm("edit"));
  };

  const handleProductDelete = () => {
    dispatch(setProductToDelete(product.id));
    dispatch(showDeleteDialog());
  };

  return (
    <Card className={classes.root} data-testid="product-card">
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body1" color="textPrimary" component="p">
          GHs {latestPriceData[0].price.toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          color="primary"
          variant="contained"
          onClick={() => handleProductEdit()}
          data-testid="edit-btn"
        >
          Edit
        </Button>
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={() => handleProductDelete()}
          data-testid="delete-btn"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;

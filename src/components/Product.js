import React from "react";
import { useSelector } from "react-redux";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { getLatestDate, checkDateEquality } from "../utils";

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    marginBottom: 20,
  },
  media: {
    height: 140,
  },
});

function Product({ product }) {
  const classes = useStyles();
  const allPrices = useSelector((state) => state.productManager.prices);

  const productPriceData = product.prices.map((priceId) => allPrices[priceId]);
  const priceDates = productPriceData.map((priceData) => priceData.date);

  const latestPriceData = productPriceData.filter((priceData) =>
    checkDateEquality(priceData.date, getLatestDate(priceDates))
  );

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          GHs {latestPriceData[0].price.toFixed(2)}
        </Typography>
      </CardContent>

      <CardActions>
        <Button size="small" color="primary">
          Edit
        </Button>
        <Button size="small" color="primary">
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default Product;

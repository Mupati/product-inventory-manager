import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { selectLoadingStatus } from "../store/features/manager/managerSlice";

import { Box, CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    height: "100vh",
    width: "100vw",
    overflow: "hidden",
  },
});

function Preloader() {
  const classes = useStyles();
  const status = useSelector(selectLoadingStatus);

  return (
    <Box
      className={classes.root}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {status === "loading" ? (
        <Fragment>
          <h1>Loading...</h1>
          <CircularProgress />
        </Fragment>
      ) : (
        <h1>An error occured while loading product data. Try again later...</h1>
      )}
    </Box>
  );
}

export default Preloader;

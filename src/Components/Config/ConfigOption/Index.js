import React from "react";
import Grid from '@material-ui/core/Grid';
import DeleteAllOption from "../DeleteAllOption/Index.js"
import DeleteGenre from "../DeleteGenre/Index.js"

import "./ConfigOption.css";

const Option = ({ handleDeleteAllBook, handleDeleteGlobalGenre,handleDeleteAllGenre, genres }) => (
  <Grid container>
    <Grid item xs={12}>
      <DeleteAllOption handleDeleteAll={handleDeleteAllBook} type={"books"}></DeleteAllOption>
      {/* <DeleteAllOption handleDeleteAll={handleDeleteAllGenre} type={"genres"}></DeleteAllOption>
      <DeleteGenre handleDeleteGlobalGenre={handleDeleteGlobalGenre} genres={genres}></DeleteGenre> */}
    </Grid>
  </Grid>
);

export default Option;

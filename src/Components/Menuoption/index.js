import React from "react";
import { Link } from "react-router-dom";
import "./Menuoption.css";

const Menuoption = ({ characters, url }) => {
  return (
    <Link to={url} className="menuItem">
      {characters}
    </Link>
  );
};

export default Menuoption;

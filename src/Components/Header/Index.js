import React from "react";
import Menuoption from "../Menuoption";
import Logo from "../Logo/Index";
import "./Header.css";

const Header = () => (
  <header className="appHeader">
    <Logo />
    <Menuoption url="/" characters="Books" />
    <Menuoption url="/config" characters="Configuration" />
  </header>
);

export default Header;

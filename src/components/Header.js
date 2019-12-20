import React from "react";
import logo from "../assets/logo.svg";

const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>PROGRAMACIÓN LINEAL</p>
    <a className="App-link" href="/" rel="noopener noreferrer">
      Método Simplex
    </a>
    <br />
  </header>
);

export default Header;

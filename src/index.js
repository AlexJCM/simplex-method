import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Home from "./containers/Home.js";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Route } from "react-router-dom";
import Tabla from "./pages/Tabla.js";
import Ecuaciones from "./containers/Ecuaciones.js";

const Main = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route exact path="/ecuaciones" component={Ecuaciones} />
    <Route exact path="/tabla" component={Tabla} />
  </BrowserRouter>
);
ReactDOM.render(<Main />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

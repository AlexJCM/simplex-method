import React, { useEffect, useState } from "react";
import "./Home.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import SelectorTipo from "../components/SelectorTipo.js";
import ButtonContinuar from "../components/ButtonContinuar";

function Home(props) {
  useEffect(() => {
    // Init Tabs Materialize JS
    var selector = document.querySelectorAll("select");
    M.FormSelect.init(selector);
  });

  const [decision, setDecision] = useState(3);
  const [restriccion, setRestriccion] = useState(3);
  const [seleccion, setSeleccion] = useState(1);

  const handleSubmit = evt => {
    evt.preventDefault();
    //redireccionamos a la siguiente pagina tabla
    props.history.push({
      pathname: "/ecuaciones",
      valores: {
        decision: decision,
        restriccion: restriccion,
        seleccion: seleccion
      }
    });
  };

  const handleInput1Change = e => {
    setDecision(e.target.value);
  };

  const handleInput2Change = ev => {
    setRestriccion(ev.target.value);
  };

  const obtenerSeleccion = e => {
    setSeleccion(e.target.value);
  };

  return (
    <div className="Home">
      <header className="Home-header">
        <p>Intro Método Simplex</p>
      </header>

      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <div className="container">
            <div className="row">
              <div className="col s4" className="center-align">
                <label>Ingrese el número de variables de decisión:</label>
                <input
                  type="number"
                  name="decision"
                  id="dec"
                  value={decision}
                  onChange={handleInput1Change}
                />
              </div>
            </div>
          </div>
          <br />

          <div className="container">
            <div className="row">
              <div className="col s4" className="center-align">
                <label>Ingrese cantidad de restricciones:</label>
                <input
                  type="number"
                  name="restricciones"
                  id="res"
                  value={restriccion}
                  onChange={handleInput2Change}
                />
              </div>
            </div>
          </div>
          <br />

          <div className="container">
            <div className="row">
              <div className="input-field col s4" className="center-align">
                <label>¿Cuál es el objetivo de la función?</label>
                <SelectorTipo onChange={obtenerSeleccion} />
              </div>
            </div>
          </div>
          <br />
          <div className="container">
            <div className="row">
              <div className="col s4" className="center-align">
                <ButtonContinuar />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Home;

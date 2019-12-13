import React, { useEffect } from "react";
import "./Ecuaciones.css";
import "./Home.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import HeaderEcuaciones from "../components/HeaderEcuaciones";
import ButtonContinuar from "../components/ButtonContinuar";
import EcucionesInfo from "../components/EcucionesInfo";
import ValorX from "../components/ValorX.js";
import ValorR from "../components/ValorR.js";
import SelectorOperador from "../components/SelectorOperador.js";
import ResultadoR from "../components/ResultadoR";

function Ecuaciones(props) {
  useEffect(() => {
    // Init Tabs Materialize JS
    var selector = document.querySelectorAll("select");
    M.FormSelect.init(selector);
  });

  //Funcion objetivo
  var valorX1 = -2;
  var valorX2 = -3;
  var valorX3 = -3;
  // Restriccion 1
  var valorR1X1 = 3;
  var valorR1X2 = 2;
  var valorR1X3 = 0;
  var operadorR1 = "";
  var resultadoR1 = 60;
  // Restriccion 2
  var valorR2X1 = -1;
  var valorR2X2 = 1;
  var valorR2X3 = 4;
  var operadorR2 = "";
  var resultadoR2 = 10;
  //Restriccion 3
  var valorR3X1 = 7;
  var valorR3X2 = -2;
  var valorR3X3 = 5;
  var operadorR3 = "";
  var resultadoR3 = 50;

  var array_objetivo = [];
  var array_restR1 = [];
  var array_restR2 = [];
  var array_restR3 = [];

  if (props.location.valores != null) {
    var decision = parseInt(props.location.valores.decision);
    var restriccion = parseInt(props.location.valores.restriccion);
    var seleccion = props.location.valores.seleccion;
  } else {
    console.error("No se ha llenado la variable valores en la pagina Home");
  }

  const generarInputs = () => {
    // Se puede ingresar retricciones y decisiones de 2 a 3
    // Obtenemos el numero de decision y restriccion para generar el numero de
    // variables e inputs necesarios
    if (decision === 2) {
      array_objetivo[0] = 0; // va cero porque  hemos puesto las R  en primer lugar de cada restricion
      array_objetivo[1] = parseInt(valorX1);
      array_objetivo[2] = parseInt(valorX2);
    } else if (decision === 3) {
      array_objetivo[0] = 0;
      array_objetivo[1] = parseInt(valorX1);
      array_objetivo[2] = parseInt(valorX2);
      array_objetivo[3] = parseInt(valorX3);
    }
    //
    if ((decision === 2) & (restriccion === 2)) {
      array_objetivo[3] = 0;
      array_objetivo[4] = 0;
      //
      array_restR1[0] = parseInt(resultadoR1);
      array_restR1[1] = parseInt(valorR1X1);
      array_restR1[2] = parseInt(valorR1X2);
      //
      array_restR2[0] = parseInt(resultadoR2);
      array_restR2[1] = parseInt(valorR2X1);
      array_restR2[2] = parseInt(valorR2X2);
    } else if ((decision === 2) & (restriccion === 3)) {
      array_objetivo[3] = 0;
      array_objetivo[4] = 0;
      array_objetivo[5] = 0;
      //
      array_restR1[0] = parseInt(resultadoR1);
      array_restR1[1] = parseInt(valorR1X1);
      array_restR1[2] = parseInt(valorR1X2);
      //
      array_restR2[0] = parseInt(resultadoR2);
      array_restR2[1] = parseInt(valorR2X1);
      array_restR2[2] = parseInt(valorR2X2);
      //
      array_restR3[0] = parseInt(resultadoR3);
      array_restR3[1] = parseInt(valorR3X1);
      array_restR3[2] = parseInt(valorR3X2);
    } else if ((decision === 3) & (restriccion === 2)) {
      array_objetivo[4] = 0;
      array_objetivo[5] = 0;
      //
      array_restR1[0] = parseInt(resultadoR1);
      array_restR1[1] = parseInt(valorR1X1);
      array_restR1[2] = parseInt(valorR1X2);
      array_restR1[3] = parseInt(valorR1X3);
      //
      array_restR2[0] = parseInt(resultadoR2);
      array_restR2[1] = parseInt(valorR2X1);
      array_restR2[2] = parseInt(valorR2X2);
      array_restR2[3] = parseInt(valorR1X3);
    } else if ((decision === 3) & (restriccion === 3)) {
      array_objetivo[4] = 0;
      array_objetivo[5] = 0;
      array_objetivo[6] = 0;
      //
      array_restR1[0] = parseInt(resultadoR1);
      array_restR1[1] = parseInt(valorR1X1);
      array_restR1[2] = parseInt(valorR1X2);
      array_restR1[3] = parseInt(valorR1X3);
      //
      array_restR2[0] = parseInt(resultadoR2);
      array_restR2[1] = parseInt(valorR2X1);
      array_restR2[2] = parseInt(valorR2X2);
      array_restR2[3] = parseInt(valorR2X3);
      //
      array_restR3[0] = parseInt(resultadoR3);
      array_restR3[1] = parseInt(valorR3X1);
      array_restR3[2] = parseInt(valorR3X2);
      array_restR3[3] = parseInt(valorR3X3);
    }
  };

  const normalizarEcuaciones = () => {
    // Si operador es 1 entonces hay que agregar variables de holgura,
    // caso contrario si es 2 hay que agregar variables artificiales
    if ((decision === 3) & (restriccion === 3)) {
      if (operadorR1 === "1") {
        array_restR1[4] = 1;
        array_restR1[5] = 0;
        array_restR1[6] = 0;
      } else if (operadorR1 === "2") {
        array_restR1[4] = -1;
        array_restR1[5] = 0;
        array_restR1[6] = 0;
      }
      if (operadorR2 === "1") {
        array_restR2[4] = 0;
        array_restR2[5] = 1;
        array_restR2[6] = 0;
      } else if (operadorR2 === "2") {
        array_restR2[4] = 0;
        array_restR2[5] = -1;
        array_restR2[6] = 0;
      }
      if (operadorR3 === "1") {
        array_restR3[4] = 0;
        array_restR3[5] = 0;
        array_restR3[6] = 1;
      } else if (operadorR3 === "2") {
        array_restR3[4] = 0;
        array_restR3[5] = 0;
        array_restR3[6] = -1;
      }
    } else if ((decision === 3) & (restriccion === 2)) {
      if (operadorR1 === "1") {
        array_restR1[4] = 1;
        array_restR1[5] = 0;
      } else if (operadorR1 === "2") {
        array_restR1[4] = -1;
        array_restR1[5] = 0;
      }
      if (operadorR2 === "1") {
        array_restR2[4] = 0;
        array_restR2[5] = 1;
      } else if (operadorR2 === "2") {
        array_restR2[4] = 0;
        array_restR2[5] = -1;
      }
    } else if ((decision === 2) & (restriccion === 3)) {
      if (operadorR1 === "1") {
        array_restR1[3] = 1;
        array_restR1[4] = 0;
        array_restR1[5] = 0;
      } else if (operadorR1 === "2") {
        array_restR1[3] = -1;
        array_restR1[4] = 0;
        array_restR1[5] = 0;
      }
      if (operadorR2 === "1") {
        array_restR2[3] = 0;
        array_restR2[4] = 1;
        array_restR2[5] = 0;
      } else if (operadorR2 === "2") {
        array_restR2[3] = 0;
        array_restR2[4] = -1;
        array_restR2[5] = 0;
      }
      if (operadorR3 === "1") {
        array_restR3[3] = 0;
        array_restR3[4] = 0;
        array_restR3[5] = 1;
      } else if (operadorR3 === "2") {
        array_restR3[3] = 0;
        array_restR3[4] = 0;
        array_restR3[5] = -1;
      }
    } else if ((decision === 2) & (restriccion === 2)) {
      if (operadorR1 === "1") {
        array_restR1[3] = 1;
        array_restR1[4] = 0;
      } else if (operadorR1 === "2") {
        array_restR1[3] = -1;
        array_restR1[4] = 0;
      }
      if (operadorR2 === "1") {
        array_restR2[3] = 0;
        array_restR2[4] = 1;
      } else if (operadorR2 === "2") {
        array_restR2[3] = 0;
        array_restR2[4] = -1;
      }
    }

    console.log("array_objetivo");
    console.log(array_objetivo);
    console.log("array_restR1");
    console.log(array_restR1);
    console.log("array_restR2");
    console.log(array_restR2);
    console.log("array_restR3");
    console.log(array_restR3);
  };
  // Se activa al presionar el boton Contiuar
  const handleSubmit = e => {
    e.preventDefault();
    verificarTipo();
    generarInputs();
    normalizarEcuaciones();
    //redireccionamos a la pagina tabla pasandole valores
    /*props.history.push({
      pathname: "/tabla",
      valores: {
        decision: decision,
        restriccion: restriccion,
        seleccion: seleccion,
        array_objetivo: array_objetivo,
        array_restR1: array_restR1,
        array_restR2: array_restR2,
        array_restR3: array_restR3
      }
    });*/
  };

  //Función objetivo
  const handleInputX1 = e => {
    valorX1 = e.target.value;
  };
  const handleInputX2 = e => {
    valorX2 = e.target.value;
  };
  const handleInputX3 = e => {
    valorX3 = e.target.value;
  };

  //Restriccion 1
  const handleInputR1X1 = e => {
    valorR1X1 = e.target.value;
  };
  const handleInputR1X2 = e => {
    valorR1X2 = e.target.value;
  };
  const handleInputR1X3 = e => {
    valorR1X3 = e.target.value;
  };
  const seleccionOperadorR1 = e => {
    operadorR1 = e.target.value;
  };
  const handleInputResultadoR1 = e => {
    resultadoR1 = e.target.value;
  };

  //Restriccion 2
  const handleInputR2X1 = e => {
    valorR2X1 = e.target.value;
  };
  const handleInputR2X2 = e => {
    valorR2X2 = e.target.value;
  };
  const handleInputR2X3 = e => {
    valorR2X3 = e.target.value;
  };
  const seleccionOperadorR2 = e => {
    operadorR2 = e.target.value;
  };
  const handleInputResultadoR2 = e => {
    resultadoR2 = e.target.value;
  };

  //Restriccion 3
  const handleInputR3X1 = e => {
    valorR3X1 = e.target.value;
  };
  const handleInputR3X2 = e => {
    valorR3X2 = e.target.value;
  };
  const handleInputR3X3 = e => {
    valorR3X3 = e.target.value;
  };
  const seleccionOperadorR3 = e => {
    operadorR3 = e.target.value;
  };
  const handleInputResultadoR3 = e => {
    resultadoR3 = e.target.value;
  };

  const verificarTipo = () => {
    //verificamos si hay que minimizar o maximizar la funcion y
    //la formateamos segun sea el caso
    if (seleccion === 1) {
      console.log("La función ha sido formateada para ser Maximizada");
      valorX1 = -valorX1;
      valorX2 = -valorX2;
      valorX3 = -valorX3;
    } else if (seleccion === 2) {
      console.log("La función es de Minimización");
    }
  };

  if (props.location.valores != null) {
    if ((decision === 2) & (restriccion === 2)) {
      return (
        <div className="Home">
          <HeaderEcuaciones />
          <form onSubmit={handleSubmit}>
            <br />
            <label>Ingrese terminos de la funcion objetivo:</label>
            <div className="row">
              <ValorX value={valorX1} onChange={handleInputX1} id="X1" />
              <p className="col s0.5"> + </p>
              <ValorX value={valorX2} onChange={handleInputX2} id="X2" />
            </div>
            <br />
            <br />

            <label>Ingrese terminos de la Restriccion 1:</label>
            <div className="row">
              <ValorR value={valorR1X1} onChange={handleInputR1X1} id="R1X1" />
              <ValorR value={valorR1X2} onChange={handleInputR1X2} id="R1X2" />
              <SelectorOperador onChange={seleccionOperadorR1} name="ope1" />
              <ResultadoR
                value={resultadoR1}
                onChange={handleInputResultadoR1}
                id="ResultadoR1"
              />
            </div>

            <label>Ingrese terminos de la Restriccion 2:</label>
            <div className="row">
              <ValorR value={valorR2X1} onChange={handleInputR2X1} id="R2X1" />
              <ValorR value={valorR2X2} onChange={handleInputR2X2} id="R2X2" />
              <SelectorOperador onChange={seleccionOperadorR2} name="ope2" />
              <ResultadoR
                value={resultadoR2}
                onChange={handleInputResultadoR2}
                id="ResultadoR2"
              />
            </div>
            <br />
            <ButtonContinuar />
          </form>
          <br />
        </div>
      );
    } else if ((decision === 2) & (restriccion === 3)) {
      return (
        <div className="Home">
          <HeaderEcuaciones />

          <form onSubmit={handleSubmit}>
            <br />
            <label>Ingrese terminos de la funcion objetivo:</label>
            <div className="row">
              <ValorX value={valorX1} onChange={handleInputX1} id="X1" />
              <p className="col s0.5"> + </p>
              <ValorX vvalue={valorX2} onChange={handleInputX2} id="X2" />
            </div>
            <br />
            <br />

            <label>Ingrese terminos de la Restriccion 1:</label>
            <div className="row">
              <ValorR value={valorR1X1} onChange={handleInputR1X1} id="R1X1" />
              <ValorR value={valorR1X2} onChange={handleInputR1X2} id="R1X2" />
              <SelectorOperador onChange={seleccionOperadorR1} name="ope1" />

              <ResultadoR
                value={resultadoR1}
                onChange={handleInputResultadoR1}
                id="ResultadoR1"
              />
            </div>

            <label>Ingrese terminos de la Restriccion 2:</label>
            <div className="row">
              <ValorR value={valorR2X1} onChange={handleInputR2X1} id="R2X1" />
              <ValorR value={valorR2X2} onChange={handleInputR2X2} id="R2X2" />
              <SelectorOperador onChange={seleccionOperadorR2} name="ope2" />

              <ResultadoR
                value={resultadoR2}
                onChange={handleInputResultadoR2}
                id="ResultadoR2"
              />
            </div>

            <label>Ingrese terminos de la Restriccion 3:</label>
            <div className="row">
              <ValorR value={valorR3X1} onChange={handleInputR3X1} id="R3X1" />
              <ValorR value={valorR3X2} onChange={handleInputR3X2} id="R3X2" />
              <SelectorOperador onChange={seleccionOperadorR3} name="ope3" />

              <ResultadoR
                value={resultadoR3}
                onChange={handleInputResultadoR3}
                id="ResultadoR3"
              />
            </div>
            <br />

            <ButtonContinuar />
          </form>
          <br />
        </div>
      );
    } else if ((decision === 3) & (restriccion === 2)) {
      return (
        <div className="Home">
          <HeaderEcuaciones />

          <form onSubmit={handleSubmit}>
            <br />
            <label>Ingrese terminos de la funcion objetivo:</label>
            <div className="row">
              <ValorX value={valorX1} onChange={handleInputX1} id="X1" />
              <p className="col s0.5"> + </p>
              <ValorX value={valorX2} onChange={handleInputX2} id="X2" />
              <p className="col s0.5"> + </p>
              <ValorX value={valorX3} onChange={handleInputX3} id="X3" />
            </div>
            <br />
            <br />

            <label>Ingrese terminos de la Restriccion 1:</label>
            <div className="row">
              <ValorR value={valorR1X1} onChange={handleInputR1X1} id="R1X1" />
              <ValorR value={valorR1X2} onChange={handleInputR1X2} id="R1X2" />
              <ValorR value={valorR1X3} onChange={handleInputR1X3} id="R1X3" />
              <SelectorOperador onChange={seleccionOperadorR1} name="ope1" />

              <ResultadoR
                value={resultadoR1}
                onChange={handleInputResultadoR1}
                id="ResultadoR1"
              />
            </div>

            <label>Ingrese terminos de la Restriccion 2:</label>
            <div className="row">
              <ValorR value={valorR2X1} onChange={handleInputR2X1} id="R2X1" />
              <ValorR value={valorR2X2} onChange={handleInputR2X2} id="R2X2" />
              <ValorR value={valorR2X3} onChange={handleInputR2X3} id="R2X3" />

              <SelectorOperador onChange={seleccionOperadorR2} name="ope2" />

              <ResultadoR
                value={resultadoR2}
                onChange={handleInputResultadoR2}
                id="ResultadoR2"
              />
            </div>
            <br />

            <ButtonContinuar />
          </form>
          <br />
        </div>
      );
    } else if ((decision === 3) & (restriccion === 3)) {
      return (
        <div className="Home">
          <HeaderEcuaciones />

          <form onSubmit={handleSubmit}>
            <br />
            <label>Ingrese terminos de la funcion objetivo:</label>
            <div className="row">
              <ValorX value={valorX1} onChange={handleInputX1} id="X1" />
              <p className="col s0.5"> + </p>
              <ValorX value={valorX2} onChange={handleInputX2} id="X2" />
              <p className="col s0.5"> + </p>
              <ValorX value={valorX3} onChange={handleInputX3} id="X3" />
            </div>
            <br />
            <br />

            <label>Ingrese terminos de la Restriccion 1:</label>
            <div className="row">
              <ValorR value={valorR1X1} onChange={handleInputR1X1} id="R1X1" />
              <ValorR value={valorR1X2} onChange={handleInputR1X2} id="R1X2" />
              <ValorR value={valorR1X3} onChange={handleInputR1X3} id="R1X3" />
              <SelectorOperador onChange={seleccionOperadorR1} name="ope1" />
              <ResultadoR
                value={resultadoR1}
                onChange={handleInputResultadoR1}
                id="ResultadoR1"
              />
            </div>

            <label>Ingrese terminos de la Restriccion 2:</label>
            <div className="row">
              <ValorR value={valorR2X1} onChange={handleInputR2X1} id="R2X1" />
              <ValorR value={valorR2X2} onChange={handleInputR2X2} id="R2X2" />
              <ValorR value={valorR2X3} onChange={handleInputR2X3} id="R2X3" />

              <SelectorOperador onChange={seleccionOperadorR2} name="ope2" />

              <ResultadoR
                value={resultadoR2}
                onChange={handleInputResultadoR2}
                id="ResultadoR2"
              />
            </div>

            <label>Ingrese terminos de la Restriccion 3:</label>
            <div className="row">
              <ValorR value={valorR3X1} onChange={handleInputR3X1} id="R3X1" />
              <ValorR value={valorR3X2} onChange={handleInputR3X2} id="R3X2" />
              <ValorR value={valorR3X3} onChange={handleInputR3X3} id="R3X3" />

              <SelectorOperador onChange={seleccionOperadorR3} name="ope3" />

              <ResultadoR
                value={resultadoR3}
                onChange={handleInputResultadoR3}
                id="ResultadoR3"
              />
            </div>
            <br />

            <ButtonContinuar />
          </form>
          <br />
        </div>
      );
    }
  }
  // En caso de que no se hayan enviado datos desde la pagina anterior
  else {
    return <EcucionesInfo />;
  }
}

export default Ecuaciones;

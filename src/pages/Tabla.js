import React from "react";
import "./Tabla.css";
import "materialize-css/dist/css/materialize.min.css";

function Tabla(props) {
  console.log(props);
  if (props.location.valores != null) {
    var decision = parseInt(props.location.valores.decision);
    var restriccion = parseInt(props.location.valores.restriccion);
    var seleccion = props.location.valores.seleccion;
    var array_objetivo = props.location.valores.array_objetivo;
    var array_restriccionR1 = props.location.valores.array_restriccionR1;
    var array_restriccionR2 = props.location.valores.array_restriccionR2;
    var array_restriccionR3 = props.location.valores.array_restriccionR3;
  } else {
    console.error(
      "No se ha recuperado la variable valores de la pagina Ecuaciones"
    );
  }

  var columnas = 0;
  var filas = 0;
  filas = restriccion + 2; // Se suma 2 por el header y la Z de la tabla
  if (seleccion === 1) {
    console.log("Es maximizacion");
    columnas = decision + restriccion + 2;
    //Se le suma  restriccion para agrerar las variables de holgura
    // Y se suma 2 para agregar la columna 1 y la columna R
  } else if (seleccion === 2) {
    console.log("Es Minimizacion");
    columnas = decision + 2; //Se suma 2 para agregar la columna 1 y la columna R
  }
  console.log("La tabla será de: " + filas + "x" + columnas); // 5x8

  //Generamos los valores para el body de la tabla
  /* var bodyy = [];
  var contador_body = decision + 1;
  filas = filas - 1; // restamos 1 por que el header de la tabla ya lo tenemos aparte
  for (var f = 0; f < filas; f++) {
    bodyy.push([]); //
    for (var c = 0; c < columnas; c++) {
      if ((c == 0) & (f < filas - 1)) {
        bodyy[f][c] = "F" + (f + 1);
      } else if ((c == 0) & (f == filas - 1)) {
        bodyy[f][c] = "Z";
      } else {
        //aqui van los valores ingresados en la pagina anterior
        bodyy[f][c] = 0;
      }
      //seteamos las variables de holgura a 1
      if ((c == contador_body) & (c != columnas - 1)) {
        bodyy[f][c] = 1;
      }
    }
    contador_body++;
  }*/

  var bodyy = [];
  var contador_body = decision + 1;
  filas = filas - 1; // restamos 1 por que el header de la tabla ya lo tenemos aparte
  for (var f = 0; f < filas; f++) {
    bodyy.push([]); //
    for (var c = 0; c < columnas; c++) {
      if ((c === 0) & (f < filas - 1)) {
        bodyy[f][c] = "F" + (f + 1);
      } else if ((c === 0) & (f === filas - 1)) {
        bodyy[f][c] = "Z";
      } else {
        // aqui van los valores de las restriccion 1 ingresados en la pagina anterior
        if (f === 0) {
          if ((c > 0) & (c < array_restriccionR1.length)) {
            bodyy[f][c] = array_restriccionR1[c - 1];
          } else if (c === columnas - 1) {
            //aigno el respectivo valor de R
            bodyy[f][c] = array_restriccionR1[array_restriccionR1.length - 1];
          } else {
            bodyy[f][c] = 0; // relleno el resto de valores con ceros
          }
        }
        // aqui van los valores de las restriccion 2 ingresados en la pagina anterior
        if (f === 1) {
          if ((c > 0) & (c < array_restriccionR2.length)) {
            bodyy[f][c] = array_restriccionR2[c - 1];
          } else if (c === columnas - 1) {
            //aigno el respectivo valor de R
            bodyy[f][c] = array_restriccionR2[array_restriccionR2.length - 1];
          } else {
            bodyy[f][c] = 0; // relleno el resto de valores con ceros
          }
        }
        // aqui van los valores de las restriccion 3 ingresados en la pagina anterior
        if (f === 2) {
          if ((c > 0) & (c < array_restriccionR3.length)) {
            bodyy[f][c] = array_restriccionR3[c - 1];
          } else if (c === columnas - 1) {
            //aigno el respectivo valor de R
            bodyy[f][c] = array_restriccionR3[array_restriccionR3.length - 1];
          } else {
            bodyy[f][c] = 0; // relleno el resto de valores con ceros
          }
        }
        if (f === 3) {
          if ((c > 0) & (c <= array_objetivo.length)) {
            bodyy[f][c] = array_objetivo[c - 1];
          } else {
            bodyy[f][c] = 0; // relleno el resto de valores con ceros
          }
        }
      }
      //seteamos las variables de holgura a 1
      if ((c === contador_body) & (c !== columnas - 1)) {
        bodyy[f][c] = 1;
      }
    }
    contador_body++;
  }

  //Generamos valores para el header de la tabla
  var headerr = [];
  for (let c = 0; c < columnas; c++) {
    if (c === 0) headerr[c] = "-";
    else if (c < columnas - 1) headerr[c] = "X" + c;
    else headerr[c] = "R";
  }

  const calcularResultado = () => {
    //obtiene todos los valores td de una tabla
    var x = document.getElementsByTagName("td");

    console.log(x[1].innerHTML);
  };

  var body_auxiliar = [];
  if (props.location.valores != null) {
    return (
      <div className="Tabla">
        <header className="Tabla-header">
          <p>Tabla Método Simplex</p>
        </header>
        <table className="highlight" id="values">
          <thead>
            <tr>
              {headerr.map((element, index) => (
                <th key={index}>{element}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {bodyy.map(
              (element, index) => (
                (body_auxiliar = element),
                (
                  <tr key={index}>
                    {body_auxiliar.map((el, id) => (
                      <td key={id}>{el}</td>
                    ))}
                  </tr>
                )
              )
            )}
          </tbody>
        </table>

        <br />

        <div>
          <button
            className="waves-effect waves-light btn-large"
            onClick={calcularResultado}
          >
            Calcular
            <i className="material-icons right">cloud</i>
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Tabla">
        <header className="Tabla-header">
          <p>Tabla Método Simplex</p>
        </header>
        <p>Vacio</p>

        <button
          className="waves-effect waves-light btn-large"
          onClick={calcularResultado}
        >
          Calcular
        </button>
      </div>
    );
  }
}

export default Tabla;

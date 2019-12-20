import React from "react";
import { Button, Radio, Row, Col, Layout, InputNumber, Modal } from "antd";
import "./assets/App.css";
import "./assets/Basic.css";
import "./assets/Home.css";
import Header from "./components/Header";
const { Content, Footer } = Layout;

var array_problema = [];
var tabla_a = [];
var tabla_b = [];
var zeta = [];
var array_pos_artifi = [];
var array_borrar_pos_artifi = [];
var clic_generar = false;
var es_decimal = false;

function App() {
  const generarInputs = () => {
    numero_variables = parseInt(document.getElementById("num_variables").value);
    numero_restricciones = parseInt(
      document.getElementById("num_restricciones").value
    );

    var str_table_inputs = "";

    document.getElementById("maximizar").checked === true
      ? (tipo_operacion = 1)
      : (tipo_operacion = 0);

    str_table_inputs += "<table align='center'> <tr> <td></td>";

    for (var i = 0; i < numero_variables; i++)
      str_table_inputs += "<td ><strong>X" + (i + 1) + "</strong></td>";
    str_table_inputs += "<td></td> <td></td></tr><tr>";

    if (tipo_operacion === 1)
      str_table_inputs += "<td><strong> Maximizar Z </strong> </td>";
    else str_table_inputs += "<td><strong> Minimizar Z </strong></td>";

    for (var j = 0; j < numero_variables; j++)
      str_table_inputs +=
        "<td><input size='7' style='text-align:center' type='number name='valor_x" +
        j +
        "' id='valor_x" +
        j +
        "'></td> ";
    str_table_inputs += "<td></td><td></td></tr>";

    /*eslint-disable */
    for (var i = 0; i < numero_restricciones; i++) {
      str_table_inputs +=
        "<tr><td><strong> Restricción " + (i + 1) + " </strong></td>";
      for (var j = 0; j < numero_variables; j++)
        str_table_inputs +=
          "<td><input size='7' style='text-align:center' type='number name='valor_r" +
          i +
          "x" +
          j +
          "' id='valor_r" +
          i +
          "x" +
          j +
          "' ></td>";
      str_table_inputs +=
        "<td><select name='operador_r" +
        i +
        "' id='operador_r" +
        i +
        "'><option selected value='<=''><=</option>";
      str_table_inputs +=
        "<option value='>='> >= </option><option value='='> = </option></select></td>";
      str_table_inputs +=
        "<td><input size='7' style='text-align:center' type='number name='resultado_r" +
        i +
        "' id='resultado_r" +
        i +
        "' ></td></tr>";
    }
    /*eslint-enable */
    str_table_inputs += "</table>";
    document.getElementById("table_inputs").innerHTML = str_table_inputs;
    clic_generar = true;
  };

  return (
    <Layout className="App">
      <Header />
      <br />
      <Content id="content">
        <strong>
          Ingrese las cantidad de variables de decisión y de restricciones
          necesarias
        </strong>
        <br />
        <Row>
          <Col span={7} offset={7}>
            Cantidad de variables:
          </Col>
          <Col span={2}>
            <InputNumber id="num_variables" min={2} max={10} />
          </Col>
        </Row>
        <Row>
          <Col span={7} offset={7}>
            Cantidad de restricciones:
          </Col>
          <Col span={2}>
            <InputNumber id="num_restricciones" min={1} max={10} />
          </Col>
        </Row>
        <br />
        <strong>¿Qué desea hacer con la función objetivo? </strong>
        <Row>
          <Radio.Group name="radiogroup" defaultValue={1}>
            <Radio value={1} id="maximizar" name="tipo_operacion">
              Maximizar
            </Radio>
            <Radio value={2} id="minimizar" name="tipo_operacion">
              Minimizar
            </Radio>
          </Radio.Group>
        </Row>
        <br />
        <Row>
          <Col span={7} offset={5}>
            <Button type="primary" shape="round" onClick={generarInputs}>
              Generar Inputs
            </Button>
          </Col>
          <Col span={7}>
            <Button type="primary" shape="round" onClick={resolverEjercicio}>
              Resolver Ejercicio
            </Button>
          </Col>
        </Row>
        <br />
        <div id="table_inputs"> </div>
        <div id="solucion_optima"></div>
      </Content>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer>© 2020</Footer>
    </Layout>
  );
}
export default App;

////////////////////////////////////////////
var tipo_operacion = 1; //1 es maximizacion
var numero_variables;
var numero_restricciones;
var cont_eses = 0;
var total = 0;
var cantidad_variables;
var es2 = 0;
var is_minimo = 0;
var hacer_uno;

const resolverEjercicio = () => {
  if (clic_generar === false) {
    Modal.confirm({
      title: "Mensaje",
      content: "Aún no ha llenado la tabla",
      okText: "OK"
    });
  } else {
    inicializarMatriz(
      array_problema,
      numero_restricciones,
      numero_variables + 1
    );

    for (let i = 0; i < numero_variables; i++) {
      //si no ingresa un valor en la funcion objetivo lo rellenamos con 0
      document.getElementById("valor_x" + i).value === ""
        ? (zeta[i] = 0)
        : (zeta[i] = parseFloat(document.getElementById("valor_x" + i).value));
    }

    for (var i = 0; i < numero_restricciones; i++) {
      for (var j = 0; j < numero_variables; j++) {
        //si no ingresa un valor en alguna restriccion lo rellenamos con 0
        document.getElementById("valor_r" + i + "x" + j).value === ""
          ? (array_problema[i][j] = 0)
          : (array_problema[i][j] = parseFloat(
              document.getElementById("valor_r" + i + "x" + j).value
            ));
      }

      if (document.getElementById("resultado_r" + i).value === "")
        array_problema[i][numero_variables] = 0;
      else
        array_problema[i][numero_variables] = parseFloat(
          document.getElementById("resultado_r" + i).value
        );
      array_problema[i][numero_variables + 1] = document.getElementById(
        "operador_r" + i
      ).value;
    }
    //fin for
    generarSolucion();
  }
};

const inicializarMatriz = (matriz, num_filas, num_col) => {
  for (var i = 0; i <= num_filas; i++) {
    matriz[i] = [];
    for (var j = 0; j <= num_col; j++) {
      matriz[i][j] = 0;
    }
  }
};

const estandarizarEcuaciones = matriz => {
  cantidad_variables = numero_variables;
  // inicializarMatriz(matriz, numero_restricciones, total + 2); //
  for (var i = 1; i <= numero_restricciones; i++) {
    for (var j = 0; j <= numero_variables; j++) {
      if (j === numero_variables)
        matriz[i][total + 1] = array_problema[i - 1][j];
      else matriz[i][j + 1] = array_problema[i - 1][j];
    }
  }

  array_pos_artifi.push(0);

  //Verificamos el operador y Añadimos variables de holgura,
  //exceso y artificiales en el orden de aparicion
  for (let i = 0; i < numero_restricciones; i++) {
    if (array_problema[i][numero_variables + 1] === "<=") {
      //vamos agregando la variable de holgura en cada fila para cada restriccion
      matriz[i + 1][++cantidad_variables] = 1;
    } else if (array_problema[i][numero_variables + 1] === "=") {
      matriz[i + 1][++cantidad_variables] = 1;
      array_borrar_pos_artifi.push(cantidad_variables);
      matriz[0][cantidad_variables] = -1;
      array_pos_artifi.push(i + 1);
      //Caso contrario agregamos variables de exceso
    } else if (array_problema[i][numero_variables + 1] === ">=") {
      matriz[i + 1][++cantidad_variables] = -1;
      matriz[i + 1][++cantidad_variables] = 1;
      array_borrar_pos_artifi.push(cantidad_variables);
      matriz[0][cantidad_variables] = -1;
      array_pos_artifi.push(i + 1);
    }
  }
  console.log("array_borrar_pos_artifi", array_borrar_pos_artifi);
  console.log("array_pos_artifi", array_pos_artifi);
  matriz[0][0] = 1.0;
};

const generarSolucion = () => {
  for (var i = 0; i < numero_restricciones; i++)
    if (
      array_problema[i][numero_variables + 1] === "<=" ||
      array_problema[i][numero_variables + 1] === "="
    )
      cont_eses += 1;
    else cont_eses += 2;
  total = cont_eses + numero_variables;

  validarEntrada(array_problema);

  //var str_table = "<div align='center'><br><h2>Restriciones</h2></div>"; //
  var str_table = "";
  document.getElementById("content").innerHTML += str_table;
  // imprimeTabla(array_problema, numero_restricciones - 1, numero_variables); //
  inicializarMatriz(tabla_a, numero_restricciones, total + 2);
  // imprimeTabla(tabla_a, numero_restricciones, total + 1); //
  estandarizarEcuaciones(tabla_a);
  if (cont_eses !== numero_restricciones) {
    imprimeTabla(tabla_a, numero_restricciones, total + 1);
    str_table =
      "<br><div align = 'center'><br><h2>Tabla Con W prima</h2></div>";
    document.getElementById("content").innerHTML += str_table;
    calcularWPrima(tabla_a);
    imprimeTabla(tabla_a, numero_restricciones, total + 1);
    str_table = "<br><div align = 'center'><br><h2>Primera Fase</h2></div>";
    document.getElementById("content").innerHTML += str_table;
    primeraFase(tabla_a);
  }
  es2++;
  //imprimeTabla(tabla_a, numero_restricciones, total+1);
  str_table = "<br><div align = 'center'><br><h2>Segunda Fase</h2></div>";
  document.getElementById("content").innerHTML += str_table;
  iniciarSegundaFase(tabla_a);
  //imprimeTabla(tabla_b, numero_restricciones, total - array_borrar_pos_artifi.length+1);
  segundaFase();
  //imprimeTabla(tabla_b, numero_restricciones, total - array_borrar_pos_artifi.length+1);
};

//Calculamos la primera fase con el tabla
const primeraFase = matriz => {
  var bandera = 1;
  var iteracion = 1;

  while (bandera !== 0) {
    var mayor = 0.0;
    var menor = 1000000000.0;
    var entra_max, sale_min, hacer_uno;
    bandera = 0;

    //Imprimimos el tabla actual
    var str_table =
      "<br><div align = 'center'><br><p>Iteración " + iteracion++ + "<p></div>";
    document.getElementById("content").innerHTML += str_table;
    imprimeTabla(matriz, numero_restricciones, total + 1);
    //Seleccionamos la variable de entrada
    for (let j = 1; j <= total; j++) {
      if (matriz[0][j] > 0 && matriz[0][j] > mayor) {
        mayor = matriz[0][j];
        entra_max = j;
        bandera = 1;
      }
    }

    //Seleccion de la variable de salida
    for (let i = 1; i <= numero_restricciones; i++) {
      if (entra_max > 0 && matriz[i][entra_max] > 0) {
        if (matriz[i][total + 1] / matriz[i][entra_max] < menor) {
          menor = parseFloat(matriz[i][total + 1] / matriz[i][entra_max]);
          sale_min = i;
        }
      }
    }

    // Calculamos las variables de la siguiente iteracion
    var hacer_uno_a = matriz[sale_min][entra_max];
    hacer_uno = parseFloat(hacer_uno_a);

    str_table = "<div align = 'center'><br><p>Entra X" + entra_max + "</p>";
    str_table += "<p>Sale R" + sale_min + "</p></div>";
    document.getElementById("content").innerHTML += str_table;

    for (let j = 1; j <= total + 1; j++) {
      matriz[sale_min][j] /= hacer_uno;
      //matriz[sale_min][j] = parseFloat(matriz[sale_min][j]);
    }

    //imprimeTabla(matriz, numero_restricciones, total+1);
    for (var i = 0; i <= numero_restricciones; i++) {
      var vector = [];
      if (matriz[i][entra_max] !== 0 && i !== sale_min) {
        var aux = matriz[i][entra_max];
        for (var j = 0; j <= total + 1; j++) {
          matriz[i][j] += matriz[sale_min][j] * aux * -1;
          if (
            matriz[i][j] <= 2.220446049250313e-8 &&
            matriz[i][j] >= -4.440892098500626e-8
          )
            matriz[i][j] = 0;
        }
      }
    }
  }
};

const iniciarSegundaFase = matriz => {
  inicializarMatriz(
    tabla_b,
    numero_restricciones + 1,
    total - array_borrar_pos_artifi.length + 2
  );
  for (var i = 0; i < numero_restricciones; i++) {
    var aux = 0;
    var k = 0;
    for (var j = 0; j <= total + 1; j++) {
      if (array_borrar_pos_artifi[aux] !== j)
        tabla_b[i + 1][k++] = matriz[i + 1][j];
      else aux++;
    }
  }
  tabla_b[0][0] = 1; //valor de z

  for (let j = 0; j < numero_variables; j++)
    if (is_minimo === numero_restricciones * numero_variables)
      tabla_b[0][j + 1] = -0.001 * zeta[j];
    else tabla_b[0][j + 1] = -1 * zeta[j];
};

const segundaFase = () => {
  //imprimeTabla(tabla_b, numero_restricciones, total - array_borrar_pos_artifi.length+1);
  if (tipo_operacion === 0) {
    var str_table =
      "<br><div align = 'center'><br><h4>Es minimización, hacemos ajuste de Z</h4></div>";
    document.getElementById("content").innerHTML += str_table;
    imprimeTabla(
      tabla_b,
      numero_restricciones,
      total - array_borrar_pos_artifi.length + 1
    );
    ajuste(
      tabla_b,
      numero_restricciones,
      zeta.length,
      total - array_borrar_pos_artifi.length + 1
    );
  }

  finalizarFase(tabla_b);
  //imprimeTabla(tabla_b, numero_restricciones, total - array_borrar_pos_artifi.length+1);
};

const finalizarFase = matriz => {
  var bandera = 1,
    iteracion = 1;
  while (bandera !== 0) {
    var mayor = 0;
    var menor = 1000000000;
    var my_map = [];
    var entra = 0,
      sale,
      salda = 10000000000;
    bandera = 0;

    //console.log(entra);
    var str_table =
      "<br><div align = 'center'><br><p>Iteración " + iteracion++ + "<p></div>";
    document.getElementById("content").innerHTML += str_table;
    imprimeTabla(
      matriz,
      numero_restricciones,
      total - array_borrar_pos_artifi.length + 1
    );
    if (tipo_operacion === 1) {
      for (let j = 1; j <= total - array_borrar_pos_artifi.length; j++) {
        if (matriz[0][j] < 0 && matriz[0][j] < menor) {
          menor = matriz[0][j];
          entra = j;
          bandera = 1;
        }
      }
    } else if (tipo_operacion === 0) {
      for (let j = 1; j <= total - array_borrar_pos_artifi.length; j++) {
        if (matriz[0][j] > 0 && matriz[0][j] > mayor) {
          mayor = matriz[0][j];
          entra = j;
          bandera = 1;
        }
      }
    }

    //Seleccion de la variable de salida Forma correcta
    for (let i = 1; i <= numero_restricciones; i++) {
      if (entra > 0 && matriz[i][entra] > 0) {
        if (
          matriz[i][total - array_borrar_pos_artifi.length + 1] /
            matriz[i][entra] <
          salda
        ) {
          salda = parseFloat(
            matriz[i][total - array_borrar_pos_artifi.length + 1] /
              matriz[i][entra]
          );
          sale = i;
        }
      }
    }

    // Calculamos las variables de la siguiente iteracion
    var hacer_uno_a = matriz[sale][entra];
    hacer_uno = parseFloat(hacer_uno_a);

    str_table = "<div align = 'center'><br><p>Entra X" + entra + "</p>";
    str_table += "<p>Sale X" + sale + "</p></div>";
    document.getElementById("content").innerHTML += str_table;

    for (let j = 0; j <= total - array_borrar_pos_artifi.length + 1; j++) {
      matriz[sale][j] /= hacer_uno;
      matriz[sale][j] = parseFloat(matriz[sale][j]);
    }

    for (let i = 0; i <= numero_restricciones; i++) {
      var vector = [];
      if (matriz[i][entra] !== 0 && i !== sale) {
        var aux = matriz[i][entra];
        for (let j = 0; j <= total + 1; j++) {
          vector.push(matriz[sale][j] * aux);
          matriz[i][j] -= vector[j];
          matriz[i][j] = parseFloat(matriz[i][j]);
        }
      }
    }
  }
};

const ajuste = (matriz, num_filas, num_col, nc2) => {
  for (var j = 1; j <= num_col; j++)
    if (matriz[0][j] < 0) {
      var aux = matriz[0][j];
      for (var i = 1; i <= num_filas; i++)
        if (matriz[i][j] === 1)
          for (var k = 0; k <= nc2; k++) {
            matriz[0][k] += matriz[i][k] * -1 * aux;
          }
    }
};

//Grafica la tabla
const imprimeTabla = (matriz, num_filas, num_col) => {
  var an = document.getElementById("content");
  var table = document.createElement("table");
  table.id = "my_table";
  var tr = document.createElement("tr");
  var text;
  if (es2 > 0) text = document.createTextNode("Z");
  else text = document.createTextNode("W");
  var td = document.createElement("td");
  td.appendChild(text);
  tr.appendChild(td);
  table.appendChild(tr);

  for (let l = 1; l < num_col; l++) {
    text = "";
    td = document.createElement("td");
    text = document.createTextNode("X" + l);
    td.appendChild(text);
    tr.appendChild(td);
    table.appendChild(tr);
  }

  text = document.createTextNode("R");
  td = document.createElement("td");
  td.appendChild(text);
  tr.appendChild(td);
  table.appendChild(tr);

  for (var k = 0; k <= num_filas; k++) {
    tr = document.createElement("tr");
    for (var l = 0; l <= num_col; l++) {
      var text = "";
      var td = document.createElement("td");
      //
      verificarSiEsDecimal(matriz[k][l]);
      es_decimal
        ? (text = document.createTextNode(matriz[k][l].toFixed(2)))
        : (text = document.createTextNode(matriz[k][l]));
      //
      td.appendChild(text);
      tr.appendChild(td);
      table.appendChild(tr);
    }
    an.appendChild(table);
  }
};

const verificarSiEsDecimal = numero => {
  numero % 1 === 0 ? (es_decimal = false) : (es_decimal = true);
};

const validarEntrada = matriz => {
  for (let i = 0; i < numero_restricciones; i++)
    for (let j = 0; j < numero_variables; j++)
      if (array_problema[i][j] < 1) is_minimo++;

  if (is_minimo === numero_variables * numero_restricciones)
    for (let i = 0; i < numero_restricciones; i++)
      for (let j = 0; j <= numero_variables; j++) {
        array_problema[i][j] *= 10;
        zeta[j] *= 10;
      }
};

const calcularWPrima = matriz => {
  var suma = 0;
  for (var i = 0; i <= total + 1; i++) {
    suma = 0;
    for (var j = 0; j < array_pos_artifi.length; j++) {
      suma += parseInt(matriz[array_pos_artifi[j]][i]);
    }
    matriz[0][i] = suma;
  }
};

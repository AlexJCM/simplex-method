import React from "react";

const SelectorTipo = props => (
  <select onChange={props.onChange} name={props.name}>
    <option value="" disabled>
      Escoja una opcion
    </option>
    <option value="1">1 Maximizar</option>
    <option value="2">2 Minimizar</option>
  </select>
);

export default SelectorTipo;

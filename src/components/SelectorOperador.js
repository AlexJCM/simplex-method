import React from "react";

const SelectorOperador = props => (
  <div className="input-field col s2">
    <select onChange={props.onChange} name={props.name}>
      <option value="">Operador</option>
      <option value="1">&lt;=</option>
      <option value="2">&gt;=</option>
      <option value="3">=</option>
    </select>
  </div>
);

export default SelectorOperador;

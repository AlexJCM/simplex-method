import React from "react";

const ResultadoR = props => (
  <div className="col s2">
    {props.id}
    <input value={props.value} onChange={props.onChange} id={props.id} />
  </div>
);

export default ResultadoR;

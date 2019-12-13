import React from "react";

const ValorR = props => (
  <div className="col s2">
    {props.id}
    <input value={props.value} onChange={props.onChange} id={props.id} />
  </div>
);

export default ValorR;

import React from "react";

const ValorX = props => (
  <div className="col s2">
    {props.id}
    <input
      value={props.value}
      onChange={props.onChange}
      type="number"
      id={props.id}
    />
  </div>
);

export default ValorX;

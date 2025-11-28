import React from "react";

export default function Product(props) {
  console.log(props);
  return (
    <div>
      <img src={props.path} className="img" />
      <h2>{props.price}</h2>
      <p>{props.name}</p>

      <button>Add to Cart</button>
    </div>
  );
}

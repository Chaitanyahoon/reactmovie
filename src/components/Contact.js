import React, { useState } from "react";

export default function Contact(props) {
  const [count, setCount] = useState(0);

  function myfunction() {
    // Don't mutate props directly. Update local state instead.
    setCount((c) => c + 1);
  }
  return (
    <div>
      Contact
      <p>p{props.x1}</p>
      <p>{props.x2}</p>
      <p>{count}</p>
      <button onClick={myfunction}>Contact</button>
    </div>
  );
}

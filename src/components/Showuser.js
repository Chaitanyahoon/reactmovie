import React, { Component } from "react";
import axios from "axios";

export default class Showuser extends Component {
  componentDidMount() {
    try {
      console.log(
        "Showuser: document.cookie length:",
        document.cookie?.length ?? 0
      );
      console.log(
        "Showuser: document.cookie (truncated):",
        (document.cookie || "").slice(0, 300)
      );
    } catch (e) {
      console.warn(
        "Showuser: cannot access document.cookie in this environment",
        e
      );
    }

    axios
      .get("/show")
      .then((res) => {
        console.log("Showuser response data:", res.data);
      })
      .catch((err) => {
        console.error("Showuser request error:", err);
      });
  }

  render() {
    console.log(this);
    
    return (
      <div className="container">
        <h1>Show user component</h1>
      </div>
    );
  }
}

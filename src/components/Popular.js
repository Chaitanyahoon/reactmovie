import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Popular() {
  let [api, setApi] = useState([]);
  useEffect(() => {
    console.log("call API data");
    let ans = axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_KEY}&language=en-US&page=1`
    );
    ans.then((response) => {
      console.log(response.data);
      setApi(response.data.results);
    });
    console.log(ans);
  }, []);
  return (
    <div className="container">
      <h1>Popular Movies</h1>
      <div className="row">
        {api.map((value) => (
          <div className="col-xl-3" key={value.id}>
            <img
              src={"https://image.tmdb.org/t/p/w500" + value.poster_path}
              className="img-fluid"
              alt={value.title}
            />
            <p>{value.title}</p>
            <Link to={`/SingleMovie/${value.id}`}>View Movie</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from "react";
import Product from "./Product";
function Home() {
  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <Product
            name="Shirt"
            price="567"
            path="https://assets.ajio.com/medias/sys_master/root/20240929/B2jg/66f8de07260f9c41e83d7c48/-473Wx593H-700508462-offwhite-MODEL.jpg?&width=200"
          />
        </div>
        <div className="col">
          <Product
            name="Belt"
            price="4565"
            path="https://www.escaro.in/cdn/shop/files/IMG_105100.jpg?v=1748886619&width=200"
          />
        </div>
        <div className="col">
          <Product
            name="Tie"
            price="234"
            path="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCjC_2ZeXNgC2G4OXc3ihJ4d_8snRVXVQmng&s"
          />
        </div>
      </div>
    </div>
  );
}
export default Home;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Appp from "./components/Appp";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Contact from "./components/Contact";
import Adduser from "./components/Adduser";
import Showuser from "./components/Showuser";
import Show from "./components/Show";
import Popular from "./components/Popular";
import Upcoming from "./components/Upcoming";
import Pagenotfound from "./components/Pagenotfound";
import Toprated from "./components/Toprated";
import Singlemovie from "./components/Singlemovie";

const route = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Appp />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="Contact" element={<Contact />} />
        <Route path="adduser" element={<Adduser />} />
        <Route path="show-user" element={<Showuser />} />
        <Route path="add-user" element={<Adduser />} />
        <Route path="show" element={<Show />} />
        <Route path="popular" element={<Popular />} />
        <Route path="toprated" element={<Toprated />} />
        <Route path="upcoming" element={<Upcoming />} />
        <Route path="SingleMovie/:id" element={<Singlemovie />} />
      </Route>
      <Route path="*" element={<Pagenotfound />} />
    </Routes>
  </BrowserRouter>
);

export default route;

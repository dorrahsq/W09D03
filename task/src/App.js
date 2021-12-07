import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/logIn/login";
import Header from "./components/header/header";
import SignUp from "./components/signup/signup";
import Home from "./components/home/home";
import Users from "./components/users/users";
import OneUser from "./components/oneuser/oneuser";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/usres" element={<Users />} />
        <Route exact path="/user/:id" element={<OneUser />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;

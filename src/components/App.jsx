import { useState, useEffect } from "react";
import NavBar from "./NavBar/NavBar";
import AllPosts from "./AllPosts/AllPosts";
import Register from "./Register/Register";
import { Routes, Route } from "react-router-dom";
import Login from "./Login/Login";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <h1>Welcome to Strangers Things</h1>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<AllPosts />} />
        <Route
          path="/register"
          element={<Register setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
      </Routes>
    </div>
  );
}

export default App;

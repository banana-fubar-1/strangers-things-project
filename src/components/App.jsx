import { useState, useEffect } from "react";
import NavBar from "./NavBar/NavBar";
import AllPosts from "./AllPosts/AllPosts";
import Register from "./Register/Register";
import { Routes, Route, useParams } from "react-router-dom";
import Login from "./Login/Login";
import SinglePost from "./SinglePost/SinglePost";
import { grabAllPosts } from "./api-adapters";
import Profile from "./Profile/Profile";

import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myUsername, setMyUsername] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const { username } = useParams();
  const { postId } = useParams();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }

    const fetchAllPosts = async () => {
      try {
        const results = await grabAllPosts();
        setAllPosts(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPosts();
  }, []);

  return (
    <div>
      <NavBar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        myUsername={myUsername}
      />
      <Routes>
        <Route
          path="/"
          element={<AllPosts isLoggedIn={isLoggedIn} myUsername={myUsername} />}
        />
        <Route
          path="/register"
          element={
            <Register
              setIsLoggedIn={setIsLoggedIn}
              setMyUsername={setMyUsername}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setMyUsername={setMyUsername}
            />
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <SinglePost
              allPosts={allPosts}
              setAllPosts={setAllPosts}
              myUsername={myUsername}
            />
          }
        />
        <Route
          path="/profile/:myUsername"
          element={
            <Profile
              allPosts={allPosts}
              setAllPosts={setAllPosts}
              myUsername={myUsername}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;

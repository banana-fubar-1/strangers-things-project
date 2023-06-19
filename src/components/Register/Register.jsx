import React, { useState } from "react";
import { registerUser } from "../api-adapters";
import { useNavigate } from "react-router-dom";

const Register = (props) => {
  const setIsLoggedIn = props.setIsLoggedIn;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setMyUsername = props.setMyUsername;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await registerUser(username, password);
      console.log(result);

      localStorage.setItem("token", result.token);
      setIsLoggedIn(true);
      setMyUsername(username);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 ">
        <h2 className="text-xl font-medium text-gray-900 dark:text-white">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </label>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            />
          </label>
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;

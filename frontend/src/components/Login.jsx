import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import {useNavigate} from "react-router-dom";
axios.defaults.withCredentials = true;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const {login} = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      console.log("this is the response: ", response.data);
      login({username})
      navigate("/dashboard")
    } catch (error) {
      // console.error("this is the error: ", error);
      console.log("this is the response: ", error.response.data);
    }
  };

  const handleDashboardRequest = async () => {
    try {
      const response = await axios.get("http://localhost:3000/dashboard");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="grid content-center gap-3 min-h-[20rem] max-w-md p-4 border border-gray-600 rounded-lg"
    >
      <h1 className="col-start-1 col-end-[-1] text-center text-4xl py-4">
        Login
      </h1>
      <label>
        Username:{" "}
        <input type="text" onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:{" "}
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
      <button type="button" onClick={handleDashboardRequest}>
        Access Dashboard
      </button>
    </form>
  );
};

export default Login;

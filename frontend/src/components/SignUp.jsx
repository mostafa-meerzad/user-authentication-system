import { useState } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/signup", {
        username: username,
        password,
      });
      console.log(response)
      login({ username: username });
      navigate("/dashboard")
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form
      onSubmit={handleSignUp}
      className={`grid content-center gap-3 min-h-[20rem] max-w-md p-4 border border-gray-600 rounded-lg `}
    >
      <h1 className="col-start-1 col-end-[-1] text-center text-4xl py-4">
        Sign Up
      </h1>
      <label>
        Username:{" "}
        <input type="text" onChange={(e) => setUserName(e.target.value)} />
      </label>
      <label>
        Password:{" "}
        <input type="password" onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Sign Up</button>
      <div className="flex items-center justify-around ">
        <button onClick={() => navigate("/signup")}>Sign up</button>
        <button onClick={() => navigate("/")}>Home</button>
      </div>
    </form>
  );
};
export default SignUp;

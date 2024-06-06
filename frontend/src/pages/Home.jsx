import {useNavigate} from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
  return (
    <>
      <h1>Home</h1>
      <br />
      <button onClick={()=>navigate("/login")}>Login</button>
      <button onClick={()=>navigate("/signup")}>Sign Up</button>

    </>
  );
};
export default Home;

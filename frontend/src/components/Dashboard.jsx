import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import axios from "axios";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  console.log("we're in dashboard");
  const [data, setData] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("http://localhost:3000/dashboard", {
          withCredentials: true,
        });
        setData(response.data);
        console.log(response)
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <ProtectedRoute>
      <h1>Welcome to dashboard</h1>
      <p>user: {user?.username}</p>

      <br />
      <button onClick={logOut}>logout</button>
      <br />
      <p>{data.message}</p>

    </ProtectedRoute>
  );
};

export default Dashboard;

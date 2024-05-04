import { useAuth } from "../AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome to dashboard</h1>
      <p>user: {user?.username}</p>

      <br />
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Dashboard;

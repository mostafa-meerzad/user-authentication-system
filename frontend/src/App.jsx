import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./AuthContext";
import Home from "./pages/Home";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    
    <Router>
      <AuthProvider>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Login/>} path="/login"/>
        <Route element={<SignUp/>} path="/signup"/>
        <Route element={<Dashboard />} path="/dashboard" />
      </Routes>
    </AuthProvider>
    </Router>
  );
};
export default App;

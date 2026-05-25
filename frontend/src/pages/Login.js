import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = async () => {
    try {
      const res = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      alert("Login Success");
      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 shadow-lg rounded w-96">
        <h1 className="text-3xl font-bold mb-5 text-center">Login</h1>
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={login} className="bg-blue-600 text-white w-full p-2">
          Login
        </button>
        <p className="mt-5 text-center">
          No account?
          <Link to="/register" className="text-blue-600 ml-2">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;

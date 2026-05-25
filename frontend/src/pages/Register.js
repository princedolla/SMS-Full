import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const register = async () => {
    try {
      await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });
      alert("Registration Success");
      navigate("/");
    } catch (err) {
      alert("Registration Failed");
    }
  };
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-10 shadow-lg rounded w-96">
        <h1 className="text-3xl font-bold mb-5 text-center">Register</h1>
        <input
          type="text"
          placeholder="Name"
          className="border w-full p-2 mb-3"
          onChange={(e) => setName(e.target.value)}
        />
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
        <button
          onClick={register}
          className="bg-green-600 text-white w-full p-2"
        >
          Register
        </button>
      </div>
    </div>
  );
}
export default Register;

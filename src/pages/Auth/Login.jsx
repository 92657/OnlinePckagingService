import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import { auth, db } from "../../firebase/Firebase";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        setError("User data not found");
        return;
      }

      const userData = userDoc.data();
      console.log("Logged in user:", userData);

      if (userData.role === "admin") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
    } catch (err) {
      setError("Invalid email or password");
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-sm mb-3 text-center">{error}</p>}

        <input type="email" placeholder="Email" className="w-full border p-2 mb-3 rounded" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full border p-2 mb-3 rounded" value={password} onChange={e => setPassword(e.target.value)} required />

        <div className="text-right mb-4">
          <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot Password?</Link>
        </div>

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition">Login</button>

        <p className="mt-4 text-sm text-center">
          Don&apos;t have an account? <Link to="/register" className="text-blue-600 font-medium hover:underline">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

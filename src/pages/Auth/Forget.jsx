import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/Firebase";
import { Link } from "react-router-dom";


const Forget = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email");
      setError("");
    } catch (err) {
      setError(err.message);
      setMessage("");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow w-80">
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
        {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <input type="email" placeholder="Enter your email" className="w-full border p-2 mb-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Send Reset Link</button>
        <p className="mt-3 text-sm">Back to <Link to="/login" className="text-blue-600">Login</Link></p>
      </form>
    </div>
  );
};


export default Forget;
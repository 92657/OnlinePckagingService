import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/Firebase";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // Default user
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: fullName });

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        company,
        phone,
        email,
        role,
        createdAt: new Date(),
      });

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setError("Email already registered");
      else setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-center">Create Account</h2>
        {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2 text-center">{success}</p>}

        <input className="w-full border p-2 mb-3 rounded" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
        <input className="w-full border p-2 mb-3 rounded" placeholder="Company Name" value={company} onChange={e => setCompany(e.target.value)} />
        <input className="w-full border p-2 mb-3 rounded" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
        <select className="w-full border p-2 mb-3 rounded" value={role} onChange={e => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input className="w-full border p-2 mb-3 rounded" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full border p-2 mb-3 rounded" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <input className="w-full border p-2 mb-4 rounded" placeholder="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />

        <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:opacity-50">
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p className="text-center mt-3 text-sm">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp, signIn } from "../services/authService";

export default function Login() {
  const [tab, setTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return setError("Please fill in all fields.");
    setLoading(true); setError("");
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) setError(err.message);
    else navigate("/");
  };

  const handleRegister = async () => {
    if (!email || !password) return setError("Please fill in all fields.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setLoading(true); setError("");
    const { error: err } = await signUp(email, password);
    setLoading(false);
    if (err) setError(err.message);
    else { setSuccess("Account created! Check your email to confirm, then log in."); setTab("login"); }
  };

  const handleSubmit = tab === "login" ? handleLogin : handleRegister;

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl badge-gradient flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-2xl font-display font-extrabold text-gray-900 tracking-tight">
              Shop<span className="text-indigo-600">AI</span>
            </span>
          </Link>
          <p className="text-gray-400 text-sm mt-2.5 font-medium">AI-Powered Shopping Platform</p>
        </div>

        <div className="bg-white rounded-3xl border border-indigo-100 shadow-xl p-8">
          {/* Tabs */}
          <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
            {["login", "register"].map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); setError(""); setSuccess(""); }}
                className={`flex-1 text-sm font-bold py-2 rounded-xl transition-all duration-200 capitalize ${
                  tab === t ? "bg-white text-indigo-600 shadow-md" : "text-gray-400 hover:text-gray-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs font-semibold px-4 py-2.5 rounded-xl mb-4 border border-red-100 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-50 text-green-600 text-xs font-semibold px-4 py-2.5 rounded-xl mb-4 border border-green-100 flex items-center gap-2">
              <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              {success}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1.5">Email Address</label>
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50 focus:bg-white transition-all font-medium"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-600 block mb-1.5">Password</label>
              <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-gray-50 focus:bg-white transition-all font-medium"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="mt-6 w-full btn-primary disabled:opacity-60 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg"
          >
            {loading ? (
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
            ) : null}
            {tab === "login" ? "Sign In" : "Create Account"}
          </button>

          {tab === "login" && (
            <p className="text-center text-xs text-gray-400 mt-4 font-medium">
              Forgot password? <span className="text-indigo-600 cursor-pointer hover:underline">Reset it</span>
            </p>
          )}
        </div>

        <p className="text-center text-xs text-gray-400 mt-4 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition-colors">← Back to Shop</Link>
        </p>
      </div>
    </div>
  );
}

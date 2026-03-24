import { useState } from "react";
import useAuth from "../hooks/useAuth";
import * as authApi from "../api/auth.api";
import axios from "axios";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = isRegister
        ? await authApi.register({ name, email, password })
        : await authApi.login({ email, password });

      login(res.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const err = error.response?.data;
        setError(err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl border border-gray-100 p-6 shadow-sm">
        <h1 className="text-xl font-bold text-gray-900 mb-1">
          {isRegister ? "Create Account" : "Sign up to save your notes"}
        </h1>
        <p className="text-sm text-gray-400 mb-6">
          {isRegister ? "Sign up to save your notes" : "Login to your notes"}
        </p>
        {/*   error     */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          {isRegister && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-4 p-2 text-sm focus:outline-none focus:ring-2 focus: ring-indigo-400"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 p-2 text-sm focus:outline-none focus:ring-2 focus: ring-indigo-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-4 p-2 text-sm focus:outline-none focus:ring-2 focus: ring-indigo-400"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition text-sm font-medium"
          >
            {isRegister ? "Create Account" : "Log In"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-400">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-indigo-600 font-medium hover:underline"
          >
            {isRegister ? "Log In" : "Create Account"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

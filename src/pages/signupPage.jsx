import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function SignupPage() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios
        .post(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"
          }/api/users/google`,
          {
            token: res.access_token,
          }
        )
        .then((res) => {
          if (!res.data.user) {
            toast.error(res.data.message || "Google login failed");
            return;
          }
          localStorage.setItem("token", res.data.token);
          if (res.data.user.type === "admin") {
            toast.success("Welcome Admin");
            window.location.href = "/admin";
          } else {
            toast.success("Welcome to Home Page");
            window.location.href = "/";
          }
        })
        .catch(() => {
          toast.error("Google login failed");
        });
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });

  async function onSubmit(e) {
    e.preventDefault();
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const url =
        (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000") +
        "/api/users";
      const res = await axios.post(url, {
        email,
        firstName,
        lastName,
        password,
      });
      if (res.data?.message?.toLowerCase().includes("created")) {
        toast.success("Account created. Please log in.");
        navigate("/login");
      } else {
        toast.error(res.data?.message || "Signup failed");
      }
    } catch (e) {
      toast.error(e?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-primary to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-pink-900 text-center">
          Create your account
        </h2>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm text-pink-900">First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Jane"
              />
            </div>
            <div>
              <label className="block text-sm text-pink-900">Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm text-pink-900">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-pink-900">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm text-pink-900">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-5 py-2.5 shadow-sm hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <div className="my-4 flex items-center gap-3 text-secondary text-sm">
          <div className="h-px flex-1 bg-pink-200" />
          <span>or</span>
          <div className="h-px flex-1 bg-pink-200" />
        </div>
        <button
          onClick={googleLogin}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-pink-300 bg-white text-pink-700 font-medium px-5 py-2.5 hover:bg-pink-50 transition-colors">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 48 48"
            aria-hidden="true">
            <path
              fill="#FFC107"
              d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8-6.6 0-12-5.4-12-12S17.4 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.1-.4-3.5z"
            />
            <path
              fill="#FF3D00"
              d="M6.3 14.7l6.6 4.8C14.7 16.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.1 4 9.2 8.2 6.3 14.7z"
            />
            <path
              fill="#4CAF50"
              d="M24 44c5.3 0 10.2-2 13.9-5.2l-6.4-5.2C29.2 35.2 26.7 36 24 36c-5.3 0-9.8-3.4-11.4-8l-6.6 5.1C9 39.7 15.9 44 24 44z"
            />
            <path
              fill="#1976D2"
              d="M43.6 20.5H42V20H24v8h11.3c-.9 2.6-2.7 4.8-5 6.3l6.4 5.2C38.1 36.6 40 32.6 40 28c0-1.3-.1-2.7-.4-3.5z"
            />
          </svg>
          Login with Google
        </button>
        <p className="mt-4 text-center text-sm text-secondary">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-pink-700 hover:text-pink-900 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

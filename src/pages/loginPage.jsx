import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios
        .post(
          `${
            import.meta.env.VITE_BACKEND_URL || "http://localhost:5050"
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
        .catch((err) => {
          if (err.response && err.response.status === 429) {
            toast.error(err.response.data.message);
          } else {
            toast.error("Google login request failed");
          }
        });
    },
    onError: () => {
      toast.error("Google login failed");
    },
  });

  // ✅ Email/Password Login
  function login() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (!res.data.user) {
          toast.error(res.data.message || "Login failed");
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
      .catch((err) => {
        if (err.response && err.response.status === 429) {
          toast.error(err.response.data.message);
        } else if (err.response && err.response.data?.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Login request failed.......");
        }
      });
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-primary to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl bg-white/80 ring-1 ring-black/5 shadow-xl p-6">
        <h2 className="text-2xl font-semibold text-pink-900 text-center">
          Welcome back
        </h2>
        <p className="text-center text-secondary text-sm">
          Log in to your account
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm text-pink-900">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <div>
            <label className="block text-sm text-pink-900">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 w-full rounded-lg border border-pink-200 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
          <button
            onClick={login}
            className="w-full inline-flex items-center justify-center rounded-lg bg-accent/90 text-white font-medium px-5 py-2.5 shadow-sm hover:bg-accent transition-colors">
            Login
          </button>
        </div>

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
          Don’t have an account? {""}
          <Link
            to="/signup"
            className="text-pink-700 hover:text-pink-900 font-medium">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

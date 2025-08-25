import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      axios
        .post("http://localhost:5000/api/users/google", {
          token: res.access_token,
        })
        .then((res) => {
          if (!res.data.user) {
            toast.error(res.data.message || "Google login failed");
            return;
          }

          // Save token
          localStorage.setItem("token", res.data.token);

          // Redirect based on type
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

        // Save token
        localStorage.setItem("token", res.data.token);

        // Redirect based on type
        if (res.data.user.type === "admin") {
          toast.success("Welcome Admin");
          window.location.href = "/admin";
        } else {
          toast.success("Welcome to Home Page");
          window.location.href = "/";
        }
      })
      .catch(() => {
        toast.error("Login request failed");
      });
  }

  return (
    <div className="w-full h-screen bg-red-500 flex items-center justify-center">
      <div className="w-[400px] h-[450px] bg-blue-700 flex flex-col justify-center items-center rounded-2xl shadow-lg p-6">
        <img src="/logo.jpg" className="rounded-full w-[100px] mb-4" />

        <span className="text-white">Email</span>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="rounded px-2 py-1 mb-2 w-3/4"
        />

        <span className="text-white">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="rounded px-2 py-1 mb-3 w-3/4"
        />

        <button
          className="bg-yellow-400 px-4 py-2 rounded mb-3 w-3/4"
          onClick={login}>
          Login
        </button>

        <button
          onClick={googleLogin}
          className="bg-white rounded px-3 py-2 w-3/4">
          Login with Google
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("Your Email");
  const [password, setPassword] = useState("");

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      console.log(res);
      axios
        .post("http://localhost:5000/api/users/google", {
          token: res.access_token,
        })
        .then((res) => {
          if (res.data.message == "User created") {
            toast.success(
              "your account is created. now you can login via google"
            );
          } else {
            localStorage.setItem("token", res.data.token);
            if (res.data.user.type == "admin") {
              window.location.href = "/admin";
              toast.success("Welcome Admin");
            } else {
              window.location.href = "/";
              toast.success("Welcome!");
            }
          }
        });
    },
  });

  function login() {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.user == null) {
          toast.error(res.data.message);
          return;
        }

        //save user's token in local storage(browser memory)
        localStorage.setItem("token", res.data.token);
        if (res.data.user.type == "admin") {
          toast.success("Welcome Admin");
          window.location.href = "/admin";
        } else {
          window.location.href = "/";
          toast.success("Welcome to Home Page");
        }
      });
  }

  return (
    <div className="w-full h-screen bg-red-500 flex items-center justify-center ">
      <div className="w-[400px] h-[400px] bg-blue-700 flex flex-col justify-center items-center">
        <img src="/logo.jpg" className="rounded-full w-[100px] " />
        <span>Email</span>
        <input
          defaultValue={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <span>Password</span>
        <input
          type="password"
          defaultValue={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="bg-yellow-400" onClick={login}>
          Login
        </button>

        <button
          onClick={googleLogin}
          className="bg-white mt-3 rounded px-3 py-1">
          Login with Google
        </button>
      </div>
    </div>
  );
}

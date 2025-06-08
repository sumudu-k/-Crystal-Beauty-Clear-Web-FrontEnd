import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function LoginPage() {
  const [email, setEmail] = useState("Your Email");
  const [password, setPassword] = useState("");

  console.log(import.meta.env.VITE_BACKEND_URL);
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
      </div>
    </div>
  );
}

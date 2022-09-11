//import axios, { Axios } from "axios";
import React, { useEffect } from "react";
import Axios from "axios";
import "./login.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "./formValidation";
import { useNavigate } from "react-router-dom";

Axios.defaults.withCredentials = true;

function LogIn() {
  let navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitInfo = (data) => {
    Axios.post("http://localhost:8080/api/login", {
      email: data.email,
      password: data.password,
    }).then((response) => {
      navigate("/admin");
      console.log(response.data);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:8080/api/login").then((response) => {
      //
      if (response.data.login) {
        console.log(response.data.login);
        console.log("CODE 1 RAN");
        navigate("/admin");
      }
      // console.log(isAuth);
    });
  }, []);

  return (
    <div id="login">
      <form onSubmit={handleSubmit(submitInfo)} className="login-container">
        <p>Login</p>

        <input placeholder="Enter Email" {...register("email")} />
        {errors.email && <p>Enter a valid email</p>}

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p>Password not valid</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LogIn;

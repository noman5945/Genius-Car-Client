import React, { useContext, useState } from "react";
import img from "../../assets/images/login/login.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { context } from "../../Context/AuthProvider/AuthProvider";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const { login, setLoader } = useContext(context);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [eye, setEye] = useState(true);
  const [textType, setTexttype] = useState("password");

  const handleEyeClick = () => {
    if (eye) {
      setEye(false);
      setTexttype("text");
    } else {
      setEye(true);
      setTexttype("password");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const pass = form.pass.value;
    login(email, pass)
      .then((result) => {
        console.log(result.user);
        const user = result.user;
        fetch(`http://localhost:50000/jwt`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((result) => result.json())
          .then((data) => {
            //storing the token at local storage
            console.log(data);
            localStorage.setItem("acces-token", data.token);
          })
          .catch((error) => console.log(error));

        setLoader(true);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
    form.reset();
  };
  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid gap-20 grid-cols-2 flex-col lg:flex-row">
        <div className="w-3/4">
          <img src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
          <form onSubmit={handleSubmit}>
            <div className="card-body">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                />
              </div>
              <div className="form-control">
                <div className="flex justify-between">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  {eye ? (
                    <EyeIcon
                      onClick={handleEyeClick}
                      className="h-6 w-6 text-blue-500 cursor-pointer"
                    ></EyeIcon>
                  ) : (
                    <EyeSlashIcon
                      onClick={handleEyeClick}
                      className="h-6 w-6 text-blue-500 cursor-pointer"
                    ></EyeSlashIcon>
                  )}
                </div>
                <input
                  type={textType}
                  placeholder="password"
                  className="input input-bordered"
                  name="pass"
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </div>
          </form>
          <p className="text-center">
            Create new account{" "}
            <Link className="text-orange-600 font-bold" to="/signup">
              {" "}
              Sign Up
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

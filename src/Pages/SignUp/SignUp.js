import React, { useContext } from "react";
import { Link } from "react-router-dom";
import img from "../../assets/images/login/login.svg";
import { context } from "../../Context/AuthProvider/AuthProvider";

const SignUp = () => {
  const { createUser } = useContext(context);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const pass = form.pass.value;
    createUser(email, pass);
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
              <h1 className="text-5xl font-bold">Sign Up</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="pass"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  name="cpass"
                />
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </div>
          </form>
          <p className="text-center">
            Go to{" "}
            <Link className="text-orange-600 font-bold" to="/login">
              {" "}
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

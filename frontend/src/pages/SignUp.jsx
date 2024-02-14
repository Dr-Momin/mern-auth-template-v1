import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data || data.success === false) {
        setError(true);
        return;
      }

      console.log(data);
    } catch (e) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className={"mx-auto max-w-lg"}>
      <h1 className="text-3xl text-center font-semibold my-7 ">Signup</h1>

      <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
        <input
          type="text"
          placeholder={"Username"}
          id={"username"}
          name={"username"}
          className={"bg-slate-100 p-3 rounded-lg"}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder={"Email"}
          id={"email"}
          name={"email"}
          className={"bg-slate-100 p-3 rounded-lg"}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder={"Password"}
          id={"password"}
          name={"password"}
          className={"bg-slate-100 p-3 rounded-lg"}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className={
            "bg-slate-700 text-white p-3 rounded-xl uppercase hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          }
        >
          {loading ? "Loading..." : "Success"}
        </button>
      </form>

      <div className="flex gap-2 mt-5">
        <p>Have an account</p>
        <Link to={"/sign-in"}>
          <span className={"text-blue-500"}>Sign In</span>
        </Link>
      </div>

      <p className={"mt-4 text-red-700"}>{error && "Something went wrong"}</p>
    </div>
  );
};
export default SignUp;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInUser, userReducer } from "../store/userSlice.js";
import OAuth from "../components/OAuth.jsx";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector(userReducer);
  const [formData, setFormData] = useState({});

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
      const user = await dispatch(signInUser(formData));

      console.log(user);
      if (user.error) return;

      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className={"mx-auto max-w-lg"}>
      <h1 className="text-3xl text-center font-semibold my-7 ">SignIn</h1>

      <form onSubmit={handleSubmit} className={"flex flex-col gap-4"}>
        <input
          type="text"
          placeholder={"Email"}
          id={"email"}
          name={"email"}
          className={"bg-slate-100 p-3 rounded-lg"}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder={"Password"}
          id={"password"}
          name={"password"}
          className={"bg-slate-100 p-3 rounded-lg"}
          onChange={handleChange}
        />
        <button
          type={"submit"}
          disabled={loading}
          className={
            "bg-slate-700 text-white p-3 rounded-xl uppercase hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          }
        >
          {loading ? "Loading..." : "Sign In With Email"}
        </button>
      </form>

      <OAuth />

      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an Account? </p>
        <Link to={"/sign-up"}>
          <span className={"text-blue-500"}>Sign Up</span>
        </Link>
      </div>

      <p className={"mt-4 text-red-700"}>
        {error && (error.message || "Something Went Wrong.")}
      </p>
    </div>
  );
};
export default SignIn;

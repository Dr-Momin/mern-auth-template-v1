import React from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className={"bg-slate-200 text-xl"}>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3 px-12">
        <Link to={"/"}>
          <h1 className={"font-bold"}>Auth App</h1>
        </Link>
        <ul className={"flex gap-6"}>
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/about"}>About</NavLink>
          </li>
          <li>
            <NavLink to={"/sign-in"}>SingIn</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Header;

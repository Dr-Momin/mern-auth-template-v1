import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOut, userReducer } from "../store/userSlice.js";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(userReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
    navigate("/");
  };

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

          {currentUser && (
            <div className={"flex gap-4"}>
              <img
                src={currentUser?.profilePicture}
                alt="profile"
                className={"h-8 w-8 rounded-full object-cover  "}
              />

              <button
                onClick={handleLogout}
                className={"bg-red-700 px-3 py-1 rounded-lg"}
              >
                SignOut
              </button>
            </div>
          )}

          {!currentUser && (
            <li>
              <NavLink to={"/sign-in"}>SignIn</NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
export default Header;

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authService } from "../firebase/auth.service.js";
import { signInWithGoogle } from "../store/userSlice.js";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const result = await authService.loginWithGoogle();
      dispatch(
        signInWithGoogle({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      );

      navigate("/");
    } catch (e) {
      console.log("Error Google login: ", e.message);
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-4">
      <button
        onClick={handleGoogleLogin}
        className={
          "bg-red-700 text-white p-3 rounded-xl uppercase hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
        }
      >
        Continue with Google
      </button>
    </div>
  );
};
export default OAuth;

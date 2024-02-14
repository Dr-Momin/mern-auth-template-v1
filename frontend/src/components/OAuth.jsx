import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebase } from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInWithGoogle } from "../store/userSlice.js";
import { useNavigate } from "react-router-dom";
const OAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(firebase);

      const result = await signInWithPopup(auth, provider);
      await dispatch(
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

import { firebaseConfig } from "./config.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";

class AuthService {
  provider = null;
  firebase = null;
  auth = null;

  constructor() {
    this.provider = new GoogleAuthProvider();
    this.firebase = initializeApp(firebaseConfig);
    this.auth = getAuth(this.firebase);
  }

  async loginWithGoogle() {
    // eslint-disable-next-line no-useless-catch
    try {
      const result = await signInWithPopup(this.auth, this.provider);

      if (!result) return;

      return result;
    } catch (error) {
      throw error;
    }
  }
}

const authService = new AuthService();

export { authService };

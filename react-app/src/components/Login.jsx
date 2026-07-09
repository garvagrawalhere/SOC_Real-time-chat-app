import { auth } from "../firebase";
import { db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import "./Login.css";

function Login() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Save user to Firestore
    await setDoc(
      doc(db, "users", user.uid),
      {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        lastSeen: serverTimestamp(),
      },
      { merge: true },
    );
  };
  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to my Chat App!</h1>
        <p>To begin, login with Google</p>
        <button onClick={handleLogin} className="google-btn">
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="google-icon"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;

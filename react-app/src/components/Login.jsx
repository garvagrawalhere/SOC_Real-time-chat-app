import { auth } from "../firebase";
import { db } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

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
    <div>
      <h1>Login</h1>

      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}

export default Login;

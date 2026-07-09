import { auth } from "../firebase";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
function Login() {
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };
  return (
    <div>
      <h1>Login</h1>

      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}

export default Login;

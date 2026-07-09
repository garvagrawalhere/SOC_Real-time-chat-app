import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import { rtdb } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, set, onDisconnect } from "firebase/database";
import { serverTimestamp } from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        // Set user status to "online"
        const statusRef = ref(rtdb, `status/${currentUser.uid}`);
        await set(statusRef, "online");

        // Auto set to "offline" when disconnected
        onDisconnect(statusRef).set("offline");

        // Also update lastSeen in Firestore on disconnect
        onDisconnect(statusRef).update({
          offline: serverTimestamp(),
        });
      }
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

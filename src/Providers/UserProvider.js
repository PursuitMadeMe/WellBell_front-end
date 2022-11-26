import React, { useEffect, useState, createContext } from "react";
import { auth } from "../Firebase/firebase";

// create context and initialize with null
export const UserContext = createContext(null);

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, displayName, photoURL, uid } = user;
        setUser({ email, displayName, photoURL, uid });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      <div>{props.children}</div>
    </UserContext.Provider>
  );
};

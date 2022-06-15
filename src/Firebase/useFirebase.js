import {
  createUserWithEmailAndPassword, getAuth, getIdToken, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile
} from "firebase/auth";
import { useEffect, useState } from "react";
import initializeFirebase from "./FirebaseInit";
  // initialize Firebase app
  initializeFirebase();
  
  const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIstLoading] = useState(true);
    const [authError, setError] = useState("");
  
    const auth = getAuth(); 
  
    const registerUser = ( password, name, username, email, photo, navigate) => { 
      console.log(password)
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Error Handel
          setError("");
          // name update
          const newUser = { email, displayName: name,photo,username,navigate};
          setUser(newUser);
          // save User to the database  
          saveUser(email, name,photo, username, 'POST');
          // name with Firebase
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {})
            .catch((error) => {});
          // Login return to the Private Page
          navigate("/");
        })
        .catch((error) => {
          // ..
        });
    };
  
    const loginUser = (email, password, location, navigate) => {
      // Loading
      setIstLoading(true);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Login return to the Private Page
          const destination = location?.state?.from || "/";
          navigate(destination);
          // name with Firebase
  
          // error handel
          setError("");
        })
        .catch((error) => {
          // error handel
          setError(error.message);
        })
        // Loading
        .finally(() => setIstLoading(false));
    };
  
  
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          getIdToken(user)
          .then((idToken) => localStorage.setItem('idToken', idToken))
          setUser(user);
        } else {
          setUser({});
        }
        // Loading
        setIstLoading(false);
      });
      return () => unsubscribe;
    }, []);
  
    const logOut = () => {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
        })
        .catch((error) => {
          // An error happened.
        })
        // Loading
        .finally(() => setIstLoading(false));
    };
  
    // save User to the database
    const saveUser = (email, displayName, photo, username, method) => {
      const user = { email, displayName, username, photo};
      fetch("http://localhost:4000/api/v1/users", {
        method: method,
        headers: {
          "content-type": "application/json",
          "authorization": localStorage.getItem('idToken')
        },
        body: JSON.stringify(user),
      }).then();
    };
 
    return {
      user,
      registerUser,
      loginUser,
      logOut,
      isLoading,
      authError, 
    };
  };
  
  export default useFirebase;
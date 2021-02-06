import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import configFire from "../../firebase";
import Login from "../../components/ui/Login";
import "firebase/auth";

const LoginScreen = () => {
  let nagivation = useNavigate();
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState("");
  const handleLogin = async () => {
    try {
      const response = await configFire.db.app
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (response.user) {
        setUser(response.user.toJSON());
        nagivation("/ordenes");
      } else {
        console.log("error");
      }
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPasswordError(err.message);
          break;
        default:
          setEmailError("Something went wrong!");
      }
    }
  };
  const handleSignUp = () => {
    configFire.db.app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/email-already-use":
          case "auth/invalid-email":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            setEmailError("Something went wrong!");
        }
      });
  };

  const authListener = () => {
    configFire.db.app.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, [user]);

  return (
    <Login
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleLogin={handleLogin}
      handleSignUp={handleSignUp}
      hasAccount={hasAccount}
      setHasAccount={setHasAccount}
      emailError={emailError}
      passwordError={passwordError}
      user={user}
    />
  );
};

export default LoginScreen;

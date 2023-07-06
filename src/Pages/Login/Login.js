import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { login } from "../../features/userSlice";
import { auth, provider } from "../../firebase";
import { useDispatch } from "react-redux";

function Login() {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://th.bing.com/th/id/R.54f571f266040b629a344258409927bd?rik=yV8R1YhduJ3vwg&pid=ImgRaw&r=0"
          alt=""
        />

        <Button variant="contained" color="primary" onClick={signIn}>
          Login
        </Button>
      </div>
    </div>
  );
}

export default Login;

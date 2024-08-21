import React, { useState } from "react";
import userService from "../../../services/userService";
import styles from "../../layout/LoginLayout/LoginPageUI.module.css";

const LoginPageUI = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Email and Password are required.");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
    } else {
      setError("");
      try {
        console.log(email, password);
        await userService.loginUser({email, password});
        window.location.href = "/";
      } catch (err) {
        setError("Invalid email or password.");
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.h2}>Login</h2>
        {error && <div className={styles.errorMessage}>{error}</div>}
        <div className={styles["input-container"]}>
          <label className={styles.label} htmlFor="email">
            Email:
          </label>
          <input
            className={`${styles.input} ${error ? styles["input-error"] : ""}`}
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles["input-container"]}>
          <label className={styles.label} htmlFor="password">
            Password:
          </label>
          <input
            className={`${styles.input} ${error ? styles["input-error"] : ""}`}
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles["button-container"]}>
          <button className={styles["button-login"]} type="submit">
            Login
          </button>
          <div className={styles["split-line"]}>
            <div className={styles["line-half"]}></div>
            <div className={styles["text"]}>Don't have an account?</div>
            <div className={styles["line-half"]}></div>
          </div>
          <button className={styles["button-signup"]} type="button" onClick={() => window.location.href = "/register"}>
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPageUI;

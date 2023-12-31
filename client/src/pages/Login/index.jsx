import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

// Styles
import styles from "./styles.module.scss";

// Helpers
import isJwt from "../../helpers/isJwt";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("__intranet_token");

  useEffect(() => {
    if (token) {
      if (isJwt(token)) {
        navigate('/');
      }
    }
  }, [navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": '*',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(response => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("__intranet_token", data.token)
          navigate('/');
        } else {
          toast.error(data.message, { style: { background: '#18191b' } });
        }
      })
      .catch((error) => {
        console.error(error)
      }
      );
  }

  return (
    <div className={styles.__login}>
      <form className={styles.__form} onSubmit={(e) => handleSubmit(e)}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email address"
          type="email"
          name="email"
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          name="password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;

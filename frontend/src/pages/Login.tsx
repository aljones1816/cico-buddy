import { useEffect, useState } from "react";
import { useLogin } from "../api/hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { handleLogin, error } = useLogin();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleLogin(email, password);
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        {error && <p>{error}</p>}
      </form>
      <div>
        <p>
          New user? <Link to="/signup">Sign up</Link>!
        </p>
      </div>
    </>
  );
};

export default Login;

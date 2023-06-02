import { useState } from "react";
import { useSignup } from "../api/hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoading, handleSignup, error } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await handleSignup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>Signup</h1>
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
      <button type="submit" disabled={isLoading}>
        Signup
      </button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;

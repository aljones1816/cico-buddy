import { Link } from "react-router-dom";
import { useLogout } from "../api/hooks/useLogout";
import { useAuth } from "../api/hooks/useAuthContext";

const Navbar = () => {
  const { handleLogout } = useLogout();
  const { user } = useAuth();
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Cico Buddy</h1>
        </Link>
        <nav>
          {user && (
            <div>
              <p>{user.email}</p>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

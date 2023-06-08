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
              <Link to="/profile">Profile</Link>
              <button onClick={handleLogout}>Log out</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1>Cico Buddy</h1>
        </Link>
        <nav>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

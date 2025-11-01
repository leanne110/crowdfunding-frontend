import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";

function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };

  return (
    <div>
      <nav style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "20px",
        padding: "15px 30px",
        backgroundColor: "#f8f8f8",
        borderBottom: "1px solid #ddd",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}>
        <Link to="/">Home</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {!auth.token && <Link to="/users">Sign Up</Link>}
        <Link to="/newfundraiser">New Fundraiser</Link>
        {/* <Link to="/about">About</Link> */}
        <Link to="/contact"> Contact</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
import { Link, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("id");
    setAuth({ token: null });
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#333",
    fontWeight: 500,
    fontSize: "1rem",
    padding: "8px 14px",
    borderRadius: "6px",
    transition: "background-color 0.2s ease",
  };

  const linkHoverStyle = {
    ...linkStyle,
    backgroundColor: "#f0f0f0",
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "12px 40px",
          backgroundColor: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
          height: "80px",
          fontFamily: "'Segoe UI', Roboto, sans-serif",
        }}
      >
        {/* Left: Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="/treasure_bowl.png"
            alt="Treasure Bowl Logo"
            style={{
              height: "75px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Right: Links */}
        <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Link to="/" style={isActive("/") ? linkHoverStyle : linkStyle}>Home</Link>

          {auth.token ? (
            <Link to="/" onClick={handleLogout} style={linkStyle}>
              Log Out
            </Link>
          ) : (
            <Link to="/login" style={isActive("/login") ? linkHoverStyle : linkStyle}>
              Login
            </Link>
          )}

          {!auth.token && (
            <Link to="/users" style={isActive("/users") ? linkHoverStyle : linkStyle}>
              Sign Up
            </Link>
          )}

          <Link to="/newfundraiser" style={isActive("/newfundraiser") ? linkHoverStyle : linkStyle}>
            + New
          </Link>
          <Link to="/about" style={isActive("/about") ? linkHoverStyle : linkStyle}>About</Link>
          <Link to="/contact" style={isActive("/contact") ? linkHoverStyle : linkStyle}>Contact</Link>
        </div>
      </nav>

      <Outlet />
    </div>
  );
}

export default NavBar;

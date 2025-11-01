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
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 30px",
        backgroundColor: "#f8f8f8",
        borderBottom: "1px solid #ddd",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        marginBottom: "20px",
        height: "90px",
        boxSizing: "border-box"
      }}>

        <div style={{ display: "flex", alignItems: "center" }}>
          <Link to="/" style={{ textDecoration: "none", fontWeight: "bold" }}>
            <img
              src="/treasure_bowl.png"
              alt="Logo"
              style={{
                height: "90px",
                maxHeight: "90px",
                objectFit: "contain",
                display: "block",
                marginLeft: "20px"
              }}
            />
          </Link>
        </div>


        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
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
          <Link to="/contact">Contact</Link>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;

import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");

    window.location = "/";
  };

  const linkStyle = (path) => {
    return location.pathname === path
      ? "bg-green-500 text-white px-4 py-2 rounded-lg shadow"
      : "text-gray-200 hover:bg-gray-700 hover:text-white px-4 py-2 rounded-lg transition duration-300";
  };

  return (
    <nav className="bg-gray-900 shadow-lg px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-2xl font-bold text-green-400 tracking-wide">
        Stock Manager
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard" className={linkStyle("/dashboard")}>
          Dashboard
        </Link>

        <Link to="/products" className={linkStyle("/products")}>
          Products
        </Link>

        <Link to="/stockin" className={linkStyle("/stockin")}>
          Stock In
        </Link>

        <Link to="/stockout" className={linkStyle("/stockout")}>
          Stock Out
        </Link>

        <Link to="/reports" className={linkStyle("/reports")}>
          Reports
        </Link>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md transition duration-300"
      >
        Logout
      </button>
    </nav>
  );
}

export default Navbar;

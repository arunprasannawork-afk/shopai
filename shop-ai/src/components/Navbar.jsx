import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import { logout } from "../services/authService";

export default function Navbar() {
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { to: "/", label: "Home", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )},
    { to: "/products", label: "Products", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    )},
    { to: "/orders", label: "Orders", icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    )},
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-indigo-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-xl badge-gradient flex items-center justify-center shadow-md">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <span className="text-[1.1rem] font-bold text-gray-900 font-display tracking-tight">
            Shop<span className="text-indigo-600">AI</span>
          </span>
        </Link>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-1 bg-gray-50 border border-gray-100 rounded-full px-2 py-1.5 shadow-inner">
          {navLinks.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200"
                    : "text-gray-500 hover:text-indigo-600 hover:bg-indigo-50"
                }`}
              >
                {icon}
                {label}
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="relative flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
          >
            <svg className="w-4 h-4" fill={wishlist.length > 0 ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            Wishlist
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-3.5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 badge-gradient text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                {user.email?.[0]?.toUpperCase()}
              </div>
              <button onClick={logout} className="text-xs text-gray-400 hover:text-red-500 transition-colors font-medium">Logout</button>
            </div>
          ) : (
            <Link
              to="/login"
              className="btn-primary text-white text-sm font-semibold px-4 py-2 rounded-full shadow-sm"
            >
              Login
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100" onClick={() => setMenuOpen(!menuOpen)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-5 py-3 flex flex-col gap-1">
          {navLinks.map(({ to, label, icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                location.pathname === to ? "bg-indigo-50 text-indigo-600" : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {icon}{label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}

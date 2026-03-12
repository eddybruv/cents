import React from "react";
import PropTypes from "prop-types";
import logo from "../assets/logo.png";
import { useLocation, Link } from "react-router-dom";
import SettingsDropdown from "./SettingsDropdown";
import { useAuth } from "../hooks/useAuthContext";
import Avatar from "./Avatar";
import NavLink from "./NavLink";

const NavBar = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <nav className="bg-(--color-bg)/80 backdrop-blur-xl sticky top-0 z-50 border-b border-(--color-border)">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="logo" className="w-auto h-5" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline gap-0.5">
              <NavLink to="/dashboard" label="Dashboard" active={pathname.startsWith("/dashboard")} />
              <NavLink to="/transactions" label="Transactions" active={pathname.startsWith("/transactions")} />
              <NavLink to="/accounts" label="Accounts" active={pathname.startsWith("/accounts")} />
              <NavLink to="/saving-goals" label="Goals" active={pathname.startsWith("/saving-goals")} />
            </div>
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-2">
            <SettingsDropdown />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-(--color-muted) hover:text-(--color-fg) p-2 rounded-lg transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-(--color-border) bg-(--color-bg)/95 backdrop-blur-xl">
          <div className="px-3 pt-3 pb-4 space-y-0.5">
            {[
              ["/dashboard", "Dashboard"],
              ["/transactions", "Transactions"],
              ["/accounts", "Accounts"],
              ["/saving-goals", "Goals"],
            ].map(([to, label]) => (
              <Link
                key={to}
                to={to}
                className={`block px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  pathname.startsWith(to)
                    ? "text-(--color-fg) bg-(--color-accent-muted)"
                    : "text-(--color-muted) hover:bg-(--color-surface)"
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="px-3 pt-3">
              <SettingsDropdown />
            </div>
          </div>
          <div className="py-4 border-t border-(--color-border)">
            <div className="flex items-center px-5 gap-3">
              <Avatar
                src={user?.avatarUrl}
                name={user?.fullName || user?.email || "User"}
                size="md"
                alt="Profile"
              />
              <div className="min-w-0">
                <div className="text-sm font-medium text-(--color-fg) truncate">
                  {user?.fullName || user?.email?.split("@")[0] || "User"}
                </div>
                <div className="text-xs text-(--color-muted) truncate">
                  {user?.email || ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

NavBar.propTypes = {
  toggleMobileMenu: PropTypes.func.isRequired,
  isMobileMenuOpen: PropTypes.bool.isRequired,
};

export default NavBar;

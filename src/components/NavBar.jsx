import React from "react";
import logo from "../assets/logo.png";
import { useLocation, Link } from "react-router-dom";
import SettingsDropdown from "./SettingsDropdown";
import { useAuth } from "../hooks/useAuthContext";
import Avatar from "./Avatar";

const NavBar = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <nav className="bg-(--color-bg) sticky top-0 z-50 border-b border-(--color-border)">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="logo" className="w-auto h-6" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-1">
              <Link
                to="/dashboard"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${pathname.startsWith("/dashboard") ? "text-(--color-fg)" : "text-(--color-muted) hover:text-(--color-accent)"}`}
              >
                Dashboard
              </Link>
              <Link
                to="/transactions"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${pathname.startsWith("/transactions") ? "text-(--color-fg)" : "text-(--color-muted) hover:text-(--color-accent)"}`}
              >
                Transactions
              </Link>
              <Link
                to="/budget"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${pathname.startsWith("/budget") ? "text-(--color-fg)" : "text-(--color-muted) hover:text-(--color-accent)"}`}
              >
                Budget
              </Link>
              <Link
                to="/accounts"
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${pathname.startsWith("/accounts") ? "text-(--color-fg)" : "text-(--color-muted) hover:text-(--color-accent)"}`}
              >
                Accounts
              </Link>
              <a
                href="/saving-goals"
                className="text-(--color-muted) hover:text-(--color-accent) px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Saving Goals
              </a>
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
              className="text-(--color-muted) hover:text-(--color-fg) p-2 rounded-md transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
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
        <div className="md:hidden border-t border-(--color-border)">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-(--color-bg)">
            <Link
              to="/dashboard"
              className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${pathname.startsWith("/dashboard") ? "text-(--color-fg)" : "text-(--color-muted) hover:bg-(--color-surface)"}`}
            >
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${pathname.startsWith("/transactions") ? "text-(--color-fg)" : "text-(--color-muted) hover:bg-(--color-surface)"}`}
            >
              Transactions
            </Link>
            <Link
              to="/budget"
              className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${pathname.startsWith("/budget") ? "text-(--color-fg)" : "text-(--color-muted) hover:bg-(--color-surface)"}`}
            >
              Budget
            </Link>
            <Link
              to="/accounts"
              className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${pathname.startsWith("/accounts") ? "text-(--color-fg)" : "text-(--color-muted) hover:bg-(--color-surface)"}`}
            >
              Accounts
            </Link>
            <a
              href="/about"
              className="text-(--color-muted) block px-3 py-2 text-base font-medium hover:bg-(--color-surface) rounded-md transition-colors duration-200"
            >
              About
            </a>
            <div className="px-3 pt-2 flex gap-2">
              <SettingsDropdown />
            </div>
          </div>
          <div className="pt-4 pb-3 border-t border-(--color-border)">
            <div className="flex items-center px-5">
              <Avatar
                src={user?.avatarUrl}
                name={user?.fullName || user?.email || "User"}
                size="md"
                alt="Profile"
              />
              <div className="ml-3">
                <div className="text-base font-medium text-(--color-fg)">
                  {user?.fullName || user?.email?.split("@")[0] || "User"}
                </div>
                <div className="text-sm font-medium text-(--color-muted)">
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

export default NavBar;

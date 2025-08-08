import React from "react";
import logo from "../assets/logo.png";
import CustomSelect from "./CustomSelect";

const NavBar = ({ toggleMobileMenu, isMobileMenuOpen }) => {
  return (
    <nav className="bg-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <img src={logo} alt="logo" className="w-auto h-6" />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-1">
              <a
                href="/"
                className="text-white hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Dashboard
              </a>
              <a
                href="/transactions"
                className="text-gray-300 hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Transactions
              </a>
              <a
                href="/budget"
                className="text-gray-300 hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Budget
              </a>
              <a
                href="/saving-goals"
                className="text-gray-300 hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Saving Goals
              </a>
              <a
                href="/cards"
                className="text-gray-300 hover:text-green-200 px-3 py-2 text-sm font-medium transition-colors duration-200"
              >
                Cards
              </a>
            </div>
          </div>

          {/* Desktop Right Side */}
          <CustomSelect />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white p-2 rounded-md transition-colors duration-200"
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
        <div className="md:hidden border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800">
            <a
              href="/"
              className="text-white block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              Home
            </a>
            <a
              href="/dashboard"
              className="text-gray-300 block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              Dashboard
            </a>
            <a
              href="/products"
              className="text-gray-300 block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              Products
            </a>
            <a
              href="/about"
              className="text-gray-300 block px-3 py-2 text-base font-medium hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              About
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-700">
            <div className="flex items-center px-5">
              <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-gray-200 font-medium">U</span>
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-gray-200">
                  User Name
                </div>
                <div className="text-sm font-medium text-gray-400">
                  user@example.com
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

import React, { useState } from "react";
import CustomSelect from "../components/CustomSelect";
import NavBar from "../components/NavBar";
const BaseLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-black">
      {/* Navigation Bar */}
      <NavBar
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />

      {/* Main Content */}
      <main className="max-w-7xl w-full mx-auto px-4 pt-10 sm:px-6 lg:px-8 min-h-full">
        {children}
      </main>
    </div>
  );
};

export default BaseLayout;

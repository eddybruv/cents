import React, { useState } from "react";
import PropTypes from "prop-types";
import NavBar from "../components/NavBar";

const BaseLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-(--color-bg) text-(--color-fg) mesh-bg">
      <NavBar
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
      />
      <main className="max-w-6xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 min-h-full">
        {children}
      </main>
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BaseLayout;

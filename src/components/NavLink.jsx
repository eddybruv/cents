import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const NavLink = ({ to, label, active }) => (
  <Link
    to={to}
    className={`relative px-3 py-2 text-[13px] font-medium transition-colors duration-200 ${
      active
        ? "text-(--color-fg) nav-active"
        : "text-(--color-muted) hover:text-(--color-fg)"
    }`}
  >
    {label}
  </Link>
);

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool,
};

export default NavLink;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "../hooks/useAuthContext";
import Avatar from "./Avatar";

const ActionBar = ({ page }) => {
  const { user } = useAuth();

  // Get first name from full name or use email prefix
  const getFirstName = () => {
    if (user?.fullName) {
      return user.fullName.split(" ")[0];
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <div className="flex w-full justify-between items-center mb-4 flex-wrap gap-3">
      <div className="flex w-fit items-center gap-2">
        <Avatar
          src={user?.avatarUrl}
          name={user?.fullName || user?.email || "User"}
          size="md"
          alt="Profile"
        />
        {/* greeting / user name */}
        <div className="flex flex-col">
          <span className="text-(--color-muted) text-xs font-extralight">
            {getGreeting()}
          </span>
          <span className="text-(--color-fg) text-md font-semibold">
            {getFirstName()}
          </span>
        </div>
      </div>

      <div className="flex gap-2 sm:gap-3">
        {page === "dashboard" && (
          <button className="btn-secondary">
            <FontAwesomeIcon icon={faLink} />
            <span className="hidden sm:inline truncate">Link Account</span>
          </button>
        )}
        <button className="btn-secondary">
          <FontAwesomeIcon icon={faPlus} />
          <span className="hidden sm:inline truncate">Transaction</span>
        </button>
      </div>
    </div>
  );
};

export default ActionBar;

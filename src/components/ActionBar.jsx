import React from "react";
import profilePhoto from "../assets/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink, faPlus } from "@fortawesome/free-solid-svg-icons";

const ActionBar = ({ page }) => {
  return (
    <div className="flex w-full justify-between items-center mb-4">
      <div className="flex w-fit items-center gap-2">
        <div>
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-10 h-10 rounded-full "
          />
        </div>
        {/* greeting / user name */}
        <div className="flex flex-col">
          <span className="text-(--color-muted) text-xs font-extralight">
            Good morning
          </span>
          <span className="text-(--color-fg) text-md font-semibold">
            Bimela
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        {page === "dashboard" && (
          <button className="btn-secondary">
            <FontAwesomeIcon icon={faLink} />
            <span className="truncate">Link Bank Account</span>
          </button>
        )}
        <button className="btn-secondary">
          <FontAwesomeIcon icon={faPlus} />
          <span className="truncate">Transaction</span>
        </button>
      </div>
    </div>
  );
};

export default ActionBar;

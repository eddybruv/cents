import React from "react";
import profilePhoto from "../assets/profile.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faPlus } from "@fortawesome/free-solid-svg-icons";

const ActionBar = ({ page }) => {
  return (
    <div className="flex w-full justify-between items-center">
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
          <span className="text-white text-xs font-extralight">
            Good morning
          </span>
          <span className="text-white text-md font-semibold">Bimela</span>
        </div>
      </div>
      {/* buttons */}
      <div className="flex align-center gap-2">
        {/* custom month picker */}
        <div className="relative inline-block">
          <button className="btn-secondary">
            <FontAwesomeIcon icon={faCalendarDays} />
            <span className="truncate">Select Date</span>
          </button>
        </div>
        <button className="btn-secondary">
          <FontAwesomeIcon icon={faPlus} />
          <span className="truncate">Transaction</span>
        </button>
        {/* Dropdown Menu */}
      </div>
    </div>
  );
};

export default ActionBar;

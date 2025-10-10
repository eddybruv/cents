import {
  faAngleLeft,
  faAngleRight,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import masterCardLogo from "../../assets/mastercard-logo.png";
import ccChip from "../../assets/cc-chip.png";

const CardBackground = ({ className = "", children }) => {
  return (
    <div
      className={`flex justify-center items-center relative rounded-sm ${className}`}
    >
      <div className={"w-10 h-24 rounded-full bg-(--color-accent)"}></div>
      <div className="absolute inset-0 glass rounded-sm">{children}</div>
    </div>
  );
};

export const CardSummary = ({ className = "" }) => {
  const [cards] = React.useState([
    { id: 1, title: "Card 1" },
    { id: 2, title: "Card 2" },
    { id: 3, title: "Card 3" },
  ]);
  const [activeCard] = React.useState(cards[0]);

  return (
    <CardBackground className={className}>
      <div className="flex flex-col p-4 h-full gap-4">
        <div className="flex justify-between items-center">
          <p className="text-2xl ">Card Summary</p>
          <button>
            <FontAwesomeIcon icon={faEllipsisVertical} />
          </button>
        </div>
        {/* card carousel box */}
        <div className="flex flex-col justify-center h-1/2 gap-2">
          <div className="flex justify-center items-center h-full">
            {/* button left */}
            <div className="h-12 w-12 rounded-full bg-(--color-surface) mr-[-16px] z-10">
              <button className="w-full h-full flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faAngleLeft}
                  className="text-2xl text-lime-900"
                />
              </button>
            </div>
            <div className="flex flex-col justify-between flex-1 h-full rounded-3xl bg-purple-400 p-4 px-2">
              <div className="flex justify-between items-center">
                <img src={ccChip} className="w-auto h-12 object-cover" />
                <img
                  src={masterCardLogo}
                  alt="MasterCard Logo"
                  className="w-auto h-12 object-cover"
                />
              </div>
              <p className="text-xl font-light px-3">**** **** **** 1234</p>
              <div className="flex justify-between items-end px-3">
                <p>Bimela</p>
                <div className="flex flex-col items-center">
                  <p className="text-xs text-secondary">Expiry Date</p>
                  <p>12/27</p>
                </div>
              </div>
            </div>
            {/* button right */}
            <div className="h-12 w-12 rounded-full bg-(--color-surface) ml-[-16px] z-10">
              <button className="w-full h-full flex justify-center items-center">
                <FontAwesomeIcon
                  icon={faAngleRight}
                  className="text-2xl text-lime-900"
                />
              </button>
            </div>
          </div>
          {/* carousel dots */}
          <div className="flex justify-center items-center gap-2 mt-2">
            {cards.map((card) => (
              <div
                key={card.id}
                className={`w-2 h-2 rounded-full cursor-pointer ${
                  activeCard.id === card.id
                    ? "bg-(--color-accent)"
                    : "bg-(--color-border)"
                }`}
              ></div>
            ))}
          </div>
        </div>
        <p className="text-2xl">{activeCard.title}</p>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full h-2 bg-(--color-border) rounded-full">
            <div className="w-[57%] h-2 bg-(--color-accent) rounded-full relative">
              <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-(--color-accent) rounded-full border-2 border-white"></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-sm text-(--color-muted)">Current Balance</p>
            <p className="text-2xl">$1,234.56</p>
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-(--color-muted)">Available Limit </p>
            <p className="text-2xl">$1,234.56</p>
          </div>
        </div>
      </div>
    </CardBackground>
  );
};

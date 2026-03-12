import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";

const SettingsDropdown = () => {
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const toggle = () => setOpen((o) => !o);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className="px-3 py-1.5 text-xs rounded-lg border border-(--color-border) hover:border-(--color-border-strong) hover:bg-(--color-surface-elevated) flex items-center gap-2 transition-all"
      >
        <svg
          className="w-3.5 h-3.5 text-(--color-muted)"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="hidden sm:inline font-medium">Settings</span>
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-44 rounded-xl overflow-hidden z-50 text-sm"
          style={{
            background: "var(--color-bg)",
            border: "1px solid var(--color-border-strong)",
            boxShadow: "var(--shadow-elevated)",
          }}
        >
          <div className="py-1 flex flex-col">
            <Link
              to="/settings"
              onClick={() => setOpen(false)}
              className="px-3.5 py-2.5 text-left hover:bg-(--color-surface-elevated) transition-colors text-[13px]"
            >
              Preferences
            </Link>
            <button
              onClick={() => {
                setOpen(false);
                signOut();
              }}
              className="px-3.5 py-2.5 text-left hover:bg-red-500/8 transition-colors text-red-400 text-[13px]"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;

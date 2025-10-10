import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuthContext";

const SettingsDropdown = () => {
  const { signOut } = useAuth();
  const [open, setOpen] = React.useState(false);
  const toggle = () => setOpen((o) => !o);
  const close = () => setOpen(false);

  return (
    <div className="relative">
      <button
        onClick={toggle}
        aria-haspopup="menu"
        aria-expanded={open}
        className="px-3 py-2 text-xs rounded-md border border-(--color-border) hover:border-(--color-accent) flex items-center gap-2"
      >
        <span className="i">⚙️</span>
        <span className="hidden sm:inline">Settings</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 glass border border-(--color-border) rounded-md shadow-lg z-50 text-sm overflow-hidden">
          <div className="py-1 flex flex-col">
            <Link
              to="/settings"
              onClick={close}
              className="px-3 py-2 text-left hover:bg-(--color-surface)"
            >
              Preferences
            </Link>
            <button
              onClick={() => {
                close();
                signOut();
              }}
              className="px-3 py-2 text-left hover:bg-(--color-surface) text-red-400"
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

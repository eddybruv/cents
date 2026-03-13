import React from "react";
import { useToast } from "../hooks/useToast";

/**
 * Toast Demo Component
 * This component demonstrates all toast types and can be used for testing
 * Import and add to any page to test the toast system
 */
const ToastDemo = () => {
  const toast = useToast();

  return (
    <div className="glass border border-(--color-border) rounded-lg p-4 sm:p-6">
      <h3 className="text-lg font-semibold mb-3">Toast Notifications Demo</h3>
      <p className="text-xs sm:text-sm text-(--color-muted) mb-4">
        Click any button to see the toast notification in action
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <button
          onClick={() => toast.success("Operation successful!")}
          className="px-4 py-2 text-sm rounded-md bg-green-500 text-white font-semibold hover:bg-green-600 transition"
        >
          Success
        </button>

        <button
          onClick={() => toast.error("Something went wrong!")}
          className="px-4 py-2 text-sm rounded-md bg-red-500 text-white font-semibold hover:bg-red-600 transition"
        >
          Error
        </button>

        <button
          onClick={() => toast.warning("Please be careful!")}
          className="px-4 py-2 text-sm rounded-md bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
        >
          Warning
        </button>

        <button
          onClick={() => toast.info("Here's some information")}
          className="px-4 py-2 text-sm rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
        >
          Info
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-(--color-border)">
        <p className="text-xs text-(--color-muted) mb-2">Custom Duration:</p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => toast.success("Quick message (2s)", 2000)}
            className="px-3 py-1.5 text-xs rounded-md bg-(--color-surface) border border-(--color-border) hover:border-(--color-accent)"
          >
            2 seconds
          </button>
          <button
            onClick={() => toast.info("Standard message (3s)", 3000)}
            className="px-3 py-1.5 text-xs rounded-md bg-(--color-surface) border border-(--color-border) hover:border-(--color-accent)"
          >
            3 seconds
          </button>
          <button
            onClick={() => toast.warning("Long message (5s)", 5000)}
            className="px-3 py-1.5 text-xs rounded-md bg-(--color-surface) border border-(--color-border) hover:border-(--color-accent)"
          >
            5 seconds
          </button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-(--color-border)">
        <p className="text-xs text-(--color-muted) mb-2">Multiple Toasts:</p>
        <button
          onClick={() => {
            toast.success("First toast");
            setTimeout(() => toast.info("Second toast"), 500);
            setTimeout(() => toast.warning("Third toast"), 1000);
          }}
          className="px-3 py-1.5 text-xs rounded-md bg-(--color-surface) border border-(--color-border) hover:border-(--color-accent)"
        >
          Show Multiple Toasts
        </button>
      </div>

      <div className="mt-4 pt-4 border-t border-(--color-border)">
        <p className="text-xs text-(--color-muted)">
          💡 Toasts appear in the top-right corner and auto-dismiss after the
          specified duration. Click the X to close manually.
        </p>
      </div>
    </div>
  );
};

export default ToastDemo;

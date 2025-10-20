import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faInfoCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Toast = ({ message, type = "info", duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = React.useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose?.();
    }, 300); // Match animation duration
  }, [onClose]);

  useEffect(() => {
    // Trigger entry animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // Auto dismiss after duration
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const config = {
    success: {
      icon: faCheckCircle,
      colorClass: "text-green-500",
      bgClass: "border-green-500/30",
      iconBg: "bg-green-500/10",
    },
    error: {
      icon: faExclamationCircle,
      colorClass: "text-red-500",
      bgClass: "border-red-500/30",
      iconBg: "bg-red-500/10",
    },
    warning: {
      icon: faExclamationTriangle,
      colorClass: "text-yellow-500",
      bgClass: "border-yellow-500/30",
      iconBg: "bg-yellow-500/10",
    },
    info: {
      icon: faInfoCircle,
      colorClass: "text-blue-500",
      bgClass: "border-blue-500/30",
      iconBg: "bg-blue-500/10",
    },
  };

  const { icon, colorClass, bgClass, iconBg } = config[type] || config.info;

  return (
    <div
      className={`
        glass border ${bgClass} rounded-lg shadow-lg
        min-w-[280px] max-w-[400px] w-full sm:w-auto
        pointer-events-auto
        transition-all duration-300 ease-out
        ${
          isVisible && !isExiting
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-8"
        }
      `}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 p-3 sm:p-4">
        {/* Icon */}
        <div className={`${iconBg} rounded-lg p-2 flex-shrink-0`}>
          <FontAwesomeIcon icon={icon} className={`w-4 h-4 ${colorClass}`} />
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0 pt-0.5">
          <p className="text-sm text-(--color-fg) break-words">{message}</p>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-(--color-muted) hover:text-(--color-fg) transition-colors p-1 -mr-1"
          aria-label="Close notification"
        >
          <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-(--color-surface) overflow-hidden rounded-b-lg">
        <div
          className={`h-full ${
            type === "success"
              ? "bg-green-500"
              : type === "error"
                ? "bg-red-500"
                : type === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
          }`}
          style={{
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default Toast;

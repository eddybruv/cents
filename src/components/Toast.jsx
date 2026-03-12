import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
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

  const handleClose = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onClose?.();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  const config = {
    success: {
      icon: faCheckCircle,
      colorClass: "text-emerald-400",
      borderColor: "rgba(52, 211, 153, 0.2)",
      barColor: "#34d399",
    },
    error: {
      icon: faExclamationCircle,
      colorClass: "text-red-400",
      borderColor: "rgba(248, 113, 113, 0.2)",
      barColor: "#f87171",
    },
    warning: {
      icon: faExclamationTriangle,
      colorClass: "text-amber-400",
      borderColor: "rgba(251, 191, 36, 0.2)",
      barColor: "#fbbf24",
    },
    info: {
      icon: faInfoCircle,
      colorClass: "text-blue-400",
      borderColor: "rgba(96, 165, 250, 0.2)",
      barColor: "#60a5fa",
    },
  };

  const { icon, colorClass, borderColor, barColor } = config[type] || config.info;

  return (
    <div
      className={`
        rounded-xl shadow-lg
        min-w-[280px] max-w-[380px] w-full sm:w-auto
        pointer-events-auto overflow-hidden
        transition-all duration-300 ease-out
        ${
          isVisible && !isExiting
            ? "opacity-100 translate-x-0 scale-100"
            : "opacity-0 translate-x-4 scale-95"
        }
      `}
      style={{
        background: "var(--color-bg)",
        border: `1px solid ${borderColor}`,
        boxShadow: "var(--shadow-elevated)",
      }}
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start gap-3 p-3.5">
        <FontAwesomeIcon icon={icon} className={`w-4 h-4 mt-0.5 ${colorClass}`} />
        <p className="flex-1 min-w-0 text-sm text-(--color-fg) leading-relaxed">{message}</p>
        <button
          onClick={handleClose}
          className="flex-shrink-0 text-(--color-muted) hover:text-(--color-fg) transition-colors p-0.5"
          aria-label="Close notification"
        >
          <FontAwesomeIcon icon={faTimes} className="w-3 h-3" />
        </button>
      </div>

      <div className="h-0.5 overflow-hidden" style={{ background: "var(--color-surface)" }}>
        <div
          style={{
            height: "100%",
            background: barColor,
            animation: `shrink ${duration}ms linear forwards`,
          }}
        />
      </div>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "info"]),
  duration: PropTypes.number,
  onClose: PropTypes.func,
};

export default Toast;

import React from "react";

const Avatar = ({ src, alt = "Avatar", name, size = "md", className = "" }) => {
  const [imageError, setImageError] = React.useState(false);

  // Reset error state when src changes
  React.useEffect(() => {
    setImageError(false);
  }, [src]);

  // Get initials from name
  const getInitials = () => {
    if (!name) return "?";
    const names = name.trim().split(" ");
    if (names.length >= 2) {
      return (names[0].charAt(0) + names[1].charAt(0)).toUpperCase();
    }
    return names[0].charAt(0).toUpperCase();
  };

  // Size classes
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };

  const sizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <>
      {src && !imageError ? (
        <img
          src={src}
          alt={alt}
          className={`${sizeClass} rounded-full object-cover ${className}`}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={`${sizeClass} rounded-full bg-(--color-surface) border border-(--color-border) flex items-center justify-center ${className}`}
        >
          <span className="text-(--color-fg) font-semibold">
            {getInitials()}
          </span>
        </div>
      )}
    </>
  );
};

export default Avatar;

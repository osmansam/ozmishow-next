import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { AiOutlineDown } from "react-icons/ai";

export interface AdminEditButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: ReactNode;
  size?: "sm" | "md";
}

const AdminEditButton = forwardRef<HTMLButtonElement, AdminEditButtonProps>(
  ({ label, icon, size = "md", className = "", ...props }, ref) => {
    const sizeClasses =
      size === "sm" ? "px-2 py-1 text-xs" : "px-4 py-1.5 text-sm";

    return (
      <button
        ref={ref}
        className={`
          flex items-center gap-2 ${sizeClasses}
          font-medium text-gray-700 
          bg-white border border-gray-200 
          rounded-full shadow-sm 
          hover:bg-gray-50 hover:text-blue-600 hover:border-blue-200
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1
          ${className}
        `}
        {...props}
      >
        <span>{label}</span>
        {icon || <AiOutlineDown className="text-xs opacity-50" />}
      </button>
    );
  }
);

AdminEditButton.displayName = "AdminEditButton";

export default AdminEditButton;

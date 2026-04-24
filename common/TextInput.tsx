import { useEffect, useRef, useState } from "react";
import { SketchPicker } from "react-color";
import "react-day-picker/dist/style.css";
import { FiMinusCircle } from "react-icons/fi";
import { GoPlusCircle } from "react-icons/go";
import { IoIosClose } from "react-icons/io";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { GenericButton } from "./GenericButton";
import { H6 } from "./Typography";


type TextInputProps = {
  label?: string;
  placeholder?: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (value: any) => void;
  className?: string;
  disabled?: boolean;
  onClear?: () => void;
  isDatePicker?: boolean;
  isTopFlexRow?: boolean;
  inputWidth?: string;
  requiredField?: boolean;
  isDateInitiallyOpen?: boolean;
  minNumber?: number;
  isMinNumber?: boolean;
  isNumberButtonsActive?: boolean;
  isOnClearActive?: boolean;
  isDebounce?: boolean;
  isDatePickerLabel?: boolean;
  isReadOnly?: boolean;
};

const TextInput = ({
  label,
  placeholder,
  value,
  type,
  onChange,
  disabled,
  isTopFlexRow,
  onClear,
  inputWidth,
  minNumber = 0,
  isMinNumber = true,
  isNumberButtonsActive = false,
  isOnClearActive = true,
  requiredField = false,
  isDebounce = false,
  isReadOnly = false,
  className = "px-4 py-2.5 border rounded-md __className_a182b8",
}: TextInputProps) => {
  const [localValue, setLocalValue] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleDivClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Debounce onChange
  const handleChange = (e: { target: { value: string | number } }) => {
    const newValue =
      type === "number" && +e.target.value < minNumber && isMinNumber
        ? Number(minNumber)
        : type === "number"
        ? Number(e.target.value)
        : e.target.value;
    setLocalValue(newValue);
    if (isDebounce) {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      const timer = setTimeout(() => {
        onChange(newValue);
      }, 1000);
      setDebounceTimer(timer);
    } else {
      onChange(newValue);
    }
  };

  const handleIncrement = () => {
    if (type === "number") {
      const newValue = Math.max(minNumber, +localValue + 1);
      setLocalValue(newValue);

      if (isDebounce) {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        const timer = setTimeout(() => {
          onChange(newValue);
        }, 1000);
        setDebounceTimer(timer);
      } else {
        onChange(newValue);
      }

      if (inputRef.current) {
        inputRef.current.readOnly = true;
        setTimeout(() => {
          if (inputRef.current) inputRef.current.readOnly = false;
        }, 0);
      }
    }
  };
  const handleDecrement = () => {
    if (type === "number" && +localValue > minNumber) {
      const newValue = Math.max(minNumber, +localValue - 1);
      setLocalValue(newValue);

      if (isDebounce) {
        if (debounceTimer) {
          clearTimeout(debounceTimer);
        }
        const timer = setTimeout(() => {
          onChange(newValue);
        }, 1000);
        setDebounceTimer(timer);
      } else {
        onChange(newValue);
      }

      if (inputRef.current) {
        inputRef.current.readOnly = true;
        setTimeout(() => {
          if (inputRef.current) inputRef.current.readOnly = false;
        }, 0);
      }
    }
  };

  const inputClassName = `${className} ${
    inputWidth ? "border-gray-200" : ""
  } w-full text-sm ${
    type === "number" ? "inputHideNumberArrows" : ""
  } text-base`;

  const handleWheel = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  if (type === "color") {
    return (
      <div
        className={`flex ${
          isTopFlexRow ? "flex-row sm:flex-col" : "flex-col"
        } gap-2 w-full items-start pb-4 border-b border-gray-100`}
      >
        <H6 className="min-w-10 text-gray-700 font-medium">
          {label}
          {requiredField && (
            <>
              <span className="text-red-400">* </span>
            </>
          )}
        </H6>
        <div className="flex flex-row gap-2 items-center w-full">
          {/* Color preview box that opens the picker */}
          <div
            onClick={() => setIsColorPickerOpen(true)}
            className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer hover:border-gray-400 transition-colors flex-1"
            style={{ minHeight: "42px" }}
          >
            <div
              className="w-8 h-8 rounded border border-gray-300"
              style={{ backgroundColor: value || "#ffffff" }}
            />
            <span className="text-sm text-gray-700">
              {value || "Click to select color"}
            </span>
          </div>

          <GenericButton
            onClick={() => {
              onChange("");
            }}
            variant="danger"
            size="sm"
            className="h-10 w-10 p-0"
          >
            <IoIosClose size={20} />
          </GenericButton>
        </div>

        {/* Color picker modal */}
        {isColorPickerOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-[9998]"
              onClick={() => setIsColorPickerOpen(false)}
            />
            {/* Color picker */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] bg-white p-4 rounded-lg shadow-xl">
              <SketchPicker
                color={value}
                onChange={(color) => {
                  onChange(color.hex);
                }}
              />
              <div className="flex justify-end gap-2 mt-4">
                <GenericButton
                  onClick={() => setIsColorPickerOpen(false)}
                  variant="primary"
                  size="sm"
                >
                  Done
                </GenericButton>
              </div>
            </div>
          </>
        )}
      </div>
    );
  }
  if (type === "checkbox") {
    return (
      <div className="flex justify-between items-center w-full pb-4 border-b border-gray-100">
        {/* Label on the left */}
        <H6 className="my-auto text-gray-700 font-medium">
          {label}
          {requiredField && <span className="text-red-400">*</span>}
        </H6>

        {/* Icon on the right */}
        <GenericButton
          type="button"
          disabled={disabled}
          onClick={() => {
            const newValue = !(localValue ?? value);
            setLocalValue(newValue);
            onChange(newValue);
          }}
          variant="icon"
        >
          {localValue ?? value ? (
            <MdOutlineCheckBox className="h-6 w-6" />
          ) : (
            <MdOutlineCheckBoxOutlineBlank className="h-6 w-6" />
          )}
        </GenericButton>
      </div>
    );
  }

  return (
    <div
      className={`flex ${isTopFlexRow ? "flex-row gap-4" : "flex-col gap-2"} pb-4 border-b border-gray-100`}
      onClick={handleDivClick}
    >
      <H6 className={`${isTopFlexRow ? "min-w-20" : "min-w-10"} my-auto text-gray-700 font-medium`}>
        {label}
        {requiredField && (
          <>
            <span className="text-red-400">* </span>
          </>
        )}
      </H6>
      <div
        className={`flex items-center justify-end ${
          isNumberButtonsActive ? "gap-4" : "gap-2"
        } ${inputWidth ? inputWidth : "w-full"}`}
      >
        <input
          id={"number-input"}
          ref={inputRef}
          type={type}
          style={{
            fontSize: "16px",
          }}
          placeholder={placeholder}
          disabled={disabled || isReadOnly}
          value={localValue}
          onChange={handleChange}
          className={inputClassName}
          {...(isMinNumber && (type === "number" ? { min: minNumber } : {}))}
          onWheel={type === "number" ? handleWheel : undefined}
        />
        {isNumberButtonsActive && (
          <FiMinusCircle
            className="w-8 h-8 flex-shrink-0 text-red-500 hover:text-red-800 cursor-pointer focus:outline-none"
            onClick={handleDecrement}
          />
        )}
        {isNumberButtonsActive && (
          <GoPlusCircle
            className="w-8 h-8 flex-shrink-0 text-green-500 hover:text-green-800 cursor-pointer focus:outline-none"
            onClick={handleIncrement}
          />
        )}
        {onClear && isOnClearActive && (
          <GenericButton
            onClick={() => {
              setLocalValue("");
              onClear();
            }}
            variant="icon"
            className="w-8 h-8 my-auto text-2xl text-gray-500 hover:text-red-700"
          >
            <IoIosClose size={28} />
          </GenericButton>
        )}
      </div>
    </div>
  );
};

export default TextInput;

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { GenericButton } from "../../common/GenericButton";
import SelectInput from "../../common/SelectInput";
import TextInput from "../../common/TextInput";
import { InputTypes } from "../../common/types";
import { editComponentStyle } from "../../features/twoPicture/twoPictureSlice";
import { ComponentStyleType } from "../../shared/types";
import { useAppDispatch } from "../../store";

interface ComponentStyleModalProps {
  isOpen: boolean;
  styleData: any;
  onClose: () => void;
  componentTypes?: string[];
  twoPictureId: string;
  currentType: string;
  isComponentType: boolean;
}

function ComponentStyleModal({
  isOpen,
  styleData,
  currentType,
  onClose,
  componentTypes,
  isComponentType,
  twoPictureId,
}: ComponentStyleModalProps) {
  const dispatch = useAppDispatch();
  const [editedStyle, setEditedStyle] = useState<ComponentStyleType>(styleData);
  const [selectedColor, setSelectedColor] = useState(styleData.backgroundColor);
  const [selectedType, setSelectedType] = useState(currentType);

  const handleStyleChange = (property: string, value: string) => {
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      [property]: value,
    }));
    if (property === "backgroundColor") {
      setSelectedColor(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      editComponentStyle({
        twoPictureId,
        style: editedStyle,
        type: selectedType,
      })
    );
    onClose();
    window.location.reload();
  };



  return isOpen
    ? ReactDOM.createPortal(
        <div className="fixed right-0 top-0 flex  z-40 ">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div
            className="bg-white p-4 rounded-lg z-10 min-h-screen"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-3 capitalize">
                Component Style
              </h2>
              <TextInput
                label="Background Color"
                type={InputTypes.COLOR}
                value={selectedColor}
                onChange={(color) => handleStyleChange("backgroundColor", color)}
              />
              <SelectInput
                label="Width"
                options={[
                  { label: "100%", value: "100%" },
                  { label: "90%", value: "90%" },
                  { label: "80%", value: "80%" },
                  { label: "75%", value: "75%" },
                  { label: "66%", value: "66%" },
                  { label: "50%", value: "50%" },
                  { label: "33%", value: "33%" },
                  { label: "25%", value: "25%" },
                  { label: "Auto", value: "auto" },
                  { label: "Max Content", value: "max-content" },
                  { label: "Min Content", value: "min-content" },
                  { label: "100vw", value: "100vw" },
                ]}
                value={{
                  value: editedStyle.width || "100%",
                  label: editedStyle.width || "100%",
                }}
                onChange={(option) => {
                  if (option && "value" in option) {
                    handleStyleChange("width", String(option.value));
                  }
                }}
              />
              <TextInput
                label="Background Image"
                type={InputTypes.TEXT}
                value={editedStyle.backgroundImage}
                onChange={(value) => handleStyleChange("backgroundImage", value)}
              />
              {isComponentType && (
                <SelectInput
                  label="Component Type"
                  options={componentTypes?.map((type) => ({ value: type, label: type })) || []}
                  value={{ value: selectedType, label: selectedType }}
                  onChange={(option) => {
                    if (option && 'value' in option) {
                      setSelectedType(String(option.value));
                    }
                  }}
                />
              )}
              <div className="flex justify-end gap-2 mt-6">
                <GenericButton
                  type="submit"
                  variant="primary"
                  size="md"
                >
                  Save
                </GenericButton>
                <GenericButton
                  type="button"
                  onClick={onClose}
                  variant="secondary"
                  size="md"
                >
                  Cancel
                </GenericButton>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )
    : null;
}

export default ComponentStyleModal;

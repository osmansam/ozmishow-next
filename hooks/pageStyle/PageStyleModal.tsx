import React, { useState } from "react";
import ReactDOM from "react-dom";
import { GenericButton } from "../../common/GenericButton";
import TextInput from "../../common/TextInput";
import { InputTypes } from "../../common/types";
import { updatePageOptions } from "../../features/twoPicture/twoPictureSlice";
import { PageStyleType } from "../../shared/types";
import { useAppDispatch } from "../../store";

interface PageStyleModalProps {
  isOpen: boolean;
  styleData: PageStyleType;
  onClose: () => void;
  pageOptionsId: string;
}

const PageStyleModal = ({
  isOpen,
  styleData,
  onClose,
  pageOptionsId,
}: PageStyleModalProps) => {
  const dispatch = useAppDispatch();

  // Initialize the edited style with the original style data
  const [editedStyle, setEditedStyle] = useState<PageStyleType>({
    ...styleData,
    backgroundSize: "cover",
  });

  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState(
    styleData.backgroundColor
  );

  const handleStyleChange = (property: string, value: string | boolean) => {
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      [property]: value,
    }));
    if (property === "backgroundColor") {
      setSelectedBackgroundColor(value as string);
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Dispatch an action to update page options with the editedStyle
    await dispatch(
      updatePageOptions({ id: pageOptionsId, style: editedStyle })
    );

    onClose();
    window.location.reload();
  };

  // Function to handle clicks outside the modal
  const handleOutsideClick = () => {
    onClose();
  };

  return isOpen
    ? ReactDOM.createPortal(
        <div className="fixed right-0 top-0 flex z-40">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleOutsideClick}
          ></div>
          <div
            className="bg-white p-6 rounded-lg shadow-xl z-10 min-h-screen w-96"
            style={{ maxHeight: "100vh", overflowY: "auto" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-xl font-bold mb-6 pb-3 border-b border-gray-200">
                Page Style
              </h2>
              <TextInput
                label="Background Color"
                type={InputTypes.COLOR}
                value={selectedBackgroundColor}
                onChange={(color) => handleStyleChange("backgroundColor", color)}
              />
              <TextInput
                label="Background Image"
                type={InputTypes.TEXT}
                value={editedStyle.backgroundImage}
                onChange={(value) => handleStyleChange("backgroundImage", value)}
              />
              <TextInput
                label="Effect Style For All"
                type={InputTypes.CHECKBOX}
                value={editedStyle.effectAll}
                onChange={(value) => handleStyleChange("effectAll", value)}
              />
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
};

export default PageStyleModal;

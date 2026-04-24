import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminEditButton from "../../common/AdminEditButton";
import { ComponentStyleType } from "../../shared/types";
import { RootState } from "../../store";
import ComponentStyleModal from "./ComponentStyleModal";
interface ComponentStyleModalProps {
  styleData: any;
  twoPictureId: string;
  componentTypes?: string[];
  currentType: string;
  isComponentType: boolean;
}

const ComponentStyleModalContainer = ({
  styleData,
  currentType,
  twoPictureId,
  componentTypes,
  isComponentType,
}: ComponentStyleModalProps) => {
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedStyle, setSelectedStyle] = useState<ComponentStyleType>({
    backgroundColor: "",
    width: "",
  });

  const openModal = (styleData: ComponentStyleType) => {
    setSelectedStyle(styleData);
    React.startTransition(() => {
      setIsModalOpen(true);
    });
  };

  return (
    <div>
      {!isModalOpen && isAdmin && (
        <AdminEditButton
          label="Component Style"
          onClick={() => openModal(styleData)}
        />
      )}

      {isModalOpen && (
        <ComponentStyleModal
          key={twoPictureId}
          twoPictureId={twoPictureId}
          isOpen={isModalOpen}
          styleData={selectedStyle}
          componentTypes={componentTypes}
          currentType={currentType}
          onClose={() => setIsModalOpen(false)}
          isComponentType={isComponentType}
        />
      )}
    </div>
  );
};

export default ComponentStyleModalContainer;

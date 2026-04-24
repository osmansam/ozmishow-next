import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminEditButton from "../../common/AdminEditButton";
import { imageStyle } from "../../shared/types";
import { RootState } from "../../store";
import ImageStyleModal from "./ImageStyleModal";

interface StyledModalProps {
  styleData: any;
  twoPictureId: string;
  componentId: string;
  type: string;
  isContentSend?: boolean;
}

const ImageStyleModalContainer = ({
  styleData,
  twoPictureId,
  type,
  componentId,
}: StyledModalProps) => {
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [selectedStyle, setSelectedStyle] = useState({
    content: "",
    style: imageStyle,
  });

  const openModal = (styleData: any) => {
    setSelectedStyle(styleData);
    React.startTransition(() => {
      setIsModalOpen(true);
    });
  };
  return (
    <div>
      {!isModalOpen && isAdmin && (
        <AdminEditButton
          label="Image Style"
          onClick={() =>
            openModal({
              style: styleData?.style,
              content: styleData?.content,
            })
          }
        />
      )}
      {isModalOpen && (
        <ImageStyleModal
          key={twoPictureId}
          isOpen={isModalOpen}
          styleData={selectedStyle}
          onClose={() => setIsModalOpen(false)}
          twoPictureId={twoPictureId}
          componentId={componentId ?? ""}
          type={type ?? ""}
        />
      )}
    </div>
  );
};

export default ImageStyleModalContainer;

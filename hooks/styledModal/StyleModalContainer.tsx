import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminEditButton from "../../common/AdminEditButton";
import { RootState } from "../../store";
import StyledModal from "./StyledModal";

interface StyledModalProps {
  styleData: any;
  twoPictureId: string;
  componentId: string;
  contentContainerType: string;
  isContentSend?: boolean;
  type?: string;
  buttonIndex?: number;
}

const StyleModalContainer = ({
  styleData,
  twoPictureId,
  componentId,
  contentContainerType,
  isContentSend,
  buttonIndex,
  type,
}: StyledModalProps) => {
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [contentType, setContentType] = useState("");

  const openModal = (styleData: any) => {
    setIsModalOpen(true);
  };

  return (
    <div>
      {!isModalOpen && isAdmin && (
        <AdminEditButton
          label="Edit"
          size="sm"
          onClick={() => {
            React.startTransition(() => {
              openModal({
                style: styleData?.style,
                content: styleData?.content,
              });
              setContentType(contentContainerType);
            });
          }}
        />
      )}
      {isModalOpen && contentType === contentContainerType && (
        <StyledModal
          key={twoPictureId}
          isOpen={isModalOpen}
          styleData={styleData}
          onClose={() => setIsModalOpen(false)}
          type={type}
          twoPictureId={twoPictureId}
          componentId={componentId ?? ""}
          contentType={contentContainerType}
          isContentSend={isContentSend}
          buttonIndex={buttonIndex}
        />
      )}
    </div>
  );
};

export default StyleModalContainer;

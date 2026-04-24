import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminEditButton from "../../common/AdminEditButton";
import { style } from "../../shared/types";
import { RootState } from "../../store";
import StyledModal from "../styledModal/StyledModal";
import ContentModal from "./ContentModal";

interface ContentModalProps {
  content: any;
  twoPictureId: string;
  componentId: string;
  contentContainerType: string;
  type?: string;
}
const ContentModalContainer = ({
  content,
  twoPictureId,
  componentId,
  contentContainerType,
  type,
}: ContentModalProps) => {
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [contentToEdit, setContentToEdit] = useState<any>();
  const [contentType, setContentType] = useState("");
  const [selectedStyle, setSelectedStyle] = useState({
    content: "",
    style: style,
  });

  const openModal = (styleData: any) => {
    setSelectedStyle(styleData);
    React.startTransition(() => {
      setIsModalOpen(true);
    });
  };
  const openContentModal = (content: any, contentType: string) => {
    setContentToEdit(content);
    setIsContentModalOpen(true);
  };
  return (
    <div>
      {/* ContentModal for editing paragraphs */}
      {isContentModalOpen && (
        <ContentModal
          isOpen={isContentModalOpen}
          content={contentToEdit}
          onClose={() => setIsContentModalOpen(false)}
          componentId={componentId}
          type={type}
          contentType={contentContainerType}
          twoPictureId={twoPictureId}
        />
      )}
      {/* editing part */}
      {isAdmin && (
        <div className="flex flex-row justify-end gap-2 rounded-2xl py-2">
          {!isModalOpen && (
            <AdminEditButton
              label={
                contentContainerType === "paragraphs"
                  ? "Paragraph Style"
                  : "Input Style"
              }
              onClick={() => {
                openModal({
                  style: content?.style,
                  content: content?.content,
                });
                setContentType(contentContainerType);
              }}
              className="mr-2"
            />
          )}
          {content?.content && (
            <AdminEditButton
              label={
                contentContainerType === "paragraphs"
                  ? "Paragraph Edit"
                  : "Input Edit"
              }
              onClick={() => openContentModal(content, contentContainerType)}
              className="mr-2"
            />
          )}
          {isModalOpen && contentType === contentContainerType && (
            <StyledModal
              isOpen={isModalOpen}
              styleData={selectedStyle}
              onClose={() => setIsModalOpen(false)}
              type={type}
              twoPictureId={twoPictureId}
              componentId={componentId}
              contentType={contentContainerType}
              isContentSend={false}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ContentModalContainer;

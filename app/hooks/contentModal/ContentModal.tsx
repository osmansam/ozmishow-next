import React, { useEffect, useState } from "react";
import { GenericButton } from "../../common/GenericButton";
import {
  editExplanationBar,
  editResumeBox,
  editTwoPictureIndexStyle,
  editTwoPictureStyle,
  editWorkTeamBar,
} from "../../features/twoPicture/twoPictureSlice";
import { StyleType } from "../../shared/types";
import { useAppDispatch } from "../../store";
interface ContentData {
  content: string[];
  style: StyleType;
}
interface ContentModalProps {
  isOpen: boolean;
  content: ContentData;
  onClose: () => void;
  twoPictureId: string;
  componentId: string;
  contentType: string;
  type?: string;
}

const ContentModal: React.FC<ContentModalProps> = ({
  isOpen,
  content,
  onClose,
  twoPictureId,
  componentId,
  contentType,
  type,
}) => {
  const dispatch = useAppDispatch();
  const [editedContent, setEditedContent] = useState<ContentData>(content);

  // Update the editedContent when the content prop changes
  useEffect(() => {
    setEditedContent(content);
  }, [content]);

  const handleSave = async () => {
    const container = [
      {
        [contentType]: {
          content: editedContent.content,
          style: editedContent.style,
        },
      },
    ];

    switch (type) {
      case "explanationBar":
        await dispatch(
          editExplanationBar({
            twoPictureId,
            explanationBarId: componentId,
            container,
          })
        );
        break;
      case "workTeamBar":
        await dispatch(
          editWorkTeamBar({
            twoPictureId,
            workTeamBarId: componentId,
            container,
          })
        );
        break;
      case "twoPicture":
        await dispatch(
          editTwoPictureStyle({
            twoPictureId,
            container,
          })
        );
        break;
      case "twoPictureIndex":
        await dispatch(
          editTwoPictureIndexStyle({
            twoPictureId,
            container,
            index: componentId,
          })
        );
        break;
      case "resumeBox":
        await dispatch(
          editResumeBox({
            twoPictureId,
            container,
            index: componentId,
          })
        );
        break;
      default:
        break;
    }

    // Close the modal
    onClose();
    window.location.reload();
  };

  return isOpen ? (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-75 z-40">
      <div className="bg-white p-6 rounded-lg shadow-xl z-50 w-full max-w-2xl mx-4">
        <h2 className="text-xl font-bold mb-6 pb-3 border-b border-gray-200 capitalize">
          {contentType} Content
        </h2>
        <div className="overflow-y-auto max-h-96 space-y-3">
          {editedContent.content.map((paragraph, index) => (
            <textarea
              key={index}
              rows={5}
              value={paragraph}
              onChange={(e) => {
                const updatedContent = [...editedContent.content];
                updatedContent[index] = e.target.value;
                setEditedContent({
                  content: updatedContent,
                  style: editedContent.style,
                });
              }}
              className="w-full border rounded p-2 mb-2 text-black"
              style={{ resize: "vertical" }} // Allow vertical resizing
            ></textarea>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <GenericButton
            onClick={handleSave}
            variant="primary"
            size="md"
          >
            Save
          </GenericButton>
          <GenericButton
            onClick={onClose}
            variant="secondary"
            size="md"
          >
            Cancel
          </GenericButton>
        </div>
      </div>
    </div>
  ) : null;
};

export default ContentModal;

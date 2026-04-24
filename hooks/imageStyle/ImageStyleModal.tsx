import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  editExplanationBar,
  editResumeBox,
  editTwoPictureIndexStyle,
  editTwoPictureStyle,
  editWorkTeamBar,
} from "../../features/twoPicture/twoPictureSlice";
import { ImageType } from "../../shared/types";
import { useAppDispatch } from "../../store";

interface StyleData {
  content: string;
  style: ImageType;
}

interface ImageStyleModalProps {
  isOpen: boolean;
  styleData: StyleData;
  onClose: () => void;
  twoPictureId: string;
  componentId: string;
  type: string;
}

function ImageStyleModal({
  isOpen,
  styleData,
  onClose,
  twoPictureId,
  componentId,
  type,
}: ImageStyleModalProps) {
  const dispatch = useAppDispatch();
  const [editedStyle, setEditedStyle] = useState<StyleData>(styleData);

  const [effectAllElement, setEffectAllElement] = useState(
    styleData.style.effectAll
  ); // State for "Effect All" option

  const toggleEffectAll = () => {
    setEffectAllElement(!effectAllElement);
  };

  useEffect(() => {
    // Update the effectAll value when the checkbox changes
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      style: {
        ...prevStyle.style,
        effectAll: effectAllElement,
      },
    }));
  }, [effectAllElement]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      [name]: value,
    }));
  };

  const handleStyleChange = (property: string, value: string) => {
    setEditedStyle((prevStyle) => ({
      ...prevStyle,
      style: {
        ...prevStyle.style,
        [property]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const container = [
      {
        img: {
          content: editedStyle.content,
          style: editedStyle.style,
        },
      },
    ];

    switch (type) {
      case "explanationBar":
        // console.log(editedStyle);
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
        if (componentId !== "") {
          await dispatch(
            editExplanationBar({
              twoPictureId,
              explanationBarId: componentId,
              container,
            })
          );
        } else {
          await dispatch(
            editTwoPictureStyle({
              twoPictureId,
              container,
            })
          );
        }

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
    setEffectAllElement(true);
    onClose();
    window.location.reload();
  };

  const handleOutsideClick = () => {
    onClose();
  };

  return isOpen
    ? ReactDOM.createPortal(
        <div className="fixed right-0 top-0 flex  z-40 ">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleOutsideClick}
          ></div>
          <div
            className="bg-white p-4 rounded-lg z-10 min-h-screen"
            style={{ maxHeight: "80vh", overflowY: "auto" }}
          >
            <form onSubmit={handleSubmit}>
              <h2 className="text-lg font-semibold mb-3 capitalize">
                Image Style
              </h2>
              {/* content part */}

              <div className="mb-3">
                <label htmlFor="content" className="block text-gray-600">
                  Url:
                </label>
                <input
                  type="text"
                  id="content"
                  name="content"
                  value={editedStyle.content}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full capitalize"
                />
              </div>

              {/* Add "Effect  All" option */}
              <div className="mb-3">
                <label htmlFor="effectAll" className="block text-gray-600">
                  Effect Style For All:
                </label>
                <input
                  type="checkbox"
                  id="effectAll"
                  name="effectAll"
                  checked={effectAllElement}
                  onChange={toggleEffectAll}
                  className="mr-2"
                />
                <span>Apply to all elements</span>
              </div>
              {/* width */}
              <div className="mb-3">
                <label htmlFor="width" className="block text-gray-600">
                  Width:
                </label>
                <input
                  type="text"
                  id="width"
                  name="width"
                  value={editedStyle.style.width}
                  onChange={(e) => handleStyleChange("width", e.target.value)}
                  className="border rounded px-2 py-1 w-full capitalize"
                />
              </div>
              {/* height */}
              <div className="mb-3">
                <label htmlFor="height" className="block text-gray-600">
                  Height:
                </label>
                <input
                  type="text"
                  id="height"
                  name="height"
                  value={editedStyle.style.height}
                  onChange={(e) => handleStyleChange("height", e.target.value)}
                  className="border rounded px-2 py-1 w-full capitalize"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 text-gray-600 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )
    : null;
}

export default ImageStyleModal;

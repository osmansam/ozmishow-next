import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import translations from "../../translations.json";
type ConfirmationModalProps = {
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  const { language } = useSelector((state: RootState) => state.context);
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg">
        <p>
          {translations[language as keyof typeof translations].deleteConfirm}
        </p>
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 mr-2 bg-red-500 text-white rounded-md"
            onClick={onConfirm}
          >
            {translations[language as keyof typeof translations].confirm}
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md"
            onClick={onCancel}
          >
            {translations[language as keyof typeof translations].cancel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;

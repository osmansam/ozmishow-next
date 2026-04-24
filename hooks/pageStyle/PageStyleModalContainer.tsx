import React, { useState } from "react";
import { useSelector } from "react-redux";
import AdminEditButton from "../../common/AdminEditButton";
import { PageStyleType } from "../../shared/types";
import { RootState } from "../../store";
import PageStyleModal from "./PageStyleModal";

interface PageStyleModalProps {
  styleData: PageStyleType;
  pageOptionsId: string;
}

const PageStyleModalContainer = ({
  styleData,
  pageOptionsId,
}: PageStyleModalProps) => {
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const openModal = () => {
    React.startTransition(() => {
      setIsModalOpen(true);
    });
  };
  return (
    <div>
      {!isModalOpen && isAdmin && (
        <div className="flex justify-center my-10">
          <AdminEditButton label="Page Style" onClick={openModal} />
        </div>
      )}
      {isModalOpen && (
        <PageStyleModal
          key={pageOptionsId}
          isOpen={isModalOpen}
          styleData={styleData}
          onClose={() => setIsModalOpen(false)}
          pageOptionsId={pageOptionsId}
        />
      )}
    </div>
  );
};

export default PageStyleModalContainer;

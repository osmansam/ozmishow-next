import React, { lazy } from "react";
import { useSelector } from "react-redux";
import {
  getPageTwoPictures,
  resetTwoPictureArray,
  updateResumeBox,
} from "../../features/twoPicture/twoPictureSlice";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import { ResumeBoxContainerType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";

const ResumeBox = lazy(() => import("./ResumeBox"));
const AddResumeBox = lazy(() => import("./AddResumeBox"));

const ResumeBoxContainer = ({
  id,
  mainHeader,
  componentStyle,
  resumeBoxArray,
  page,
}: ResumeBoxContainerType) => {
  const [isAddResumeBox, setIsAddResumeBox] = React.useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();
  //handle create new resumeBox item
  const handleCreate = async () => {
    await dispatch(updateResumeBox({ container: twoPictureArray, id }));
    setIsAddResumeBox(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };
  return (
    <div className="flex flex-col gap-3  w-5/6 mx-auto" style={componentStyle}>
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          // buraya componentTYpe gelecek
          currentType="type1"
          twoPictureId={id ?? ""}
          isComponentType={false}
        />
      </div>
      {/* mainHeader */}
      <h1
        className="w-fit  font-[700] text-4xl leading-[44px] mb-3 text-[#333333] flex flex-row gap-2 rounded-2xl px-4 py-0.5 justify-center items-center"
        style={mainHeader?.style}
      >
        {mainHeader?.content}
        <StyleModalContainer
          styleData={mainHeader}
          twoPictureId={id ?? ""}
          componentId={""}
          contentContainerType="mainHeader"
          isContentSend={true}
          type="mainMainHeader"
        />
      </h1>
      {/* resume Box container */}
      <div className="flex flex-wrap mx-auto pb-6">
        {resumeBoxArray.map((resumeBox, index) => {
          const { header, year1, year2, paragraph, university } = resumeBox;
          return (
            <ResumeBox
              key={index}
              index={index}
              header={header}
              year1={year1}
              year2={year2}
              paragraph={paragraph}
              university={university}
              _id={id}
            ></ResumeBox>
          );
        })}
      </div>
      {/* Button to add new item */}
      {!isAddResumeBox && isAdmin && (
        <button
          className="capitalize border-2 rounded-lg cursor-pointer w-fit p-2  mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddResumeBox(true)}
        >
          Add New item
        </button>
      )}
      {isAddResumeBox && isAdmin && (
        <div className="w-full mx-auto">
          <AddResumeBox />
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeBoxContainer;

import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  deleteItemInContainer,
  getPageTwoPictures,
  resetTwoPictureArray,
  updateWorkTeamBar,
} from "../../features/twoPicture/twoPictureSlice";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import {
  ContentStyleType,
  PictureWithStyleType,
  WorkTeamBarType,
} from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import AddWorkTeamItem from "./AddWorkTeamItem";

const WorkTeamBar = ({
  mainMainHeader,
  componentStyle,
  workTeamArray,
  id,
  page,
}: WorkTeamBarType) => {
  const dispatch = useAppDispatch();
  const [isWorkTeamItem, setIsWorkTeamItem] = useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const [barSelection, setBarSelection] = useState(0);
  const [hovered, setHovered] = useState(Number);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value));
  };

  //handle create new explanation item
  const handleCreate = async () => {
    await dispatch(updateWorkTeamBar({ container: twoPictureArray, id }));
    setIsWorkTeamItem(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };

  const groupedWorkTeams: {
    mainHeader?: ContentStyleType;
    items: Array<PictureWithStyleType>;
  }[] = workTeamArray.reduce(
    (
      acc: { mainHeader?: ContentStyleType; items: PictureWithStyleType[] }[],
      curr: PictureWithStyleType
    ) => {
      const existingGroup = acc.find(
        (group) => group.mainHeader?.content === curr.mainHeader?.content
      );
      if (existingGroup) {
        existingGroup.items.push(curr);
      } else {
        acc.push({ mainHeader: curr.mainHeader, items: [curr] });
      }
      return acc;
    },
    []
  );

  const barHeight = groupedWorkTeams.length * 25 + 50;
  const barClassName = `lg:w-[270px] md:w-[270px] sm:w-full w-full  flex flex-col gap-4 justify-between mb-4 h-[${barHeight}px] bg-[#f9f9f9] rounded-lg py-4`;

  return (
    <div className="py-10" style={componentStyle}>
      <div className="flex justify-end mr-20">
        <ComponentStyleModalContainer
          // buraya componentTYpe gelecek
          currentType="type1"
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          isComponentType={false}
        />
      </div>
      <div className="w-5/6 mx-auto mb-4">
        <h1
          className="text-3xl font-bold  ml-4 w-fit flex flex-row gap-8 rounded-2xl px-4 py-0.5 justify-center items-center"
          style={mainMainHeader?.style}
        >
          {mainMainHeader?.content}
          <StyleModalContainer
            styleData={mainMainHeader}
            twoPictureId={id ?? ""}
            componentId={""}
            contentContainerType="mainHeader"
            isContentSend={true}
            type="mainMainHeader"
          />
        </h1>
      </div>
      <div className="w-5/6 mx-auto flex lg:flex-row flex-col items-center sm:items-start">
        {/* Bar part */}
        <div className={barClassName}>
          <div className="w-max flex flex-col  gap-4 mx-auto justify-center items-center cursor-pointer">
            {groupedWorkTeams.map((group, index) => {
              const { mainHeader, items } = group;
              const workTeamId = items[0]._id;
              return (
                <div
                  className="flex w-full mx-auto  justify-center items-center cursor-pointer "
                  key={index}
                >
                  <li
                    className="w-full  px-8 rounded-lg flex list-none capitalize cursor-pointer  z-10  justify-center  items-center   py-1  "
                    style={
                      mainHeader?.style
                        ? {
                            ...mainHeader.style,
                            color:
                              index === barSelection
                                ? mainHeader.style.hover
                                  ? mainHeader.style.hover
                                  : "#e1241b"
                                : index === hovered
                                ? mainHeader.style.hover
                                  ? mainHeader.style.hover
                                  : mainHeader.style.color
                                : mainHeader.style.color,
                          }
                        : {}
                    }
                    onClick={() => setBarSelection(index)}
                    onMouseOver={() => setHovered(index)}
                    onMouseLeave={() => setHovered(barSelection)}
                  >
                    {mainHeader?.content}
                  </li>
                  <StyleModalContainer
                    styleData={mainHeader}
                    twoPictureId={id}
                    componentId={workTeamId ? workTeamId : ""}
                    contentContainerType="mainHeader"
                    isContentSend={true}
                    type="workTeamBar"
                  />
                </div>
              );
            })}
          </div>
        </div>
        {/* next to bar  */}
        <div className="flex  mx-auto flex-col gap-4 px-4 w-full lg:w-2/3">
          {groupedWorkTeams[barSelection] && (
            <>
              {groupedWorkTeams[barSelection].items.map((workTeam, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row  py-5  gap-5 justify-center items-center md:justify-normal md:items-start "
                >
                  {workTeam.img && (
                    <div className="flex flex-col justify-center items-center">
                      <img
                        src={workTeam.img?.content}
                        alt="explanationImage"
                        className="w-40 h-44 object-fit rounded-md"
                        style={workTeam?.img?.style}
                      />
                      <ImageStyleModalContainer
                        twoPictureId={id}
                        componentId={workTeam._id ?? ""}
                        type="workTeamBar"
                        styleData={workTeam?.img}
                      />
                    </div>
                  )}

                  <div>
                    {/* subheaders and paragraphs */}
                    <div className="flex flex-row gap-2">
                      {/* subheaders */}
                      <div className="w-max flex flex-col gap-1 ">
                        {workTeam.subHeaders?.content?.map(
                          (subHeader, index) => (
                            <h2
                              key={index}
                              className="w-full font-[700] text-sm leading-5 text-[#212529] rounded-lg px-2  "
                              style={
                                workTeam?.subHeaders?.style
                                  ? workTeam?.subHeaders?.style
                                  : {}
                              }
                            >
                              {subHeader} :
                            </h2>
                          )
                        )}
                      </div>
                      {/* paragraphs */}
                      <div className="w-max flex flex-col gap-1 ">
                        {workTeam.paragraphs?.content?.map(
                          (paragraph, index) => (
                            <h2
                              key={index}
                              className="w-full font-[400] text-sm leading-5 text-[#212529] rounded-lg px-2  "
                              style={
                                workTeam?.paragraphs?.style
                                  ? workTeam?.paragraphs?.style
                                  : {}
                              }
                            >
                              {workTeam?.paragraphs?.content &&
                                "   " + workTeam?.paragraphs?.content[index]}
                            </h2>
                          )
                        )}
                      </div>
                    </div>

                    {/* editing buttons and modals */}
                    <div className="flex flex-row gap-4">
                      <ContentModalContainer
                        content={workTeam.subHeaders}
                        twoPictureId={id}
                        componentId={workTeam._id ?? ""}
                        contentContainerType="subHeaders"
                        type="workTeamBar"
                      />
                      {/* paragraphs */}
                      <ContentModalContainer
                        content={workTeam.paragraphs}
                        twoPictureId={id}
                        componentId={workTeam._id ?? ""}
                        contentContainerType="paragraphs"
                        type="workTeamBar"
                      />
                    </div>
                    {isAdmin && (
                      <button
                        className="w-fit capitalize border-2 border-red-500 text-red-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:border-red-600 hover:text-red-600 hover:bg-red-100 mt-4"
                        onClick={async () => {
                          try {
                            await dispatch(
                              deleteItemInContainer({
                                id,
                                itemId: workTeam._id ?? "",
                              })
                            );
                            setBarSelection(0);
                            dispatch(getPageTwoPictures(page ?? ""));
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      {/* Button to add new item */}
      {!isWorkTeamItem && isAdmin && (
        <div className="flex gap-2 justify-center items-center">
          <button
            className="w-fit capitalize border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-100"
            onClick={() => setIsWorkTeamItem(true)}
          >
            Add New item
          </button>
        </div>
      )}

      {isWorkTeamItem && isAdmin && (
        <div>
          {
            <AddWorkTeamItem
              isPictureContainerImage={true}
              isPictureContainerButton={false}
              isPictureContainerParagraph={true}
            />
          }
          <div className="w-5/6 mx-auto my-2 flex flex-row gap-4">
            <button
              className="w-fit capitalize border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-100"
              onClick={handleCreate}
            >
              Create
            </button>
            <button
              className="w-fit capitalize border-2 border-red-500 text-red-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:border-red-600 hover:text-red-600 hover:bg-red-100"
              onClick={() => setIsWorkTeamItem(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkTeamBar;

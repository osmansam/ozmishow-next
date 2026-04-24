import React from "react";
import { useSelector } from "react-redux";
import {
  getPageTwoPictures,
  resetTwoPictureArray,
  updateContainer,
} from "../../features/twoPicture/twoPictureSlice";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import PictureContainer from "../../scenes/ComponentContainer/PictureContainer";
import { FullPageItemType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";

const FullPageItem = ({
  mainMainHeader,
  fullPageItemArray,
  componentStyle,
  id,
  page,
}: FullPageItemType) => {
  const dispatch = useAppDispatch();
  const [isAddNewItem, setIsAddNewItem] = React.useState(false);
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture,
  );

  const handleCreate = async () => {
    await dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };
  return (
    <div
      className="w-5/6 lg:w-4/5  mx-auto my-auto h-full py-10"
      style={componentStyle}
    >
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          // buraya componentTYpe gelecek
          currentType="type1"
          isComponentType={true}
          componentTypes={[
            "type1",
            "type2",
            "type3",
            "type4",
            "type5",
            "type6",
            "type7",
            "type8",
          ]}
        />
      </div>
      <h1
        className="font-[700] text-4xl leading-[44px] mb-4 text-[#333333] w-fit flex flex-row gap-8 rounded-2xl px-4 py-0.5 justify-center items-center"
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
      {fullPageItemArray.map((fullPageItem, index) => {
        const { header, paragraphs, buttons, img, _id } = fullPageItem;
        return (
          <div key={index} className="w-full">
            {img?.content && (
              <>
                <img
                  src={img?.content}
                  alt={header?.content}
                  className="w-full md:w-5/6 mx-auto lg:h-80 sm:h-60"
                  style={img?.style}
                />
                <div className="w-fit px-4 mx-auto">
                  <ImageStyleModalContainer
                    twoPictureId={id ?? ""}
                    componentId={index.toString()}
                    type="twoPictureIndex"
                    styleData={img}
                  />
                </div>
              </>
            )}
            <h1
              className="w-fit  py-0.5 gap-8 rounded-2xl font-[700] text-lg  text-[#333333] flex flex-row mt-2 items-center px-2"
              style={header?.style ? header?.style : {}}
            >
              {header?.content}
              <StyleModalContainer
                styleData={header}
                twoPictureId={id ?? ""}
                componentId={index.toString()}
                contentContainerType="header"
                isContentSend={true}
                type="twoPictureIndex"
              />
            </h1>
            <div
              className="flex flex-col gap-6 w-full rounded-lg py-2 px-2"
              style={paragraphs?.style ? paragraphs?.style : {}}
            >
              {paragraphs?.content?.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-normal leading-6 "
                  style={{ color: "#333333" }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <ContentModalContainer
              content={paragraphs}
              twoPictureId={id ?? ""}
              componentId={index?.toString() ?? ""}
              contentContainerType="paragraphs"
              type="twoPictureIndex"
            />
          </div>
        );
      })}
      {!isAddNewItem && isAdmin && (
        <button
          className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddNewItem(true)}
        >
          Add New Item
        </button>
      )}
      {isAddNewItem && isAdmin && (
        <div className="flex flex-col justify-between gap-4">
          <PictureContainer
            isPictureContainerImage={false}
            isPictureContainerButton={true}
            isPictureContainerParagraph={true}
          />
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

export default FullPageItem;

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

const FullPageItemType5 = ({
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

  // Neumorphic styles
  const bgBase = "#e0e5ec";
  const shadowOuter =
    "9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px rgba(255,255,255, 0.5)";
  const shadowInner =
    "inset 6px 6px 10px 0 rgba(163,177,198, 0.7), inset -6px -6px 10px 0 rgba(255,255,255, 0.8)";
  const textPrimary = "#4d5b7c";

  return (
    <div
      className="w-full py-16 px-6"
      style={{
        backgroundColor: bgBase,
        color: textPrimary,
        ...componentStyle,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-10">
          <div className="p-2 rounded-full" style={{ boxShadow: shadowOuter }}>
            <ComponentStyleModalContainer
              styleData={componentStyle}
              twoPictureId={id ?? ""}
              currentType="type5"
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
        </div>

        <div
          className="rounded-3xl p-8 mb-16 text-center"
          style={{ boxShadow: shadowOuter }}
        >
          <h1
            className="text-4xl md:text-5xl font-bold tracking-wide"
            style={{ color: textPrimary, ...mainMainHeader?.style }}
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

        <div className="space-y-12">
          {fullPageItemArray.map((fullPageItem, index) => {
            const { header, paragraphs, img } = fullPageItem;
            return (
              <div
                key={index}
                className="rounded-3xl p-8 md:p-10 flex flex-col gap-8"
                style={{ boxShadow: shadowOuter }}
              >
                {img?.content && (
                  <div className="w-full">
                    <div
                      className="p-2 rounded-2xl"
                      style={{ boxShadow: shadowOuter }}
                    >
                      <div className="relative rounded-xl overflow-hidden">
                        <img
                          src={img?.content}
                          alt={header?.content}
                          className="w-full h-auto object-cover rounded-xl max-h-[500px]"
                          style={img?.style}
                        />
                        <div className="absolute top-2 right-2">
                          <ImageStyleModalContainer
                            twoPictureId={id ?? ""}
                            componentId={index.toString()}
                            type="twoPictureIndex"
                            styleData={img}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="w-full space-y-6">
                  <h2
                    className="text-2xl font-bold"
                    style={{ color: textPrimary, ...header?.style }}
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
                  </h2>

                  <div
                    className="p-6 rounded-xl"
                    style={{ boxShadow: shadowInner }}
                  >
                    <div
                      className="text-lg leading-relaxed font-medium"
                      style={{ color: textPrimary, ...paragraphs?.style }}
                    >
                      {paragraphs?.content?.map((paragraph, pIndex) => (
                        <p key={pIndex} className="mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                      <ContentModalContainer
                        content={paragraphs}
                        twoPictureId={id ?? ""}
                        componentId={index?.toString() ?? ""}
                        contentContainerType="paragraphs"
                        type="twoPictureIndex"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {!isAddNewItem && isAdmin && (
          <div className="mt-16 text-center">
            <button
              className="px-8 py-4 rounded-full font-bold text-lg transition-transform active:scale-95"
              style={{
                boxShadow: shadowOuter,
                color: textPrimary,
              }}
              onClick={() => setIsAddNewItem(true)}
            >
              Add New Section
            </button>
          </div>
        )}

        {isAddNewItem && isAdmin && (
          <div
            className="mt-16 p-8 rounded-3xl"
            style={{ boxShadow: shadowOuter }}
          >
            <h3
              className="text-xl font-bold mb-6"
              style={{ color: textPrimary }}
            >
              Create New Section
            </h3>
            <PictureContainer
              isPictureContainerImage={false}
              isPictureContainerButton={true}
              isPictureContainerParagraph={true}
            />
            <div className="mt-8 flex justify-end gap-6">
              <button
                className="px-6 py-2 rounded-xl font-semibold transition-all active:scale-95"
                style={{ boxShadow: shadowOuter, color: textPrimary }}
                onClick={() => setIsAddNewItem(false)}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 rounded-xl font-semibold transition-all active:scale-95"
                style={{
                  boxShadow: shadowInner,
                  backgroundColor: "rgba(0,0,0,0.05)",
                  color: textPrimary,
                }}
                onClick={handleCreate}
              >
                Create
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullPageItemType5;

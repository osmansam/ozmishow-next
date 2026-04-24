import { PictureWithStyleType } from "../../shared/types";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import ComponentStyleModalContainer from "../../hooks/componentStyleModal/ComponentStyleModalContainer";

const BackgroundHeader = ({
  header,
  mainMainHeader,
  componentStyle,
  _id,
}: PictureWithStyleType) => {
  return (
    <div className="flex flex-col w-full h-full gap-8" style={componentStyle}>
      <div className="flex justify-end ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          // buraya componentTYpe gelecek
          currentType="type1"
          twoPictureId={_id ?? ""}
          isComponentType={false}
        />
      </div>

      <div className=" flex items-center  justify-center w-full pt-12  ">
        <div className="w-full flex items-center justify-center relative ">
          <div className="z-10 flex ">
            <div>
              <h1
                className="font-semibold text-2xl  md:text-4xl sfont-[Poppins,sans-serif] text-gray-800 capitalize leading-[54px] w-fit px-4 flex flex-row gap-2 justify-center items-center py-0.5 "
                style={mainMainHeader?.style}
              >
                {mainMainHeader?.content}
                <StyleModalContainer
                  styleData={mainMainHeader}
                  twoPictureId={_id ?? ""}
                  componentId={""}
                  contentContainerType="mainHeader"
                  isContentSend={true}
                  type="mainMainHeader"
                />
              </h1>
              <div className="w-24 h-[3px] bg-[#fd7e13]  mx-auto"></div>
            </div>
          </div>

          <h2
            className="absolute font-[600] font-[Poppins,sans-serif] text-5xl md:text-8xl lg:text-[132px] leading-[54px] text-[#dee3e4] uppercase w-full text-center opacity-40 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] rounded-2xl px-4 py-0.5 flex flex-row gap-2 justify-center items-center"
            style={header?.style ? header?.style : {}}
          >
            {header?.content}
            <StyleModalContainer
              styleData={header}
              twoPictureId={_id ?? ""}
              componentId={"0"}
              contentContainerType="header"
              isContentSend={true}
              type="twoPictureIndex"
            />
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BackgroundHeader;

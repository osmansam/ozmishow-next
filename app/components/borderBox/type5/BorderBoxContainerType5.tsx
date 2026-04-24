import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { TwoPictureContainerType } from "../../../shared/types";
import BorderBoxType5 from "./BorderBoxType5";

const BorderBoxContainerType5 = ({
  mainHeader,
  twoPictureArray,
  componentStyle,
  id,
}: TwoPictureContainerType) => {
  return (
    <div className="w-full h-full py-24 bg-[#e0e5ec]" style={componentStyle}>
      <div className="flex justify-end mr-20 mb-8">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType="type5"
          isComponentType={true}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
            <h1
                className="font-bold text-4xl text-[#4d5b7c] mb-2"
                style={{
                    textShadow: "2px 2px 4px rgba(163,177,198,0.6), -2px -2px 4px rgba(255,255,255,0.5)",
                    ...mainHeader?.style
                }}
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {twoPictureArray.map((item, index) => {
            const { img, header } = item;
            return (
              <BorderBoxType5
                key={index}
                img={img}
                header={header}
                _id={id}
                index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BorderBoxContainerType5;

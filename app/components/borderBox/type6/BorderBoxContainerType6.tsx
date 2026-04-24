import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { TwoPictureContainerType } from "../../../shared/types";
import BorderBoxType6 from "./BorderBoxType6";

const BorderBoxContainerType6 = ({
  mainHeader,
  twoPictureArray,
  componentStyle,
  id,
}: TwoPictureContainerType) => {
  return (
    <div className="w-full h-full py-24 bg-white overflow-hidden relative" style={componentStyle}>
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="flex justify-end mr-20 mb-8 relative z-20">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          twoPictureId={id ?? ""}
          currentType="type6"
          isComponentType={true}
        />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
            <h1
                className="font-black text-5xl text-gray-900 mb-4 tracking-tight"
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
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
                Engaging visuals that tell a story.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {twoPictureArray.map((item, index) => {
            const { img, header } = item;
            return (
              <BorderBoxType6
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

export default BorderBoxContainerType6;

import { PictureWithStyleType } from "../../shared/types";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
const ResumeBox = ({
  year1,
  year2,
  header,
  paragraph,
  university,
  _id,
  index,
}: PictureWithStyleType) => {
  return (
    <div className="w-full md:w-1/2 md:px-4 py-4">
      <div className=" py-8 flex flex-col gap-4  border-2 rounded-lg px-2">
        {/* years */}
        <div className="rounded-3xl bg-[#fd7e14] text-center w-fit px-3">
          <div className="flex flex-row">
            <h1
              className="text-white flex flex-row gap-2 justify-center items-center"
              style={year1?.style ?? {}}
            >
              {year1?.content}{" "}
              <StyleModalContainer
                styleData={year1}
                twoPictureId={_id ?? ""}
                componentId={index?.toString() ?? ""}
                contentContainerType="year1"
                isContentSend={true}
                type="resumeBox"
              />
            </h1>
            <h1 className="text-white">-</h1>
            <h1
              className="text-white flex flex-row gap-2 justify-center items-center"
              style={year2?.style ?? {}}
            >
              {year2?.content}{" "}
              <StyleModalContainer
                styleData={year2}
                twoPictureId={_id ?? ""}
                componentId={index?.toString() ?? ""}
                contentContainerType="year2"
                isContentSend={true}
                type="resumeBox"
              />
            </h1>
          </div>
        </div>
        {/* header */}
        <h1
          className="font-[450] w-fit rounded-2xl text-2xl leading-[25px] text-[#252b33] capitalize font-[Poppins, sans-serif]rounded-2xl px-4 py-0.5 flex flex-row gap-2 justify-center items-center"
          style={header?.style}
        >
          {header?.content}
          <StyleModalContainer
            styleData={header}
            twoPictureId={_id ?? ""}
            componentId={index?.toString() ?? ""}
            contentContainerType="header"
            isContentSend={true}
            type="resumeBox"
          />
        </h1>
        {/* university */}
        <p
          className="w-fit text-[#dc3545] font-[Poppins, sans-serif] flex flex-row gap-2 rounded-2xl px-4 py-0.5 justify-center items-center"
          style={university?.style ?? {}}
        >
          {university?.content}
          <StyleModalContainer
            styleData={university}
            twoPictureId={_id ?? ""}
            componentId={index?.toString() ?? ""}
            contentContainerType="university"
            isContentSend={true}
            type="resumeBox"
          />
        </p>
        {/* paragraph */}
        <p
          className="font-[400]  font-[Poppins,sans-serif] text-[#4c4d4d]  leading-[29px] rounded-lg px-2 "
          style={paragraph?.style}
        >
          {paragraph?.content}
        </p>
        {/* ContentModal for editing paragraph */}
        <ContentModalContainer
          content={paragraph}
          twoPictureId={_id ?? ""}
          componentId={index?.toString() ?? ""}
          contentContainerType="paragraph"
          type="resumeBox"
        />
      </div>
    </div>
  );
};

export default ResumeBox;

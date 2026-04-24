import { ReactElement } from "react";
import { PictureWithStyleType } from "../../shared/types";
import { BsFillPaletteFill } from "react-icons/bs";
import { MdDesignServices } from "react-icons/md";
import { HiDesktopComputer } from "react-icons/hi";
import { FaPaintBrush } from "react-icons/fa";
import { AiOutlineAreaChart } from "react-icons/ai";
import { AiTwotoneSound } from "react-icons/ai";
import StyleModalContainer from "../../hooks/styledModal/StyleModalContainer";
import ContentModalContainer from "../../hooks/contentModal/ContentModalContainer";
const ResumeIcon = ({
  header,
  paragraph,
  icon,
  _id,
  index,
}: PictureWithStyleType) => {
  const handleIcon = (icon: string): ReactElement => {
    switch (icon) {
      case "BsFillPaletteFill":
        return <BsFillPaletteFill />;
      case "MdDesignServices":
        return <MdDesignServices />;
      case "HiDesktopComputer":
        return <HiDesktopComputer />;
      case "FaPaintBrush":
        return <FaPaintBrush />;
      case "AiOutlineAreaChart":
        return <AiOutlineAreaChart />;
      case "AiTwotoneSound":
        return <AiTwotoneSound />;
      default:
        return <BsFillPaletteFill />;
    }
  };
  const newIcon = handleIcon(icon ?? "");

  return (
    <div className="flex flex-row gap-4 w-full  md:w-1/2 py-4 px-3 ">
      {/* icon */}
      <div className="h-16 w-16 text-[30px] flex items-center justify-center text-[#fd7e14] bg-white shadow-lg rounded-lg py-2 px-4 font-[Poppins,sans-serif] flex-shrink-0">
        <div style={{ width: "30px", height: "30px" }}>{newIcon}</div>
      </div>
      {/* header and explanation */}
      <div className="flex flex-col gap-2">
        <h1
          className=" font-[500] text-xl leading-[29px] text-[#212529] rounded-2xl px-4 py-0.5 w-fit flex flex-row gap-2 justify-center items-center"
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
        <p
          className="font-[400] text-lg  font-[Poppins,sans-serif] text-[#4c4d4d]  leading-[29px] rounded-lg px-2 "
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

export default ResumeIcon;

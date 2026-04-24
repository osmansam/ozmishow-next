import { useNavigate } from "react-router-dom";
import { PictureWithStyleType } from "../../../shared/types";

const NewsBox = ({
  twoPictureId,
  _id,
  page,
  img,
  header,
  date,
}: PictureWithStyleType) => {
  const navigate = useNavigate();
  const type = "Type1";
  return (
    <div className="w-full md:w-1/2 lg:w-1/3  pr-3 pt-3  ">
      <div
        className="hover:shadow-2xl transition duration-300 flex flex-col gap-10 h-[350px] cursor-pointer"
        style={{ backgroundColor: "#f8f8f9" }}
        onClick={() => {
          navigate(`/news/${twoPictureId}/${_id}/${type}`);
        }}
      >
        <img
          src={img?.content}
          alt={header?.content}
          className="h-1/2 w-full"
        />
        <div className="flex flex-col gap-2 w-3/4 mx-auto">
          <p
            className="font-[400] text-[12px] leading-[19px]"
            style={{ color: "#77797a" }}
          >
            {date ? date : "2021-09-09"}
          </p>
          <h1 className="font-[500] text-2xl leading-7">{header?.content}</h1>
        </div>
      </div>
    </div>
  );
};

export default NewsBox;

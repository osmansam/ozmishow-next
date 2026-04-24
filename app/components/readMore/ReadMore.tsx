import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PictureWithStyleType } from "../../shared/types";
import Footer from "../footer";
import Navbar from "../navbar/Navbar";

const ReadMore = () => {
  const { twoPictureId, index } = useParams<{
    twoPictureId: string;
    index: string;
  }>();
  const [data, setData] = useState<PictureWithStyleType>();
  const getReadMe = async () => {
    const res = await axios.get(
      `http://localhost:3002/api/v1/twoPicture/getReadMe/${twoPictureId}/${index}`
    );
    setData(res.data as PictureWithStyleType);
  };
  useEffect(() => {
    getReadMe();
  }, []);

  return (
    <div>
      <Navbar />
      <div className=" w-5/6 lg:w-3/4  mx-auto flex flex-col py-10 ">
        {/* header */}
        <h1
          className="w-fit  font-[700] text-4xl flex flex-row gap-8 rounded-2xl px-4 py-0.5 justify-center items-center"
          style={data?.header?.style}
        >
          {data?.header?.content}
        </h1>
        {/* img */}

        <img
          src={data?.img?.content}
          alt="img"
          className="  mx-auto lg:h-[450px] sm:h-60 py-10"
        />

        {/* paragraphs */}
        <div className="flex flex-col gap-2 w-full rounded-lg py-1  ">
          {data?.paragraphs?.content?.map((paragraph, index) => (
            <p
              key={index}
              className=" font-[400] leading-6 text-[#333333] rounded-2xl px-2"
              style={data?.paragraphs?.style}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReadMore;

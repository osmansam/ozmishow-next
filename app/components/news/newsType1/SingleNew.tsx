import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { deleteItemInContainer } from "../../../features/twoPicture/twoPictureSlice";
import ContentModalContainer from "../../../hooks/contentModal/ContentModalContainer";
import ImageStyleModalContainer from "../../../hooks/imageStyle/ImageStyleModalContainer";
import StyleModalContainer from "../../../hooks/styledModal/StyleModalContainer";
import { PictureWithStyleType } from "../../../shared/types";
import { RootState, useAppDispatch } from "../../../store";
import Footer from "../../footer";
import Navbar from "../../navbar/Navbar";

const SingleNew = () => {
  const { id, twoPictureId, type } = useParams();
  const dispatch = useAppDispatch();
  const [news, setNews] = useState({} as PictureWithStyleType);

  const { isAdmin } = useSelector((state: RootState) => state.context);
  const getSingleNew = async () => {
    const response = await axios.get(
      `https://ozmishow-back.onrender.com/api/v1/twoPicture/getSingleNew/${twoPictureId}/${id}`
    );
    setNews(response.data.news);
  };
  useEffect(() => {
    getSingleNew();
  }, []);
  const { img, header, paragraphs } = news;
  return (
    <div>
      <Navbar />
      <div className=" w-5/6 lg:w-3/4  mx-auto flex flex-col py-10 ">
        {/* header */}
        <h1
          className="w-fit  font-[700] text-4xl flex flex-row gap-8 rounded-2xl px-4 py-0.5 justify-center items-center"
          style={header?.style}
        >
          {header?.content}
          <StyleModalContainer
            styleData={header}
            twoPictureId={twoPictureId ?? ""}
            componentId={id ?? ""}
            contentContainerType="header"
            isContentSend={true}
            type="explanationBar"
          />
        </h1>
        {/* img */}
        {news.img && (
          <>
            <img
              src={news.img?.content}
              alt="img"
              className="  mx-auto lg:h-[450px] sm:h-60 py-10"
              style={img?.style}
            />
            <ImageStyleModalContainer
              twoPictureId={twoPictureId ?? ""}
              componentId={id ?? ""}
              type="explanationBar"
              styleData={img}
            />
          </>
        )}
        {/* paragraphs */}
        <div className="flex flex-col gap-2 w-full rounded-lg py-1  ">
          {paragraphs?.content?.map((paragraph, index) => (
            <p
              key={index}
              className=" font-[400] leading-6 text-[#333333] rounded-2xl px-2"
              style={paragraphs?.style ? paragraphs?.style : {}}
            >
              {paragraph}
            </p>
          ))}
        </div>
        {/* ContentModal for editing paragraphs */}
        <ContentModalContainer
          content={paragraphs}
          twoPictureId={twoPictureId ?? ""}
          componentId={id ?? ""}
          contentContainerType="paragraphs"
          type="explanationBar"
        />
        {isAdmin && (
          <button
            className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
            onClick={async () => {
              try {
                await dispatch(
                  deleteItemInContainer({
                    id: twoPictureId ? twoPictureId : "",
                    itemId: id ? id : "",
                  })
                );
                window.location.reload();
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Delete
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SingleNew;

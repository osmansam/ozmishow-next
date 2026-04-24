import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  getPageTwoPictures,
  resetTwoPictureArray,
  updateContainer,
} from "../../../features/twoPicture/twoPictureSlice";
import ComponentStyleModalContainer from "../../../hooks/componentStyleModal/ComponentStyleModalContainer";
import PictureContainer from "../../../scenes/ComponentContainer/PictureContainer";
import { newsContainerTypes } from "../../../shared/compenentTypes";
import { NewsContainerType, PictureWithStyleType } from "../../../shared/types";
import { RootState, useAppDispatch } from "../../../store";
import translations from "../../../translations.json";
import Loading from "../../loading";
import { Pagination } from "../../pagination/Pagination";
import NewsBox from "./NewsBox";

const NewsContainer = ({
  id,
  mainHeader,
  componentStyle,
  componentType,
  page,
}: NewsContainerType) => {
  const dispatch = useAppDispatch();
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const { language } = useSelector((state: RootState) => state.context);
  // const [initialRender, setInitialRender] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [news, setNews] = useState<PictureWithStyleType[]>();
  const [isPagination, setIsPagination] = useState(true);
  //getNews function
  const getNews = async () => {
    setIsLoading(true); // Start loading
    const response = await axios.get(
      `https://ozmishow-back.onrender.com/api/v1/twoPicture/getNews/${id}?page=${currentPage}&limit=${limit}`
    );
    setCurrentPage(response.data.currentPage);
    setTotalPages(response.data.totalPages);
    setTotalItems(response.data.totalItems);
    setNews(response.data.news);
    setIsPagination(true);
    setIsLoading(false); // Loading completed
  };

  useEffect(() => {
    getNews();
  }, [currentPage, limit, id]); // Combine currentPage and limit

  const handleSearch = async () => {
    if (search === "") {
      setIsPagination(true);
      getNews();
    } else {
      const response = await axios.get(
        `https://ozmishow-back.onrender.com/api/v1/twoPicture/searchNews/${id}?searchQuery=${search}`
      );
      setIsPagination(false);
      setNews(response.data.news);
    }
  };
  //handle page click
  const handlePageClick = (num: number) => {
    if (num >= 1 && num <= totalPages) {
      // Check if the clicked page is within the valid range
      setCurrentPage(num);
      window.scrollTo(0, 0);
    }
  };
  const { isAdmin } = useSelector((state: RootState) => state.context);
  const handleCreate = async () => {
    await dispatch(updateContainer({ container: twoPictureArray, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray());
    dispatch(getPageTwoPictures(page ?? ""));
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  const [isAddNewItem, setIsAddNewItem] = useState(false);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full flex flex-col gap-4 mx-auto" style={componentStyle}>
      <div className=" w-full flex justify-end mr-20 ">
        <ComponentStyleModalContainer
          styleData={componentStyle}
          isComponentType={true}
          componentTypes={newsContainerTypes}
          currentType={componentType}
          twoPictureId={id ?? ""}
        />
      </div>
      <div className="w-5/6 mx-auto flex justify-end items-center px-4 pt-2 ">
        <input
          type="text"
          placeholder={
            translations[language as keyof typeof translations].search
          }
          className="border rounded-l py-1 px-2 w-32 focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="bg-[#f8f9fa] h-8 rounded-r px-2"
          onClick={handleSearch}
        >
          <FiSearch />
        </button>
      </div>

      <div className="w-5/6 h-full flex-wrap flex  mx-auto py-10  mb-4">
        {news?.map((item, index) => {
          const { img, header, date } = item;
          return (
            <NewsBox
              key={index}
              _id={item._id}
              twoPictureId={id}
              img={img}
              header={header}
              date={date ? date.slice(0, 10) : ""}
            />
          );
        })}
      </div>
      <div className="w-5/6 mx-auto">
        {totalPages > 1 && isPagination && (
          <Pagination
            page={currentPage}
            limitPerPage={10}
            itemsCount={totalItems}
            totalPages={totalPages}
            handleClick={handlePageClick}
          />
        )}
      </div>
      {!isAddNewItem && isAdmin && (
        <button
          className="capitalize border-2 w-fit p-2 rounded-lg mx-auto mt-4 pointer hover:bg-slate-300"
          onClick={() => setIsAddNewItem(true)}
        >
          Add New item
        </button>
      )}
      {isAddNewItem && isAdmin && (
        <div className="flex flex-col justify-between gap-4">
          <PictureContainer
            isPictureContainerImage={true}
            isPictureContainerButton={false}
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

export default NewsContainer;

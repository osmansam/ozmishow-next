import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useSelector } from "react-redux";
import {
  getPageTwoPictures,
  resetTwoPictureArray,
  updateContainer,
} from "../../../features/twoPicture/twoPictureSlice";
import PictureContainer from "../../../scenes/ComponentContainer/PictureContainer";
import { NewsContainerType, PictureType } from "../../../shared/types";
import { RootState, useAppDispatch } from "../../../store";
import translations from "../../../translations.json";
import { Pagination } from "../../pagination/Pagination";
import NewsBox3 from "./NewsBox3";

const NewsContainer3 = ({ id, mainHeader, page }: NewsContainerType) => {
  const dispatch = useAppDispatch();
  const { twoPictureArray } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const { language } = useSelector((state: RootState) => state.context);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [limit, setLimit] = useState(4);

  const [news, setNews] = useState<PictureType[]>();
  const [isPagination, setIsPagination] = useState(true);
  //getNews function
  const getNews = async () => {
    const response = await axios.get(
      `https://ozmishow-back.onrender.com/api/v1/twoPicture/getNews/${id}?page=${currentPage}&limit=${limit}`
    );
    setCurrentPage(response.data.currentPage);
    setTotalPages(response.data.totalPages);
    setTotalItems(response.data.totalItems);
    setNews(response.data.news);
  };
  //set the news when the page first rendered
  useEffect(() => {
    setIsPagination(true);
    getNews();
  }, [currentPage, limit, id]);

  //handle search

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
  return (
    <div className="w-full flex flex-col gap-4 mx-auto">
      <div className="w-5/6 mx-auto flex justify-end  px-4 pt-2 ">
        <input
          type="text"
          placeholder={
            translations[language as keyof typeof translations].search
          }
          className="border rounded-l py-1 px-2 w-32  focus:outline-none"
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

      <div className="w-5/6 h-full flex-col flex  mx-auto py-10  mb-4">
        {news?.map((item, index) => {
          const { img, header, date, paragraphs } = item;
          return (
            <NewsBox3
              key={index}
              _id={item._id}
              twoPictureId={id}
              img={img}
              header={header}
              paragraphs={paragraphs}
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

export default NewsContainer3;

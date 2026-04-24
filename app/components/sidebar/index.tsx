import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { setIsSidebarOpen } from "../../features/context/contextSlice";
import { getNavbar } from "../../features/twoPicture/twoPictureSlice";
import { useNavigate } from "react-router-dom";
import { LanguageOptions, PageOptionsType } from "../../shared/types";

type Props = {
  currentPage: string;
};

const Sidebar = ({ currentPage }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isSidebarOpen = useSelector(
    (state: RootState) => state.context?.isSidebarOpen || false
  );
  const { pageOptions, logo } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const { language } = useSelector((state: RootState) => state.context);

  const [activeMotherPage, setActiveMotherPage] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) {
        dispatch(setIsSidebarOpen(false));
      }
    };
    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup by removing event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  // Get subpages for a given mother page
  const getSubpages = (motherPage: string): PageOptionsType[] => {
    return pageOptions.filter(
      (item) =>
        item.motherPageEN === motherPage || item.motherPageTR === motherPage
    );
  };

  // Render subpages recursively
  const renderSubpages = (subpages: PageOptionsType[]) => {
    return subpages.map((subpage, index) => (
      <li
        key={index}
        className={`pl-8 py-2 m-2 text-white cursor-pointer hover:underline ${
          currentPage === subpage.pageNameEN &&
          "bg-[#9f000f] text-black rounded-md hover:no-underline"
        }`}
        onClick={() => navigate(`/${subpage.pageNameEN}`)}
      >
        {language === LanguageOptions.EN
          ? subpage.pageNameEN
          : subpage.pageNameTR}
      </li>
    ));
  };

  // Render navigation links
  const renderNavigationLinks = () => {
    return pageOptions.map((page, index) => {
      if (page.isNavbar) {
        const subpages = getSubpages(page.pageNameEN);
        const isActiveMotherPage = activeMotherPage === page.pageNameEN;
        return (
          <React.Fragment key={index}>
            <li
              className={`pl-4 py-2 m-2 text-white uppercase cursor-pointer hover:underline ${
                currentPage === page.pageNameEN &&
                "bg-[#9f000f] text-black rounded-md hover:no-underline"
              }`}
              onClick={() => {
                if (subpages.length > 0) {
                  setActiveMotherPage(
                    isActiveMotherPage ? "" : page.pageNameEN
                  );
                } else {
                  navigate(`/${page.pageNameEN}`);
                }
              }}
            >
              {language === LanguageOptions.EN
                ? page.pageNameEN
                : page.pageNameTR}
            </li>
            {isActiveMotherPage && (
              <ul className="pl-4">{renderSubpages(subpages)}</ul>
            )}
          </React.Fragment>
        );
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    dispatch(getNavbar());
  }, [dispatch]);

  return (
    <div className="z-40">
      <div className={`${isSidebarOpen ? "" : "hidden"}  z-30`}>
        <div
          className={`${
            isSidebarOpen ? "" : "hidden"
          } lg:hidden fixed top-0 w-full h-full z-10`}
          onClick={() => dispatch(setIsSidebarOpen(false))}
        ></div>
        <div className="w-[250px] lg:w-1/6 h-screen bg-[#343a3b] fixed flex flex-col z-50">
          {/* image  */}
          <div className="mx-auto">
            <img
              className="py-2 cursor-pointer rounded-xl h-36 bg-[#343a3b]"
              src={logo ? logo : "https://via.placeholder.com/150"}
              alt="logo"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <ul className="w-3/4 my-auto flex flex-col justify-between mx-auto pt-4 overflow-y-auto no-scrollbar py-8">
            {renderNavigationLinks()}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

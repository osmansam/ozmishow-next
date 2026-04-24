import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaBars } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
    setIsAdmin,
    setIsSidebarOpen,
    setLanguage,
} from "../../features/context/contextSlice";
import {
    deletePage,
    getNavbar,
} from "../../features/twoPicture/twoPictureSlice";
import { logout } from "../../features/user/userSlice";
import ConfirmationModal from "../../hooks/confirmation";
import { LanguageOptions, PageOptionsType } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";

type Props = {
  currentPage?: PageOptionsType;
};

const Navbar1 = ({ currentPage }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { pageOptions, logo } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const { language, isSidebarOpen } = useSelector(
    (state: RootState) => state.context
  );
  const handleCancelDelete = () => {
    setShowConfirmationModal(false);
  };
  const handleConfirmDelete = async (id: string) => {
    await dispatch(deletePage(id));
    navigate("/");
  };
  useEffect(() => {
    dispatch(getNavbar());
  }, [dispatch]);
  const renderSubpages = (page: string) => {
    return pageOptions.filter(
      (item) => item.motherPageEN === page || item.motherPageTR === page
    );
  };
  const { isAdmin } = useSelector((state: RootState) => state.context);

  return (
    <nav className="bg-white shadow-md">
      {/* Top section - Logo centered, language on right */}
      <div className="w-full border-b border-gray-200">
        <div className="w-5/6 mx-auto flex flex-row justify-between items-center py-4">
          {/* Empty space for balance */}
          <div className="w-1/4"></div>
          
          {/* Centered logo */}
          <div className="flex justify-center w-2/4">
            <img
              className="cursor-pointer h-24 object-contain"
              src={logo ? logo : "https://via.placeholder.com/150"}
              alt="logo"
              onClick={() => {
                isAdmin ? navigate("/admin") : navigate("/");
              }}
            />
          </div>
          
          {/* Language options and logout */}
          <div className="w-1/4 flex justify-end">
            <ul className="flex flex-row gap-2 items-center">
              {Object.values(LanguageOptions).map((option, index) => (
                <li
                  key={index}
                  className={`h-8 flex items-center rounded-full px-4 cursor-pointer transition-all duration-300 ${
                    option === language
                      ? "bg-[#9f000f] text-white shadow-lg"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                  onClick={() => dispatch(setLanguage(option))}
                >
                  {option.toUpperCase()}
                </li>
              ))}
              {isAdmin && (
                <button
                  className="border-2 border-gray-300 px-4 rounded-full hover:bg-gray-100 cursor-pointer h-8 flex items-center transition-all duration-300"
                  onClick={async () => {
                    await dispatch(logout(user.userId));
                    dispatch(setIsAdmin(false));
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Navigation links section */}
      <div className="w-full">
        {/* Mobile menu button */}
        <div className="w-5/6 mx-auto flex justify-end lg:hidden py-4">
          <FaBars
            className="w-8 h-6 cursor-pointer text-gray-700"
            onClick={() => {
              dispatch(setIsSidebarOpen(!isSidebarOpen));
            }}
          />
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:block">
          <ul className="w-5/6 flex flex-row justify-center mx-auto gap-1 py-4">
            {pageOptions.map(
              (page, index) =>
                page.isNavbar && (
                  <div
                    key={index}
                    onMouseEnter={() => setIsHover(page._id)}
                    onMouseLeave={() => setIsHover("")}
                    className="relative"
                  >
                    <div className="flex flex-row items-center gap-2">
                      <li
                        className={`px-6 py-3 uppercase cursor-pointer transition-all duration-300 font-medium text-sm tracking-wide ${
                          (currentPage?.pageNameEN === page.pageNameEN ||
                            currentPage?.motherPageEN === page.pageNameEN)
                            ? "bg-[#9f000f] text-white rounded-lg shadow-md"
                            : "text-gray-700 hover:text-[#9f000f] hover:bg-gray-50 rounded-lg"
                        }`}
                        onClick={() => {
                          if (!page.hasSubpage) {
                            navigate(`/${page.pageNameEN}`);
                          }
                        }}
                      >
                        {language === LanguageOptions.EN
                          ? page.pageNameEN
                          : page.pageNameTR}
                      </li>
                      {isAdmin && user.role === "superAdmin" && (
                        <div>
                          {showConfirmationModal && (
                            <ConfirmationModal
                              onConfirm={() => handleConfirmDelete(page._id)}
                              onCancel={handleCancelDelete}
                            />
                          )}
                          <AiOutlineDelete
                            className="w-5 h-5 cursor-pointer text-gray-500 hover:text-[#e1241b] transition-colors duration-300"
                            onClick={async () => {
                              setShowConfirmationModal(true);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {isHover === page._id && page.hasSubpage && (
                      <div className="absolute top-full left-0 z-50 min-w-[200px] bg-white rounded-lg shadow-xl border border-gray-100">
                        {(() => {
                          const subpages = renderSubpages(page.pageNameEN);
                          return (
                            <ul 
                              className="py-2"
                              onMouseEnter={() => setIsHover(page._id)}
                            >
                              {subpages.map((subpage, index) => (
                                <li
                                  key={index}
                                  className="px-6 py-3 cursor-pointer text-gray-600 hover:text-[#e1241b] hover:bg-gray-50 transition-all duration-300"
                                  onClick={() => {
                                    if (!subpage.hasSubpage) {
                                      navigate(`/${subpage.pageNameEN}`);
                                    }
                                  }}
                                >
                                  {language === LanguageOptions.EN
                                    ? subpage.pageNameEN
                                    : subpage.pageNameTR}
                                </li>
                              ))}
                            </ul>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;

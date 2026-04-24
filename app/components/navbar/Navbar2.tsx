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

const Navbar2 = ({ currentPage }: Props) => {
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
    <nav className="bg-gradient-to-r from-gray-50 to-white shadow-lg">
      {/* Single row layout - Logo left, Menu center, Controls right */}
      <div className="w-full">
        <div className="w-11/12 mx-auto py-6">
          <div className="flex flex-row justify-between items-center">
            {/* Logo on the left */}
            <div className="flex-shrink-0">
              <img
                className="cursor-pointer h-20 object-contain hover:scale-105 transition-transform duration-300"
                src={logo ? logo : "https://via.placeholder.com/150"}
                alt="logo"
                onClick={() => {
                  isAdmin ? navigate("/admin") : navigate("/");
                }}
              />
            </div>

            {/* Navigation links in center - Desktop only */}
            <div className="hidden lg:flex flex-1 justify-center">
              <ul className="flex flex-row gap-2 items-center">
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
                            className={`px-5 py-2 uppercase cursor-pointer transition-all duration-300 font-semibold text-xs tracking-wider border-b-2 ${
                              (currentPage?.pageNameEN === page.pageNameEN ||
                                currentPage?.motherPageEN === page.pageNameEN)
                                ? "border-[#9f000f] text-[#9f000f]"
                                : "border-transparent text-gray-600 hover:text-[#9f000f] hover:border-gray-300"
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
                                className="w-4 h-4 cursor-pointer text-gray-400 hover:text-[#e1241b] transition-colors duration-300"
                                onClick={async () => {
                                  setShowConfirmationModal(true);
                                }}
                              />
                            </div>
                          )}
                        </div>

                        {isHover === page._id && page.hasSubpage && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 min-w-[220px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
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
                                      className="px-6 py-3 cursor-pointer text-gray-700 hover:text-white hover:bg-[#9f000f] transition-all duration-300 font-medium"
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

            {/* Language and controls on the right */}
            <div className="flex items-center gap-4">
              <ul className="hidden md:flex flex-row gap-2 items-center">
                {Object.values(LanguageOptions).map((option, index) => (
                  <li
                    key={index}
                    className={`h-9 w-9 flex items-center justify-center rounded-md cursor-pointer transition-all duration-300 font-bold text-xs ${
                      option === language
                        ? "bg-[#9f000f] text-white shadow-md scale-110"
                        : "bg-white border-2 border-gray-300 text-gray-600 hover:border-[#9f000f] hover:text-[#9f000f]"
                    }`}
                    onClick={() => dispatch(setLanguage(option))}
                  >
                    {option.toUpperCase()}
                  </li>
                ))}
                {isAdmin && (
                  <button
                    className="border-2 border-[#9f000f] text-[#9f000f] px-5 py-2 rounded-md hover:bg-[#9f000f] hover:text-white cursor-pointer transition-all duration-300 font-semibold text-sm"
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

              {/* Mobile menu button */}
              <FaBars
                className="w-7 h-7 lg:hidden cursor-pointer text-gray-700 hover:text-[#9f000f] transition-colors duration-300"
                onClick={() => {
                  dispatch(setIsSidebarOpen(!isSidebarOpen));
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar2;

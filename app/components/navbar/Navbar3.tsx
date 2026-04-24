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

const Navbar3 = ({ currentPage }: Props) => {
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
    <nav className="bg-white">
      {/* Minimal floating design with compact elements */}
      <div className="w-full py-4">
        <div className="w-11/12 mx-auto">
          <div className="flex flex-row justify-between items-center">
            {/* Compact logo icon */}
            <div className="flex-shrink-0">
              <img
                className="cursor-pointer h-14 w-14 object-cover rounded-full shadow-md hover:shadow-xl transition-shadow duration-300 ring-2 ring-gray-200"
                src={logo ? logo : "https://via.placeholder.com/150"}
                alt="logo"
                onClick={() => {
                  isAdmin ? navigate("/admin") : navigate("/");
                }}
              />
            </div>

            {/* Floating pill-shaped navigation items - Desktop */}
            <div className="hidden lg:flex flex-1 justify-center">
              <div className="bg-gray-100 rounded-full px-4 py-2 shadow-sm">
                <ul className="flex flex-row gap-1 items-center">
                  {pageOptions.map(
                    (page, index) =>
                      page.isNavbar && (
                        <div
                          key={index}
                          onMouseEnter={() => setIsHover(page._id)}
                          onMouseLeave={() => setIsHover("")}
                          className="relative"
                        >
                          <div className="flex flex-row items-center gap-1">
                            <li
                              className={`px-4 py-2 uppercase cursor-pointer transition-all duration-300 font-medium text-xs tracking-wide rounded-full ${
                                (currentPage?.pageNameEN === page.pageNameEN ||
                                  currentPage?.motherPageEN === page.pageNameEN)
                                  ? "bg-[#9f000f] text-white shadow-md"
                                  : "text-gray-700 hover:bg-white hover:shadow-sm"
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
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 min-w-[180px] bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                              {(() => {
                                const subpages = renderSubpages(page.pageNameEN);
                                return (
                                  <ul
                                    className="py-1"
                                    onMouseEnter={() => setIsHover(page._id)}
                                  >
                                    {subpages.map((subpage, index) => (
                                      <li
                                        key={index}
                                        className="px-5 py-2 cursor-pointer text-sm text-gray-600 hover:text-[#9f000f] hover:bg-gray-50 transition-all duration-300"
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

            {/* Compact controls on the right */}
            <div className="flex items-center gap-2">
              <ul className="hidden md:flex flex-row gap-1 items-center bg-gray-100 rounded-full px-2 py-1">
                {Object.values(LanguageOptions).map((option, index) => (
                  <li
                    key={index}
                    className={`h-7 w-7 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 font-bold text-[10px] ${
                      option === language
                        ? "bg-[#9f000f] text-white"
                        : "text-gray-600 hover:bg-white"
                    }`}
                    onClick={() => dispatch(setLanguage(option))}
                  >
                    {option.toUpperCase()}
                  </li>
                ))}
              </ul>
              
              {isAdmin && (
                <button
                  className="hidden md:block bg-gray-100 text-gray-700 px-4 py-2 rounded-full hover:bg-[#9f000f] hover:text-white cursor-pointer transition-all duration-300 font-semibold text-xs"
                  onClick={async () => {
                    await dispatch(logout(user.userId));
                    dispatch(setIsAdmin(false));
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              )}

              {/* Mobile menu button */}
              <FaBars
                className="w-6 h-6 lg:hidden cursor-pointer text-gray-700 hover:text-[#9f000f] transition-colors duration-300"
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

export default Navbar3;

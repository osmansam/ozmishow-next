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

const NavbarIllustration = ({ currentPage }: Props) => {
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
    <nav className="bg-gradient-to-r from-purple-50 via-pink-50 to-blue-50 border-b-4 border-purple-300">
      <div className="w-5/6 mx-auto">
        <div className="flex flex-row justify-between items-center py-4">
          {/* Logo with playful decoration */}
          <div className="flex items-center gap-3">
            <div className="relative">
              {/* Decorative circles */}
              <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
              <img
                className="cursor-pointer h-16 object-contain relative z-10"
                src={logo ? logo : "https://via.placeholder.com/150"}
                alt="logo"
                onClick={() => {
                  isAdmin ? navigate("/admin") : navigate("/");
                }}
              />
            </div>
            {/* Decorative wave */}
            <svg className="w-12 h-8" viewBox="0 0 100 50" fill="none">
              <path d="M0 25 Q 25 10, 50 25 T 100 25" stroke="#a855f7" strokeWidth="3" fill="none"/>
            </svg>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex flex-row gap-3">
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
                          className={`px-5 py-2 text-sm font-bold uppercase cursor-pointer transition-all duration-300 rounded-full relative overflow-hidden ${
                            (currentPage?.pageNameEN === page.pageNameEN ||
                              currentPage?.motherPageEN === page.pageNameEN)
                              ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
                              : "bg-white text-purple-600 hover:bg-purple-100 shadow-md hover:shadow-lg hover:transform hover:scale-105"
                          }`}
                          onClick={() => {
                            if (!page.hasSubpage) {
                              navigate(`/${page.pageNameEN}`);
                            }
                          }}
                        >
                          {/* Decorative sparkle */}
                          {(currentPage?.pageNameEN === page.pageNameEN ||
                            currentPage?.motherPageEN === page.pageNameEN) && (
                            <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></span>
                          )}
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
                              className="w-4 h-4 cursor-pointer text-purple-300 hover:text-red-500 transition-colors duration-300"
                              onClick={async () => {
                                setShowConfirmationModal(true);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {isHover === page._id && page.hasSubpage && (
                        <div className="absolute top-full left-0 z-50 min-w-[200px] bg-white rounded-2xl shadow-2xl mt-2 border-2 border-purple-200 overflow-hidden">
                          {/* Decorative header */}
                          <div className="h-2 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"></div>
                          {(() => {
                            const subpages = renderSubpages(page.pageNameEN);
                            return (
                              <ul className="flex flex-col py-2">
                                {subpages.map((subpage, index) => (
                                  <li
                                    key={index}
                                    className="px-6 py-3 cursor-pointer text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all duration-300 flex items-center gap-2"
                                    onClick={() => {
                                      if (!subpage.hasSubpage) {
                                        navigate(`/${subpage.pageNameEN}`);
                                      }
                                    }}
                                  >
                                    <span className="w-2 h-2 bg-pink-400 rounded-full"></span>
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

            {/* Language & Actions */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2 bg-white rounded-full p-1 shadow-md">
                {Object.values(LanguageOptions).map((option, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 ${
                      option === language
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                        : "text-purple-600 hover:bg-purple-50"
                    }`}
                    onClick={() => dispatch(setLanguage(option))}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
              
              {isAdmin && (
                <button
                  className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-5 py-2 rounded-full text-sm font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  onClick={async () => {
                    await dispatch(logout(user.userId));
                    dispatch(setIsAdmin(false));
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <div className="bg-white p-3 rounded-full shadow-md">
              <FaBars
                className="w-5 h-5 cursor-pointer text-purple-600"
                onClick={() => {
                  dispatch(setIsSidebarOpen(!isSidebarOpen));
                }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative bottom wave */}
      <svg className="w-full h-4" viewBox="0 0 1200 20" preserveAspectRatio="none">
        <path d="M0 10 Q 300 0, 600 10 T 1200 10 L 1200 20 L 0 20 Z" fill="#a855f7" opacity="0.1"/>
      </svg>
    </nav>
  );
};

export default NavbarIllustration;

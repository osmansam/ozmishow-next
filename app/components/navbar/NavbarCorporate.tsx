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

const NavbarCorporate = ({ currentPage }: Props) => {
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
    <nav className="bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg">
      {/* Top bar with contact info */}
      <div className="bg-slate-900 border-b border-slate-700">
        <div className="w-5/6 mx-auto flex justify-end py-2">
          <div className="flex items-center gap-6 text-xs text-slate-300">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              info@company.com
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +1 (555) 123-4567
            </span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="w-5/6 mx-auto">
        <div className="flex flex-row justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="cursor-pointer h-16 object-contain brightness-0 invert"
              src={logo ? logo : "https://via.placeholder.com/150"}
              alt="logo"
              onClick={() => {
                isAdmin ? navigate("/admin") : navigate("/");
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <ul className="flex flex-row gap-1">
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
                          className={`px-5 py-3 text-sm font-semibold uppercase cursor-pointer transition-all duration-300 ${
                            (currentPage?.pageNameEN === page.pageNameEN ||
                              currentPage?.motherPageEN === page.pageNameEN)
                              ? "bg-blue-600 text-white"
                              : "text-slate-200 hover:bg-slate-700"
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
                              className="w-4 h-4 cursor-pointer text-slate-400 hover:text-red-400 transition-colors duration-300"
                              onClick={async () => {
                                setShowConfirmationModal(true);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {isHover === page._id && page.hasSubpage && (
                        <div className="absolute top-full left-0 z-50 min-w-[220px] bg-slate-800 shadow-xl mt-0">
                          {(() => {
                            const subpages = renderSubpages(page.pageNameEN);
                            return (
                              <ul className="flex flex-col py-2">
                                {subpages.map((subpage, index) => (
                                  <li
                                    key={index}
                                    className="px-6 py-3 cursor-pointer text-slate-200 hover:bg-blue-600 hover:text-white transition-all duration-300 border-l-4 border-transparent hover:border-blue-400"
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

            {/* Language & Actions */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1 bg-slate-700 rounded-md p-1">
                {Object.values(LanguageOptions).map((option, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 text-xs font-medium rounded transition-all duration-300 ${
                      option === language
                        ? "bg-blue-600 text-white"
                        : "text-slate-300 hover:text-white"
                    }`}
                    onClick={() => dispatch(setLanguage(option))}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
              
              {isAdmin && (
                <button
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-300"
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
            <FaBars
              className="w-6 h-6 cursor-pointer text-white"
              onClick={() => {
                dispatch(setIsSidebarOpen(!isSidebarOpen));
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarCorporate;

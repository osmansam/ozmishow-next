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

const Navbar5 = ({ currentPage }: Props) => {
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
    <nav 
      className="relative"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.18)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)'
      }}
    >
      {/* Glassmorphism navbar with modern aesthetics */}
      <div className="w-full py-5">
        <div className="w-11/12 mx-auto">
          {/* Top row - Logo and controls */}
          <div className="flex flex-row justify-between items-center mb-6">
            {/* Logo with glow effect */}
            <div className="flex-shrink-0">
              <img
                className="cursor-pointer h-16 object-contain hover:scale-110 transition-all duration-500"
                src={logo ? logo : "https://via.placeholder.com/150"}
                alt="logo"
                style={{
                  filter: 'drop-shadow(0 0 10px rgba(159, 0, 15, 0.3))'
                }}
                onClick={() => {
                  isAdmin ? navigate("/admin") : navigate("/");
                }}
              />
            </div>

            {/* Language and controls with glass effect */}
            <div className="flex items-center gap-3">
              <ul className="hidden md:flex flex-row gap-2 items-center">
                {Object.values(LanguageOptions).map((option, index) => (
                  <li
                    key={index}
                    className={`h-10 w-10 flex items-center justify-center rounded-xl cursor-pointer transition-all duration-300 font-bold text-xs backdrop-blur-md ${
                      option === language
                        ? "bg-gradient-to-br from-[#9f000f] to-[#e1241b] text-white shadow-lg"
                        : "bg-white/20 text-gray-700 hover:bg-white/40 border border-white/30"
                    }`}
                    style={{
                      boxShadow: option === language 
                        ? '0 4px 15px rgba(159, 0, 15, 0.4)' 
                        : '0 2px 10px rgba(0, 0, 0, 0.1)'
                    }}
                    onClick={() => dispatch(setLanguage(option))}
                  >
                    {option.toUpperCase()}
                  </li>
                ))}
                {isAdmin && (
                  <button
                    className="px-5 py-2 rounded-xl cursor-pointer transition-all duration-300 font-semibold text-sm backdrop-blur-md bg-white/20 text-gray-700 hover:bg-gradient-to-br hover:from-[#9f000f] hover:to-[#e1241b] hover:text-white border border-white/30"
                    style={{
                      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
                    }}
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

          {/* Navigation links with glass cards - Desktop */}
          <div className="hidden lg:block">
            <ul className="flex flex-row justify-center gap-3 flex-wrap">
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
                          className={`px-6 py-3 uppercase cursor-pointer transition-all duration-300 font-semibold text-xs tracking-wider rounded-xl backdrop-blur-md ${
                            (currentPage?.pageNameEN === page.pageNameEN ||
                              currentPage?.motherPageEN === page.pageNameEN)
                              ? "bg-gradient-to-br from-[#9f000f] to-[#e1241b] text-white"
                              : "bg-white/30 text-gray-700 hover:bg-white/50 border border-white/40"
                          }`}
                          style={{
                            boxShadow: (currentPage?.pageNameEN === page.pageNameEN ||
                              currentPage?.motherPageEN === page.pageNameEN)
                              ? '0 4px 15px rgba(159, 0, 15, 0.4)'
                              : '0 2px 10px rgba(0, 0, 0, 0.1)'
                          }}
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
                        <div 
                          className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 min-w-[220px] rounded-2xl overflow-hidden backdrop-blur-xl border border-white/30"
                          style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                          }}
                        >
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
                                    className="px-6 py-3 cursor-pointer text-gray-700 hover:text-white hover:bg-gradient-to-r hover:from-[#9f000f] hover:to-[#e1241b] transition-all duration-300 font-medium"
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
      </div>
    </nav>
  );
};

export default Navbar5;

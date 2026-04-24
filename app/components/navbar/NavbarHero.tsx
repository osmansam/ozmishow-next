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

const NavbarHero = ({ currentPage }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [dispatch]);
  
  const renderSubpages = (page: string) => {
    return pageOptions.filter(
      (item) => item.motherPageEN === page || item.motherPageTR === page
    );
  };
  const { isAdmin } = useSelector((state: RootState) => state.context);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-md shadow-2xl py-3' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="w-5/6 mx-auto">
        <div className="flex flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className={`cursor-pointer object-contain transition-all duration-500 ${
                scrolled ? 'h-12 brightness-0 invert' : 'h-16 brightness-0 invert'
              }`}
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
                      <div className="flex flex-row items-center gap-2">
                        <li
                          className={`px-5 py-2 text-sm font-medium uppercase cursor-pointer transition-all duration-300 relative group ${
                            (currentPage?.pageNameEN === page.pageNameEN ||
                              currentPage?.motherPageEN === page.pageNameEN)
                              ? "text-white"
                              : "text-white/80 hover:text-white"
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
                          {/* Animated underline */}
                          <span 
                            className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                              (currentPage?.pageNameEN === page.pageNameEN ||
                                currentPage?.motherPageEN === page.pageNameEN)
                                ? "w-full"
                                : "w-0 group-hover:w-full"
                            }`}
                          ></span>
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
                              className="w-4 h-4 cursor-pointer text-white/50 hover:text-red-400 transition-colors duration-300"
                              onClick={async () => {
                                setShowConfirmationModal(true);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {isHover === page._id && page.hasSubpage && (
                        <div className="absolute top-full left-0 z-50 min-w-[200px] bg-black/95 backdrop-blur-md mt-2 rounded-lg overflow-hidden shadow-2xl">
                          {(() => {
                            const subpages = renderSubpages(page.pageNameEN);
                            return (
                              <ul className="flex flex-col py-2">
                                {subpages.map((subpage, index) => (
                                  <li
                                    key={index}
                                    className="px-6 py-3 cursor-pointer text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 relative group"
                                    onClick={() => {
                                      if (!subpage.hasSubpage) {
                                        navigate(`/${subpage.pageNameEN}`);
                                      }
                                    }}
                                  >
                                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-white transition-all duration-300 group-hover:h-full"></span>
                                    <span className="pl-2">
                                      {language === LanguageOptions.EN
                                        ? subpage.pageNameEN
                                        : subpage.pageNameTR}
                                    </span>
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
              <div className="flex gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
                {Object.values(LanguageOptions).map((option, index) => (
                  <button
                    key={index}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-300 ${
                      option === language
                        ? "bg-white text-black"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                    onClick={() => dispatch(setLanguage(option))}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
              
              {isAdmin && (
                <button
                  className="border border-white/30 hover:bg-white hover:text-black text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 backdrop-blur-sm"
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
            <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
              <FaBars
                className="w-5 h-5 cursor-pointer text-white"
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

export default NavbarHero;

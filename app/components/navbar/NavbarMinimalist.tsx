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

const NavbarMinimalist = ({ currentPage }: Props) => {
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
    <nav className="bg-white border-b border-gray-100 py-4">
      <div className="w-11/12 mx-auto flex flex-row justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <img
            className="cursor-pointer h-12 object-contain grayscale hover:grayscale-0 transition-all duration-500"
            src={logo ? logo : "https://via.placeholder.com/150"}
            alt="logo"
            onClick={() => {
              isAdmin ? navigate("/admin") : navigate("/");
            }}
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <ul className="flex flex-row gap-8">
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
                        className={`text-sm tracking-widest uppercase cursor-pointer transition-colors duration-300 ${
                          (currentPage?.pageNameEN === page.pageNameEN ||
                            currentPage?.motherPageEN === page.pageNameEN)
                            ? "text-black font-semibold border-b-2 border-black"
                            : "text-gray-500 hover:text-black"
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
                            className="w-4 h-4 cursor-pointer text-gray-300 hover:text-red-500 transition-colors duration-300"
                            onClick={async () => {
                              setShowConfirmationModal(true);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {isHover === page._id && page.hasSubpage && (
                      <div className="absolute top-full left-0 z-50 min-w-[180px] bg-white border border-gray-100 shadow-sm mt-4 py-2">
                        {(() => {
                          const subpages = renderSubpages(page.pageNameEN);
                          return (
                            <ul className="flex flex-col">
                              {subpages.map((subpage, index) => (
                                <li
                                  key={index}
                                  className="px-6 py-2 text-xs uppercase tracking-wider cursor-pointer text-gray-500 hover:text-black hover:bg-gray-50 transition-all duration-300"
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
          <div className="flex items-center gap-4 border-l border-gray-200 pl-4">
            <div className="flex gap-2 text-xs font-medium">
              {Object.values(LanguageOptions).map((option, index) => (
                <span
                  key={index}
                  className={`cursor-pointer px-2 py-1 ${
                    option === language
                      ? "text-black underline"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  onClick={() => dispatch(setLanguage(option))}
                >
                  {option.toUpperCase()}
                </span>
              ))}
            </div>
            
            {isAdmin && (
              <button
                className="text-xs uppercase tracking-wider border border-black px-3 py-1 hover:bg-black hover:text-white transition-all duration-300"
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
            className="w-6 h-6 cursor-pointer text-black"
            onClick={() => {
              dispatch(setIsSidebarOpen(!isSidebarOpen));
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavbarMinimalist;

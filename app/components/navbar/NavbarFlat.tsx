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

const NavbarFlat = ({ currentPage }: Props) => {
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
    <nav className="bg-indigo-600">
      <div className="w-5/6 mx-auto">
        <div className="flex flex-row justify-between items-center py-5">
          {/* Logo */}
          <div className="flex items-center">
            <img
              className="cursor-pointer h-14 object-contain brightness-0 invert"
              src={logo ? logo : "https://via.placeholder.com/150"}
              alt="logo"
              onClick={() => {
                isAdmin ? navigate("/admin") : navigate("/");
              }}
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex flex-row gap-2">
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
                          className={`px-6 py-2 text-sm font-medium uppercase cursor-pointer transition-colors duration-200 ${
                            (currentPage?.pageNameEN === page.pageNameEN ||
                              currentPage?.motherPageEN === page.pageNameEN)
                              ? "bg-white text-indigo-600"
                              : "text-white hover:bg-indigo-500"
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
                              className="w-4 h-4 cursor-pointer text-indigo-200 hover:text-red-300 transition-colors duration-200"
                              onClick={async () => {
                                setShowConfirmationModal(true);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {isHover === page._id && page.hasSubpage && (
                        <div className="absolute top-full left-0 z-50 min-w-[200px] bg-white mt-0">
                          {(() => {
                            const subpages = renderSubpages(page.pageNameEN);
                            return (
                              <ul className="flex flex-col">
                                {subpages.map((subpage, index) => (
                                  <li
                                    key={index}
                                    className="px-6 py-3 cursor-pointer text-indigo-600 hover:bg-indigo-50 transition-colors duration-200"
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
            <div className="flex items-center gap-3">
              <div className="flex gap-1">
                {Object.values(LanguageOptions).map((option, index) => (
                  <button
                    key={index}
                    className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                      option === language
                        ? "bg-white text-indigo-600"
                        : "bg-indigo-500 text-white hover:bg-indigo-400"
                    }`}
                    onClick={() => dispatch(setLanguage(option))}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
              
              {isAdmin && (
                <button
                  className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 text-sm font-medium transition-colors duration-200"
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

export default NavbarFlat;

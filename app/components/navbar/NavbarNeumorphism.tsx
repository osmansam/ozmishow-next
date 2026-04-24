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

const NavbarNeumorphism = ({ currentPage }: Props) => {
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
    <nav className="bg-gray-100 py-6" style={{ boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff' }}>
      <div className="w-5/6 mx-auto">
        <div className="flex flex-row justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <div className="p-3 rounded-2xl" style={{ boxShadow: '8px 8px 16px #bebebe, -8px -8px 16px #ffffff' }}>
              <img
                className="cursor-pointer h-12 object-contain"
                src={logo ? logo : "https://via.placeholder.com/150"}
                alt="logo"
                onClick={() => {
                  isAdmin ? navigate("/admin") : navigate("/");
                }}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <ul className="flex flex-row gap-4">
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
                          className={`px-6 py-3 text-sm font-medium uppercase cursor-pointer transition-all duration-300 rounded-xl ${
                            (currentPage?.pageNameEN === page.pageNameEN ||
                              currentPage?.motherPageEN === page.pageNameEN)
                              ? "text-indigo-600"
                              : "text-gray-600 hover:text-indigo-600"
                          }`}
                          style={
                            (currentPage?.pageNameEN === page.pageNameEN ||
                              currentPage?.motherPageEN === page.pageNameEN)
                              ? { boxShadow: 'inset 6px 6px 12px #bebebe, inset -6px -6px 12px #ffffff' }
                              : { boxShadow: '6px 6px 12px #bebebe, -6px -6px 12px #ffffff' }
                          }
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
                              className="w-4 h-4 cursor-pointer text-gray-400 hover:text-red-500 transition-colors duration-300"
                              onClick={async () => {
                                setShowConfirmationModal(true);
                              }}
                            />
                          </div>
                        )}
                      </div>

                      {isHover === page._id && page.hasSubpage && (
                        <div 
                          className="absolute top-full left-0 z-50 min-w-[200px] bg-gray-100 rounded-xl mt-2 py-2"
                          style={{ boxShadow: '10px 10px 20px #bebebe, -10px -10px 20px #ffffff' }}
                        >
                          {(() => {
                            const subpages = renderSubpages(page.pageNameEN);
                            return (
                              <ul className="flex flex-col gap-2 px-2">
                                {subpages.map((subpage, index) => (
                                  <li
                                    key={index}
                                    className="px-5 py-2 cursor-pointer text-gray-600 hover:text-indigo-600 transition-all duration-300 rounded-lg"
                                    style={{ boxShadow: '4px 4px 8px #bebebe, -4px -4px 8px #ffffff' }}
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
              <div className="flex gap-2 p-1 rounded-xl" style={{ boxShadow: 'inset 4px 4px 8px #bebebe, inset -4px -4px 8px #ffffff' }}>
                {Object.values(LanguageOptions).map((option, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                      option === language
                        ? "text-indigo-600"
                        : "text-gray-500"
                    }`}
                    style={
                      option === language
                        ? { boxShadow: 'inset 3px 3px 6px #bebebe, inset -3px -3px 6px #ffffff' }
                        : {}
                    }
                    onClick={() => dispatch(setLanguage(option))}
                  >
                    {option.toUpperCase()}
                  </button>
                ))}
              </div>
              
              {isAdmin && (
                <button
                  className="px-5 py-2 text-sm font-medium text-red-600 rounded-xl transition-all duration-300"
                  style={{ boxShadow: '6px 6px 12px #bebebe, -6px -6px 12px #ffffff' }}
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
            <div className="p-3 rounded-xl" style={{ boxShadow: '6px 6px 12px #bebebe, -6px -6px 12px #ffffff' }}>
              <FaBars
                className="w-5 h-5 cursor-pointer text-gray-600"
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

export default NavbarNeumorphism;

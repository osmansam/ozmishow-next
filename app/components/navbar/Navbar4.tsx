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

const Navbar4 = ({ currentPage }: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState("");
  const [expandedMenu, setExpandedMenu] = useState("");
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
    <nav className="h-screen w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl fixed left-0 top-0 overflow-y-auto">
      {/* Sidebar vertical layout */}
      <div className="flex flex-col h-full">
        {/* Logo at top */}
        <div className="p-6 border-b border-gray-700">
          <img
            className="cursor-pointer w-full h-24 object-contain hover:scale-105 transition-transform duration-300"
            src={logo ? logo : "https://via.placeholder.com/150"}
            alt="logo"
            onClick={() => {
              isAdmin ? navigate("/admin") : navigate("/");
            }}
          />
        </div>

        {/* Navigation items stacked vertically */}
        <div className="flex-1 py-6 px-4">
          <ul className="flex flex-col gap-2">
            {pageOptions.map(
              (page, index) =>
                page.isNavbar && (
                  <div key={index}>
                    <div
                      className="flex flex-row items-center justify-between group"
                      onMouseOver={() => setIsHover(page._id)}
                      onMouseOut={() => setIsHover("")}
                    >
                      <li
                        className={`flex-1 px-4 py-3 uppercase cursor-pointer transition-all duration-300 font-semibold text-sm tracking-wide rounded-lg ${
                          (currentPage?.pageNameEN === page.pageNameEN ||
                            currentPage?.motherPageEN === page.pageNameEN)
                            ? "bg-[#9f000f] text-white shadow-lg"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        onClick={() => {
                          if (page.hasSubpage) {
                            setExpandedMenu(expandedMenu === page._id ? "" : page._id);
                          } else {
                            navigate(`/${page.pageNameEN}`);
                          }
                        }}
                      >
                        {language === LanguageOptions.EN
                          ? page.pageNameEN
                          : page.pageNameTR}
                      </li>
                      {isAdmin && user.role === "superAdmin" && (
                        <div className="ml-2">
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

                    {/* Expandable submenu */}
                    {expandedMenu === page._id && page.hasSubpage && (
                      <div className="mt-2 ml-4 border-l-2 border-gray-700 pl-4">
                        {(() => {
                          const subpages = renderSubpages(page.pageNameEN);
                          return (
                            <ul className="flex flex-col gap-1">
                              {subpages.map((subpage, index) => (
                                <li
                                  key={index}
                                  className="px-4 py-2 cursor-pointer text-sm text-gray-400 hover:text-[#9f000f] hover:bg-gray-700 rounded-md transition-all duration-300"
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

        {/* Language and logout at bottom */}
        <div className="p-4 border-t border-gray-700">
          <ul className="flex flex-row gap-2 items-center justify-center mb-4">
            {Object.values(LanguageOptions).map((option, index) => (
              <li
                key={index}
                className={`h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer transition-all duration-300 font-bold text-sm ${
                  option === language
                    ? "bg-[#9f000f] text-white shadow-lg"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => dispatch(setLanguage(option))}
              >
                {option.toUpperCase()}
              </li>
            ))}
          </ul>
          
          {isAdmin && (
            <button
              className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg hover:bg-[#9f000f] cursor-pointer transition-all duration-300 font-semibold text-sm"
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

        {/* Mobile menu toggle - shown on mobile */}
        <div className="lg:hidden p-4 border-t border-gray-700">
          <FaBars
            className="w-6 h-6 cursor-pointer text-gray-300 hover:text-white transition-colors duration-300 mx-auto"
            onClick={() => {
              dispatch(setIsSidebarOpen(!isSidebarOpen));
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar4;

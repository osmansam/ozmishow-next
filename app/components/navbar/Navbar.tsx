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

// import { AiOutlineDown } from "react-icons/ai";

type Props = {
  currentPage?: PageOptionsType;
};

const Navbar = ({ currentPage }: Props) => {
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
  //   get the logo
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
    <nav className="h-60 flex flex-col ">
      {/* logo and language options  */}
      <div className="w-5/6 flex flex-row justify-between mx-auto">
        {/* logo */}
        <div className="w-1/3">
          <img
            className="py-2 cursor-pointer h-36"
            src={logo ? logo : "https://via.placeholder.com/150"}
            alt="logo"
            onClick={() => {
              isAdmin ? navigate("/admin") : navigate("/");
            }}
          />
        </div>
        {/* language options */}
        <ul className="flex flex-row">
          {Object.values(LanguageOptions).map((option, index) => (
            <li
              key={index}
              className={` h-8 flex items-center rounded-md p-2 mt-4 ${
                option === language && "bg-[#9f000f] text-white "
              }`}
              onClick={() => dispatch(setLanguage(option))}
            >
              {option.toUpperCase()}
            </li>
          ))}
          {isAdmin && (
            <button
              className="border-2 px-4 rounded-lg   hover:bg-slate-400 cursor-pointer h-fit py-2 mt-2"
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
      </div>
      {/* links  */}
      <div>
        {/* button */}
        <div className="w-5/6 mx-auto flex justify-end">
          <FaBars
            className="w-8 h-6 my-auto mt-3 lg:hidden cursor-pointer"
            onClick={() => {
              dispatch(setIsSidebarOpen(!isSidebarOpen));
            }}
          />
        </div>
        {/* links */}
        <div className="hidden lg:block">
          <ul className="w-3/4 flex flex-row justify-between mx-auto flex-wrap ">
            {" "}
            {pageOptions.map(
              (page, index) =>
                page.isNavbar && (
                  <div
                    key={index}
                    onMouseOver={() => setIsHover(page._id)}
                    onMouseOut={() => setIsHover("")}
                  >
                    <div className="flex flex-row">
                      <li
                        className={`p-2 m-2 mt-4 w-fit flex items-center mx-auto uppercase cursor-pointer hover:underline ${
                          (currentPage?.pageNameEN === page.pageNameEN ||
                            currentPage?.motherPageEN === page.pageNameEN) &&
                          "bg-[#9f000f] text-white rounded-md hover:no-underline justify-center"
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
                            className="w-6 h-6 my-auto mt-3 cursor-pointer hover:text-[#e1241b]"
                            onClick={async () => {
                              setShowConfirmationModal(true);
                            }}
                          />
                        </div>
                      )}
                    </div>

                    {isHover === page._id && page.hasSubpage && (
                      <div className="flex flex-col ">
                        {(() => {
                          const subpages = renderSubpages(page.pageNameEN);
                          return (
                            <ul
                              className=" z-50 bg-[#f9f9f9] px-4"
                              onMouseOver={() => setIsHover(page._id)}
                            >
                              {subpages.map((subpage, index) => (
                                <li
                                  key={index}
                                  className="flex  justify-start py-2 pr-5 pl-2 cursor-pointer text-[#a7a7a7]  leading-5 font-[400] hover:text-[#e1241b]"
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

      <div></div>
    </nav>
  );
};

export default Navbar;

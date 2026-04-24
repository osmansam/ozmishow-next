import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import { useState } from "react";
import { useSelector } from "react-redux";
import { setSelectedSection } from "../../../features/context/contextSlice";
import { RootState, useAppDispatch } from "../../../store";
import Link from "./Link";

interface Props {
  links: string[];
}
const Navbar = ({ links }: Props) => {
  const dispatch = useAppDispatch();
  const { isTopOfPage } = useSelector((state: RootState) => state.context);
  const flexBetween = "flex justify-between items-center";
  const navbarBackground = classNames({
    "bg-white text-black": !isTopOfPage,
    "bg-black transition-colors duration-500 ease-in-out": isTopOfPage,
    "bg-black": isTopOfPage,
    "text-white": isTopOfPage,
    "drop-shadow": !isTopOfPage,
    "shadow-sm": isTopOfPage,
  });

  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);
  const handleOverlayClick = () => {
    setIsMenuToggled(false);
  };
  return (
    <nav>
      <div
        className={`${navbarBackground} flex justify-between  fixed top-0 z-40 w-full py-6  `}
      >
        <div className={` flex justify-between  mx-auto w-5/6`}>
          <div className={`${flexBetween} w-full gap-16`}>
            {/* LEFT SIDE */}
            {/* name surname */}
            <h1 onClick={() => dispatch(setSelectedSection(""))}>
              osman erdogan
            </h1>
            {/* RIGHT SIDE */}

            <div className={`${flexBetween}  hidden md:flex `}>
              <ul className={`${flexBetween} gap-8 text-sm`}>
                {links.map((link, index) => (
                  <Link key={index} page={link} />
                ))}
              </ul>
            </div>

            <button
              className="rounded-full bg-secondary-500 p-2 md:hidden"
              onClick={() => setIsMenuToggled(!isMenuToggled)}
            >
              {!isMenuToggled && (
                <Bars3Icon
                  className={`h-6 w-6 ${
                    isTopOfPage ? "text-white" : "text-black"
                  }`}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU MODAL */}
      {isMenuToggled && (
        <>
          {/* Overlay to close the mobile menu */}
          <div
            className="fixed inset-0 bg-black opacity-50 z-20"
            onClick={handleOverlayClick}
          ></div>

          {/* Mobile menu */}
          <div className="fixed right-0 bottom-0 z-40 h-full w-[200px] text-center bg-transparent drop-shadow-xl md:hidden">
            {/* CLOSE ICON */}
            <div className="flex justify-end px-12 py-6">
              <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                <XMarkIcon className="h-6 w-6 text-gray-400" />
              </button>
            </div>

            {/* MENU ITEMS */}
            <ul className=" flex flex-col h-full gap-10 text-2xl py-8 bg-white overflow-y-auto no-scrollbar">
              {links.map((link, index) => (
                <Link key={index} page={link} />
              ))}
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;

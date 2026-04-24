import { lazy, Suspense } from "react";
import { PageOptionsType } from "../../shared/types";

// Lazy load navbar components
const Navbar = lazy(() => import("./Navbar"));
const Navbar1 = lazy(() => import("./Navbar1"));
const Navbar2 = lazy(() => import("./Navbar2"));
const Navbar3 = lazy(() => import("./Navbar3"));
const Navbar4 = lazy(() => import("./Navbar4"));
const Navbar5 = lazy(() => import("./Navbar5"));
const NavbarMinimalist = lazy(() => import("./NavbarMinimalist"));
const NavbarCorporate = lazy(() => import("./NavbarCorporate"));
const NavbarFlat = lazy(() => import("./NavbarFlat"));
const NavbarNeumorphism = lazy(() => import("./NavbarNeumorphism"));
const NavbarIllustration = lazy(() => import("./NavbarIllustration"));
const NavbarHero = lazy(() => import("./NavbarHero"));

type Props = {
  currentPage?: PageOptionsType;
  navbarType?: string;
};

/**
 * NavbarContainer - Dynamically renders the selected navbar type
 * 
 * Available navbar types:
 * - "default" | "navbar" - Original navbar
 * - "navbar1" - Centered logo variant
 * - "navbar2" - Alternative style
 * - "navbar3" - Alternative style
 * - "navbar4" - Alternative style
 * - "navbar5" - Current default (used in Page.tsx)
 * - "minimalist" - Clean, minimal design
 * - "corporate" - Professional corporate style
 * - "flat" - Flat/Material design
 * - "neumorphism" - Soft UI with shadows
 * - "illustration" - Playful with decorative elements
 * - "hero" - Transparent overlay for hero sections
 */
const NavbarContainer = ({ currentPage, navbarType = "navbar5" }: Props) => {
  const renderNavbar = () => {
    switch (navbarType.toLowerCase()) {
      case "default":
      case "navbar":
        return <Navbar currentPage={currentPage} />;
      case "navbar1":
        return <Navbar1 currentPage={currentPage} />;
      case "navbar2":
        return <Navbar2 currentPage={currentPage} />;
      case "navbar3":
        return <Navbar3 currentPage={currentPage} />;
      case "navbar4":
        return <Navbar4 currentPage={currentPage} />;
      case "navbar5":
        return <Navbar5 currentPage={currentPage} />;
      case "minimalist":
        return <NavbarMinimalist currentPage={currentPage} />;
      case "corporate":
        return <NavbarCorporate currentPage={currentPage} />;
      case "flat":
        return <NavbarFlat currentPage={currentPage} />;
      case "neumorphism":
        return <NavbarNeumorphism currentPage={currentPage} />;
      case "illustration":
        return <NavbarIllustration currentPage={currentPage} />;
      case "hero":
        return <NavbarHero currentPage={currentPage} />;
      default:
        // Default to Navbar5 if unknown type
        return <Navbar5 currentPage={currentPage} />;
    }
  };

  return (
    <Suspense fallback={<div className="h-20 bg-white"></div>}>
      {renderNavbar()}
    </Suspense>
  );
};

export default NavbarContainer;

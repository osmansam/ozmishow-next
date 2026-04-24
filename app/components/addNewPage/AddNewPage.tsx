import React, { useState } from "react";
import { createPageOptions } from "../../features/twoPicture/twoPictureSlice";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../store";
import { SectionPageTypes } from "../../shared/types";

type Props = {};

const AddNewPage = (props: Props) => {
  const dispatch = useAppDispatch();
  const [pageNameTR, setPageNameTR] = useState("");
  const [pageNameEN, setPageNameEN] = useState("");
  const [isNavbar, setIsNavbar] = useState(false);
  const [isSectionPage, setIsSectionPage] = useState(false);
  const [isSubpage, setIsSubpage] = useState(false);
  const [hasSubpage, setHasSubpage] = useState(false);
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [motherPageTR, setMotherPageTR] = useState("");
  const [motherPageEN, setMotherPageEN] = useState("");
  const [sectionQuantity, setSectionQuantity] = useState(1);
  const [sections, setSections] = useState<string[]>([]);
  const [sectionPageType, setSectionPageType] = useState("");

  const handleSectionQuantitySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newSections: string[] = [];
    for (let i = 0; i < sectionQuantity; i++) {
      newSections.push("");
    }
    setSections(newSections);
    setShowSectionForm(false); // Close the section form after submitting sections
  };

  const handleSectionNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newSections = [...sections];
    newSections[index] = e.target.value;
    setSections(newSections);
  };

  const resetInputs = () => {
    setPageNameEN("");
    setPageNameTR("");
    setIsNavbar(false);
    setIsSubpage(false);
    setIsSectionPage(false);
    setHasSubpage(false);
    setMotherPageTR("");
    setMotherPageEN("");
    setSectionPageType("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPageNameTR(pageNameTR[0].toUpperCase() + pageNameTR.slice(1));
    setPageNameEN(pageNameEN[0].toUpperCase() + pageNameEN.slice(1));
    if (!isSubpage) {
      setMotherPageEN("");
      setMotherPageTR("");
    }
    await dispatch(
      createPageOptions({
        pageNameEN,
        pageNameTR,
        isNavbar,
        sections,
        isSubpage,
        isSectionPage,
        hasSubpage,
        motherPageTR,
        motherPageEN,
        sectionPageType,
      })
    );
    resetInputs();
    window.location.reload();
  };
  return (
    <form onSubmit={handleSubmit}>
      {" "}
      <div className="flex flex-col gap-5 w-full ">
        {/* pageName tr */}
        <div>
          <label className="w-32" htmlFor="pageNameTr">
            PageName TR
          </label>
          <input
            className="border-2 w-4/5 rounded-md  capitalize"
            type="text"
            name="pageNameTr"
            value={pageNameTR}
            onChange={(e) => setPageNameTR(e.target.value)}
          />
        </div>
        {/* pagename en */}
        <div>
          <label className="w-32" htmlFor="pageNameEn">
            PageName EN
          </label>
          <input
            className="border-2 w-4/5 rounded-md  capitalize"
            type="text"
            name="pageNameEn"
            value={pageNameEN}
            onChange={(e) => setPageNameEN(e.target.value)}
          />
        </div>
        {/* isNavbar option */}
        <div className="flex gap-5 w-full">
          <label className="w-32" htmlFor="isNavbar">
            Navbar
          </label>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="navbar-yes"
              name="isNavbar"
              value="true"
              checked={isNavbar === true}
              onChange={() => setIsNavbar(true)}
            />
            <label htmlFor="navbar-yes">Evet</label>
          </div>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="navbar-no"
              name="isNavbar"
              value="false"
              checked={isNavbar === false}
              onChange={() => setIsNavbar(false)}
            />
            <label htmlFor="navbar-no">Hayır</label>
          </div>
        </div>
        {/* isSection option */}
        <div className="flex gap-5 w-full">
          <label className="w-32" htmlFor="isSectionPage">
            isSectionPage
          </label>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="isSectionPage-yes"
              name="isSectionPage"
              value="true"
              checked={isSectionPage === true}
              onChange={() => setIsSectionPage(true)}
            />
            <label htmlFor="isSectionPage-yes">Evet</label>
          </div>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="isSectionPage-no"
              name="isSectionPage"
              value="false"
              checked={isSectionPage === false}
              onChange={() => setIsSectionPage(false)}
            />
            <label htmlFor="isSectionPage-no">Hayır</label>
          </div>
        </div>
        {/* isSubpage option */}
        <div className="flex gap-5 w-full">
          <label className="w-32" htmlFor="isSubpage">
            SubPage
          </label>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="isSubpage-yes"
              name="isSubpage"
              value="true"
              checked={isSubpage === true}
              onChange={() => setIsSubpage(true)}
            />
            <label htmlFor="isSubpage-yes">Evet</label>
          </div>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="isSubpage-no"
              name="isSubpage"
              value="false"
              checked={isSubpage === false}
              onChange={() => setIsSubpage(false)}
            />
            <label htmlFor="isSubpage-no">Hayır</label>
          </div>
        </div>
        {/* hassubpage option */}
        <div className="flex gap-5 w-full">
          <label className="w-32" htmlFor="hasSubpage">
            HasSubpage
          </label>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="hasSubpage-yes"
              name="hasSubpage"
              value="true"
              checked={hasSubpage === true}
              onChange={() => setHasSubpage(true)}
            />
            <label htmlFor="hasSubpage-yes">Evet</label>
          </div>
          <div>
            <input
              className="border-2 w-4/5 rounded-md capitalize"
              type="radio"
              id="hasSubpage-no"
              name="hasSubpage"
              value="false"
              checked={hasSubpage === false}
              onChange={() => setHasSubpage(false)}
            />
            <label htmlFor="hasSubpage-no">Hayır</label>
          </div>
        </div>
        {/* motherPage en */}

        {isSubpage && (
          <div className="flex gap-5 w-full">
            <label className="w-32" htmlFor="page">
              motherPageEN:
            </label>
            <select
              className="border-2 w-4/5 rounded-md"
              name="motherPageEN"
              value={motherPageEN}
              onChange={(e) => setMotherPageEN(e.target.value)}
            >
              <option value="">Seciniz</option>

              {pageOptions.map((option, index) => (
                <option key={index} value={option.pageNameEN}>
                  {option.pageNameEN}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* motherPage tr */}
        {isSubpage && (
          <div className="flex gap-5 w-full">
            <label className="w-32" htmlFor="page">
              motherPageTR:
            </label>

            <select
              className="border-2 w-4/5 rounded-md"
              name="motherPageTR"
              value={motherPageTR}
              onChange={(e) => setMotherPageTR(e.target.value)}
            >
              <option value="">Seciniz</option>
              {pageOptions.map((option, index) => (
                <option key={index} value={option.pageNameTR}>
                  {option.pageNameTR}
                </option>
              ))}
            </select>
          </div>
        )}
        {isSectionPage && (
          <div className="flex gap-5 w-full">
            <label className="w-32" htmlFor="page">
              Type Sec
            </label>
            <select
              className="border-2 w-4/5 rounded-md"
              name="sectionType"
              value={sectionPageType}
              onChange={(e) => setSectionPageType(e.target.value)}
            >
              <option value="">Seciniz</option>
              {/* i need to map the section page types  please do it for me */}

              {Object.keys(SectionPageTypes).map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        {/* add sections */}
        {isSectionPage && (
          <div>
            <button
              type="button"
              onClick={() => setShowSectionForm(true)}
              className="border-2 w-fit p-2 rounded-lg mx-auto mt-4"
            >
              Add Sections
            </button>
          </div>
        )}
        {showSectionForm && (
          <div>
            <div className="flex gap-5 w-full">
              <label className="w-32" htmlFor="sectionQuantity">
                Section Quantity
              </label>
              <input
                className="border-2 w-4/5 rounded-md"
                type="number"
                name="sectionQuantity"
                value={sectionQuantity}
                onChange={(e) => setSectionQuantity(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-5 w-full">
              {[...Array(sectionQuantity)].map((_, index) => (
                <div key={index} className="flex gap-5 w-full">
                  <label className="w-32" htmlFor={`sectionName${index}`}>
                    Section Name {index + 1}:
                  </label>
                  <input
                    className="border-2 w-4/5 rounded-md capitalize"
                    type="text"
                    name={`sectionName${index}`}
                    value={sections[index] || ""}
                    onChange={(e) => handleSectionNameChange(e, index)}
                  />
                </div>
              ))}
              <button
                type="submit"
                className="border-2 w-fit p-2 rounded-lg mx-auto mt-4"
              >
                Submit Sections
              </button>
            </div>
          </div>
        )}
        <button
          type="submit"
          className="border-2 w-fit p-2 rounded-lg mx-auto mt-4"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default AddNewPage;

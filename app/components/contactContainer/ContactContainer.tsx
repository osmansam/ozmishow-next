import { useEffect } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { FaFax } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { useSelector } from "react-redux";
import { getFooter } from "../../features/twoPicture/twoPictureSlice";
import { LanguageOptions } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
import translations from "../../translations.json";
import ContactFormEn from "../contactForm/ContactFormEn";
import ContactFormTr from "../contactForm/ContactFormTr";
import Map from "../map";

const ContactContainer = () => {
  const dispatch = useAppDispatch();
  const { language } = useSelector((state: RootState) => state.context);
  const { footer } = useSelector((state: RootState) => state.twoPicture);
  //   get the information data
  useEffect(() => {
    dispatch(getFooter());
  }, [dispatch]);

  return (
    <div className="flex flex-col lg:flex-row w-5/6 mx-auto py-10 ">
      {/* left side  */}
      <div className="flex flex-col lg:w-1/2 w-full lg:pr-5 gap-4">
        <div className="flex flex-col gap-4 py-10">
          {/* icons and footer values */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-4">
              <GoLocation className="w-8 h-6" />
              <h2 className="uppercase w-20 ">
                {translations[language as keyof typeof translations].address}
              </h2>
              <p className="text-sm">{footer.adress}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <BsTelephone className="w-8 h-6" />
              <h2 className="uppercase w-20 ">
                {translations[language as keyof typeof translations].phone}
              </h2>
              <p className="text-sm">{footer.phone}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <AiOutlineMail className="w-8 h-6" />
              <h2 className="uppercase w-20 ">
                {translations[language as keyof typeof translations].email}
              </h2>
              <p className="text-sm">{footer.email}</p>
            </div>
            <div className="flex flex-row items-center gap-4">
              <FaFax className="w-8 h-6" />
              <h2 className="uppercase w-20 ">Fax:</h2>
              <p className="text-sm">{footer.fax}</p>
            </div>
          </div>
        </div>

        <Map />
      </div>
      {/* right side  */}
      <div className="lg:w-1/2 w-full flex flex-col lg:pl-5 mt-2 py-10">
        <h2 className="flex px-10 rounded-lg font-[500] text-lg py-2 bg-black text-white w-fit items-center justify-center ">
          {translations[language as keyof typeof translations].contactForm}
        </h2>
        {language === LanguageOptions.EN ? (
          <ContactFormEn />
        ) : (
          <ContactFormTr />
        )}
      </div>
    </div>
  );
};

export default ContactContainer;

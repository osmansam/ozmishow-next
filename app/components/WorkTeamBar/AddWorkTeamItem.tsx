import React, { useState } from "react";
import { useSelector } from "react-redux";
import { setTwoPictureArray } from "../../features/twoPicture/twoPictureSlice";
import { ButtonType, imageStyle, style } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
type Props = {
  isPictureContainerImage: boolean;
  isPictureContainerButton: boolean;
  isPictureContainerParagraph: boolean;
};

const AddWorkTeamItem = ({
  isPictureContainerImage,
  isPictureContainerButton,
  isPictureContainerParagraph,
}: Props) => {
  const { pageOptions } = useSelector((state: RootState) => state.twoPicture);
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [img, setImg] = useState("");
  const [paragraphNumber, setParagraphNumber] = useState(1);
  const [buttonNumber, setButtonNumber] = useState(1);
  const [buttons, setButtons] = useState<ButtonType[]>([]);
  const [mainHeader, setMainHeader] = useState("");

  const handleNumberSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setParagraphNumber(parseInt(e.currentTarget.paragraphNumber.value));
    if (isPictureContainerButton) {
      setButtonNumber(parseInt(e.currentTarget.buttonNumber.value));
    }
    setReady(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newParagraphs = [];
    const newHeaders = [];

    if (isPictureContainerParagraph) {
      for (let i = 0; i < paragraphNumber; i++) {
        const newParagraph = e.currentTarget[`paragraph${i}`].value || "";
        newParagraphs.push(newParagraph);
        e.currentTarget[`paragraph${i}`].value = "";

        const newHeader = e.currentTarget[`header${i}`].value || "";
        newHeaders.push(newHeader);
        e.currentTarget[`header${i}`].value = "";
      }
    }

    const updatedButtons: ButtonType[] = [];

    if (isPictureContainerButton) {
      for (let i = 0; i < buttonNumber; i++) {
        const buttonNameInput = e.currentTarget[
          `buttonName${i}`
        ] as HTMLInputElement;
        const buttonLinkInput = e.currentTarget[
          `buttonLink${i}`
        ] as HTMLInputElement;
        updatedButtons.push({
          content: buttonNameInput.value,
          style: style,
          link: buttonLinkInput.value,
        });
      }
      setButtons(updatedButtons);
    }

    const newTwoPictureArray = {
      img: {
        content: img,
        style: imageStyle,
      },
      subHeaders: {
        content: newHeaders,
        style: style,
      },
      paragraphs: {
        content: isPictureContainerParagraph ? newParagraphs : [],
        style: style,
      },
      mainHeader: {
        content: mainHeader,
        style: style,
      },
    };

    dispatch(setTwoPictureArray(newTwoPictureArray));
    setImg("");
    setMainHeader("");

    setButtons([]);

    setAllDone(true);
  };

  const handleChangeNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget.name === "paragraphNumber") {
      setParagraphNumber(parseInt(e.currentTarget.value));
    } else if (
      isPictureContainerButton &&
      e.currentTarget.name === "buttonNumber"
    ) {
      setButtonNumber(parseInt(e.currentTarget.value));
    }
  };

  if (!ready && (isPictureContainerButton || isPictureContainerParagraph)) {
    return (
      <div className="w-full">
        <form
          className="bg-white shadow-md rounded-lg w-5/6 mx-auto p-6 mt-6 border border-gray-200 flex flex-col justify-between gap-4 hover:shadow-lg transition duration-300 ease-in-out"
          onSubmit={handleNumberSubmit}
        >
          {isPictureContainerParagraph && (
            <div className="flex gap-5 w-full">
              <label
                className="text-lg w-48 font-semibold flex justify-between "
                htmlFor="paragraphNumber"
              >
                Paragraph Number <span>:</span>
              </label>
              <input
                className="border p-2 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out w-4/5"
                type="number"
                name="paragraphNumber"
                value={paragraphNumber}
                onChange={handleChangeNumber}
                min={1}
              />
            </div>
          )}
          {isPictureContainerButton && (
            <div className="flex gap-5 w-full">
              <label
                className="text-lg w-48 font-semibold flex justify-between "
                htmlFor="buttonNumber"
              >
                Button Number<span>:</span>
              </label>
              <input
                className="border p-2 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out w-1/4"
                type="number"
                name="buttonNumber"
                value={buttonNumber}
                onChange={handleChangeNumber}
                min={1}
              />
            </div>
          )}
          <button
            type="submit"
            className="mx-auto mt-4 w-fit capitalize border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-100"
          >
            Submit
          </button>
        </form>
      </div>
    );
  } else if (allDone) {
    return (
      <div className="w-5/6 flex justify-between mx-auto px-4 pt-4">Done!</div>
    );
  }

  const paragraphInputs = [];
  const buttonInputs = [];

  // setting the number of paragraphs and headers
  for (let i = 0; i < paragraphNumber; i++) {
    paragraphInputs.push(
      <div key={i} className="flex gap-5 h-20 w-full">
        <label
          className="text-lg w-fit font-semibold flex justify-between "
          htmlFor={`header${i}`}
        >
          Header {i + 1}
          <span>:</span>
        </label>
        <input
          className="border p-2 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out w-4/5"
          type="text"
          name={`header${i}`}
        />
        <label
          className="text-lg w-fit font-semibold flex justify-between "
          htmlFor={`paragraph${i}`}
        >
          Paragraph {i + 1}
          <span>:</span>
        </label>
        <textarea
          className="border p-2 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out w-4/5"
          name={`paragraph${i}`}
        />
      </div>
    );
  }

  // setting the links and buttonNumber
  for (let i = 0; i < buttonNumber; i++) {
    buttonInputs.push(
      <div key={i} className="flex gap-5 w-full">
        <label
          className="text-lg w-32 font-semibold flex justify-between "
          htmlFor={`buttonName${i}`}
        >
          Button {i + 1} Name<span>:</span>
        </label>
        <input
          className="border p-2 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out w-4/5"
          type="text"
          name={`buttonName${i}`}
        />
        <select
          className="border-2 w-2/5 rounded-md"
          name={`buttonLink${i}`}
          value={buttons[i]?.link}
          onChange={(e) => {
            const value = e.target.value.toLowerCase();
            setButtons((prevButtons) => {
              const updatedButtons = [...prevButtons];
              updatedButtons[i] = {
                ...updatedButtons[i],
                link: value,
              };
              return updatedButtons;
            });
          }}
        >
          <option value="">Select a page</option>
          {pageOptions.map((option, index) => (
            <option key={index} value={option.pageNameEN.toLowerCase()}>
              {option.pageNameEN}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg w-5/6 mx-auto p-6 mt-6 border border-gray-200 flex flex-col justify-between gap-4 hover:shadow-lg transition duration-300 ease-in-out"
      >
        {/* image */}
        {isPictureContainerImage && (
          <div className="flex gap-5 w-full">
            <label
              className="text-lg w-32 font-semibold flex justify-between "
              htmlFor="img"
            >
              Image<span>:</span>
            </label>
            <input
              className="border p-2 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out w-4/5"
              type="text"
              name="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
        )}
        {/* MainHeader */}
        <div className="flex gap-5 w-full">
          <label
            className="text-lg w-32 font-semibold flex justify-between "
            htmlFor="mainHeader"
          >
            Main Header<span>:</span>
          </label>
          <input
            className="border p-2 rounded-lg focus:outline-none focus:border-indigo-500 transition duration-300 ease-in-out w-4/5"
            type="text"
            name="mainHeader"
            value={mainHeader}
            onChange={(e) => setMainHeader(e.target.value)}
          />
        </div>
        {paragraphInputs}
        {buttonInputs}
        <button
          type="submit"
          className="mx-auto mt-4 w-fit capitalize border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-100"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddWorkTeamItem;

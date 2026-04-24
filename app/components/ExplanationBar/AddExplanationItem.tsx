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

const AddExplanationItem = ({
  isPictureContainerImage,
  isPictureContainerButton,
  isPictureContainerParagraph,
}: Props) => {
  const { twoPictureArray, pageOptions } = useSelector(
    (state: RootState) => state.twoPicture
  );
  const dispatch = useAppDispatch();
  const [ready, setReady] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [img, setImg] = useState("");
  const [header, setHeader] = useState("");
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [paragraphNumber, setParagraphNumber] = useState(1);
  const [buttonNumber, setButtonNumber] = useState(1);
  const [buttons, setButtons] = useState<ButtonType[]>([]);
  const [mainHeader, setMainHeader] = useState("");

  const handleNumberSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setParagraphNumber(parseInt(e.currentTarget.paragraphNumber?.value || "1"));
    if (isPictureContainerButton) {
      setButtonNumber(parseInt(e.currentTarget.buttonNumber?.value || "1"));
    }
    setReady(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newParagraphs = [];
    if (isPictureContainerParagraph) {
      for (let i = 0; i < paragraphNumber; i++) {
        const input = e.currentTarget[`paragraph${i}`] as HTMLTextAreaElement;
        if (input) {
          newParagraphs.push(input.value || "");
          input.value = "";
        }
      }
    }

    const updatedButtons: ButtonType[] = [];

    if (isPictureContainerButton) {
      for (let i = 0; i < buttonNumber; i++) {
        const buttonNameInput = e.currentTarget[`buttonName${i}`] as HTMLInputElement;
        const buttonLinkInput = e.currentTarget[`buttonLink${i}`] as HTMLInputElement;
        if (buttonNameInput && buttonLinkInput) {
          updatedButtons.push({
            content: buttonNameInput.value,
            style: style,
            link: buttonLinkInput.value,
          });
        }
      }
      setButtons(updatedButtons);
    }

    const newExplanationBar = {
      img: {
        content: img,
        style: imageStyle,
      },
      mainHeader: {
        content: mainHeader,
        style: style,
      },
      header: { content: header, style: style },
      paragraphs: {
        content: newParagraphs,
        style: style,
      },
      buttons: buttons.map((button) => ({
        content: button.content,
        link: button.link,
        style: style,
      })),
    };

    dispatch(setTwoPictureArray(newExplanationBar));
    setImg("");
    setHeader("");
    setMainHeader("");
    setParagraphs([]);
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
      <div className="w-full max-w-2xl mx-auto">
        <form
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6"
          onSubmit={handleNumberSubmit}
        >
          <h3 className="text-lg font-semibold text-gray-900">Configuration</h3>
          
          {isPictureContainerParagraph && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="paragraphNumber">
                Number of Paragraphs
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                type="number"
                name="paragraphNumber"
                value={paragraphNumber}
                onChange={handleChangeNumber}
                min={1}
              />
            </div>
          )}
          
          {isPictureContainerButton && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="buttonNumber">
                Number of Buttons
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
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
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm"
          >
            Continue
          </button>
        </form>
      </div>
    );
  } else if (allDone) {
    return (
      <div className="w-full p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Item Added!</h3>
        <p className="text-gray-600">The new explanation item has been staged successfully.</p>
      </div>
    );
  }

  const paragraphInputs = [];
  const buttonInputs = [];

  for (let i = 0; i < paragraphNumber; i++) {
    paragraphInputs.push(
      <div key={i} className="space-y-2">
        <label className="block text-sm font-medium text-gray-700" htmlFor={`paragraph${i}`}>
          Paragraph {i + 1}
        </label>
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all min-h-[100px]"
          name={`paragraph${i}`}
          placeholder="Enter paragraph text..."
        />
      </div>
    );
  }

  for (let i = 0; i < buttonNumber; i++) {
    buttonInputs.push(
      <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor={`buttonName${i}`}>
            Button {i + 1} Label
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            type="text"
            name={`buttonName${i}`}
            placeholder="e.g. Learn More"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor={`buttonLink${i}`}>
            Link Destination
          </label>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all bg-white"
            name={`buttonLink${i}`}
            value={buttons[i]?.link || ""}
            onChange={(e) => {
              const value = e.target.value.toLowerCase();
              setButtons((prevButtons) => {
                const updatedButtons = [...prevButtons];
                updatedButtons[i] = {
                  content: updatedButtons[i]?.content || "",
                  style: style,
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
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isPictureContainerImage && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700" htmlFor="img">
                Image URL
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                type="text"
                name="img"
                value={img}
                onChange={(e) => setImg(e.target.value)}
                placeholder="https://..."
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="mainHeader">
              Tab Title (Main Header)
            </label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              type="text"
              name="mainHeader"
              value={mainHeader}
              onChange={(e) => setMainHeader(e.target.value)}
              placeholder="Title shown in tabs list"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700" htmlFor="header">
            Content Header
          </label>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            type="text"
            name="header"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            placeholder="Title shown above content"
          />
        </div>

        {isPictureContainerParagraph && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Paragraphs</h4>
            {paragraphInputs}
          </div>
        )}

        {isPictureContainerButton && (
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 border-b pb-2">Buttons</h4>
            {buttonInputs}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm mt-6"
        >
          Save Item
        </button>
      </form>
    </div>
  );
};

export default AddExplanationItem;

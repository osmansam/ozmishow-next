import React, { useState } from "react";
import { useSelector } from "react-redux";
import { setTwoPictureArray } from "../../features/twoPicture/twoPictureSlice";
import { ButtonType, style } from "../../shared/types";
import { RootState, useAppDispatch } from "../../store";
type Props = {
  isPictureContainerImage: boolean;
  isPictureContainerButton: boolean;
  isPictureContainerParagraph: boolean;
};

const AddProgressBar = ({
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
  const [percentage, setPercentage] = useState(0);
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
    if (isPictureContainerParagraph) {
      for (let i = 0; i < paragraphNumber; i++) {
        const newParagraph = e.currentTarget[`paragraph${i}`].value || "";
        newParagraphs.push(newParagraph);
        e.currentTarget[`paragraph${i}`].value = "";
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
      img,
      header,
      paragraphs: isPictureContainerParagraph ? newParagraphs : [],
      mainHeader,
      percentage,
    };

    dispatch(setTwoPictureArray(newTwoPictureArray));
    setImg("");
    setHeader("");
    setMainHeader("");
    setPercentage(0);
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
      <div className="w-full ">
        <form
          className="border-2 w-5/6 flex flex-col justify-between gap-2 mx-auto p-4"
          onSubmit={handleNumberSubmit}
        >
          {isPictureContainerParagraph && (
            <div className="flex gap-5 w-full ">
              <label className="w-40" htmlFor="paragraphNumber">
                Paragraph Number:
              </label>
              <input
                className="border-2 w-16"
                type="number"
                name="paragraphNumber"
                value={paragraphNumber}
                onChange={handleChangeNumber}
              />
            </div>
          )}
          {isPictureContainerButton && (
            <div className="flex gap-5 w-full ">
              <label className="w-40" htmlFor="buttonNumber">
                Button Number:
              </label>
              <input
                className="border-2 w-16"
                type="number"
                name="buttonNumber"
                value={buttonNumber}
                onChange={handleChangeNumber}
              />
            </div>
          )}
          <button
            type="submit"
            className="border-2 w-fit p-2 rounded-lg mx-auto mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    );
  } else if (allDone)
    return (
      <div className="w-5/6 flex justify-between mx-auto px-4 pt-4 ">Done!</div>
    );

  const paragraphInputs = [];
  const buttonInputs = [];
  //setting the number of paragraphs
  for (let i = 0; i < paragraphNumber; i++) {
    paragraphInputs.push(
      <div key={i} className="flex gap-5 h-20 w-full ">
        <label className="w-28" htmlFor={`paragraph${i}`}>
          Paragraph {i + 1} :
        </label>
        <textarea
          className="border-2 rounded-md w-4/5"
          name={`paragraph${i}`}
        />
      </div>
    );
  }
  //setting the links and buttonNumber
  for (let i = 0; i < buttonNumber; i++) {
    buttonInputs.push(
      <div key={i} className="flex gap-5  w-full ">
        <label className="w-28" htmlFor={`buttonName${i}`}>
          Button {i + 1} Name:
        </label>
        <input
          className="border-2 w-2/5 rounded-md"
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
        className="flex flex-col justify-center h-full w-5/6  mx-auto gap-2 rounded-md py-4 px-8 border-4"
      >
        {/* image */}
        {isPictureContainerImage && (
          <div className="flex gap-5 w-full ">
            <label className="w-28" htmlFor="img">
              Image :
            </label>
            <input
              className="border-2 rounded-md w-4/5"
              type="text"
              name="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
        )}
        {/* header */}
        <div className="flex gap-5 w-full ">
          <label className="w-28" htmlFor="header">
            Header :
          </label>
          <input
            className="border-2 w-4/5 rounded-md"
            type="text"
            name="header"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
          />
        </div>
        {/* percentage */}
        <div className="flex gap-5 w-full ">
          <label className="w-28" htmlFor="percentage">
            Percentage :
          </label>
          <input
            className="border-2 w-4/5 rounded-md"
            type="number"
            name="percentage"
            value={percentage}
            onChange={(e) => setPercentage(parseInt(e.target.value))}
          />
        </div>
        {isPictureContainerParagraph ? paragraphInputs : null}
        {isPictureContainerButton ? buttonInputs : null}
        <button
          type="submit"
          className="border-2 w-fit p-2 rounded-lg mx-auto mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProgressBar;

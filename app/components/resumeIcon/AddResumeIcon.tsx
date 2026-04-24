import React, { useState } from "react";
import { setTwoPictureArray } from "../../features/twoPicture/twoPictureSlice";
import { style } from "../../shared/types";
import { useAppDispatch } from "../../store";

const AddResumeIcon = () => {
  const dispatch = useAppDispatch();
  const [done, setDone] = useState(false);
  const [header, setHeader] = useState("");
  const [icon, setIcon] = useState("");
  const [paragraph, setParagraph] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTwoPictureArray = {
      icon: icon,
      paragraph: {
        content: paragraph,
        style: style,
      },
      header: {
        content: header,
        style: style,
      },
    };
    dispatch(setTwoPictureArray(newTwoPictureArray));
    setHeader("");
    setIcon("");
    setParagraph("");
    setDone(true);
  };
  if (done) {
    return (
      <div className="w-5/6 flex justify-between mx-auto px-4 pt-4 ">Done!</div>
    );
  }

  return (
    <div className="w-full mt-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center h-full w-5/6  mx-auto gap-2 rounded-md py-4 px-8 border-4"
      >
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
        {/* icon */}
        <div className="flex gap-5 w-full ">
          <label className="w-28" htmlFor="icon">
            Icon :
          </label>
          <input
            className="border-2 w-4/5 rounded-md"
            type="text"
            name="icon"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
          />
        </div>
        {/* paragraph */}
        <div className="flex gap-5 w-full ">
          <label className="w-28" htmlFor="paragraph">
            Paragraph :
          </label>
          <input
            className="border-2 w-4/5 rounded-md"
            type="text"
            name="paragraph"
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          />
        </div>
        {/* submit */}
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

export default AddResumeIcon;

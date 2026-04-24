import React, { useState } from "react";
import { createFooter } from "../../features/twoPicture/twoPictureSlice";
import { useAppDispatch } from "../../store";
type Props = {
  setIsAddFooter: (value: boolean) => void;
};

const AddFooter = ({ setIsAddFooter }: Props) => {
  const dispatch = useAppDispatch();
  const [adress, setAdress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fax, setFax] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dispatch(createFooter({ adress, phone, email, fax }));
    setAdress("");
    setPhone("");
    setEmail("");
    setFax("");
    setIsAddFooter(false);
  };
  return (
    <form
      className="border-2 w-5/6 flex flex-col justify-between gap-2 mx-auto p-4 my-10"
      onSubmit={handleSubmit}
    >
      <label className="w-40" htmlFor="adress">
        Adress
      </label>
      <textarea
        className="border-2 rounded-md w-4/5 h-40"
        name="adress"
        id="adress"
        value={adress}
        onChange={(e) => setAdress(e.target.value)}
      />
      <label className="w-40" htmlFor="phone">
        Phone
      </label>
      <input
        className="border-2 rounded-md w-4/5"
        type="text"
        name="phone"
        id="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <label className="w-40" htmlFor="email">
        Email
      </label>
      <input
        className="border-2 rounded-md w-4/5"
        type="text"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label className="w-40" htmlFor="fax">
        Fax
      </label>
      <input
        className="border-2 rounded-md w-4/5"
        type="text"
        name="fax"
        id="fax"
        value={fax}
        onChange={(e) => setFax(e.target.value)}
      />
      <button
        type="submit"
        className="border-2 w-fit p-2 rounded-lg mx-auto mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default AddFooter;

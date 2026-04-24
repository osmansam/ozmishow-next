import React, { useState } from "react";
import { getPageTwoPictures, resetTwoPictureArray, updateContainer } from "../../features/twoPicture/twoPictureSlice";
import { imageStyle, style } from "../../shared/types";
import { useAppDispatch } from "../../store";

interface Props {
  id: string;
  setIsAddNewItem: (val: boolean) => void;
  page: string;
  onSuccess: () => void;
}

const RestaurantMenuAdd = ({ id, setIsAddNewItem, page, onSuccess }: Props) => {
  const dispatch = useAppDispatch();
  const [img, setImg] = useState("");
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPicture = {
      img: {
        content: img,
        style: imageStyle,
      },
      header: {
        content: header,
        style: style,
      },
      paragraphs: {
        content: [description, price, category], // Mapping: 0:Desc, 1:Price, 2:Category
        style: style,
      },
      buttons: [],
    };

    // We need to wrap it in an array as updateContainer expects a container (array of pictures)
    // But wait, updateContainer appends? No, looking at slice, it seems to replace or append depending on backend?
    // Actually the slice `updateContainer` takes `{ container: PictureType[], id: string }`.
    // And in `NewsContainer`, it dispatches `updateContainer({ container: twoPictureArray, id })`.
    // `twoPictureArray` is built in `PictureContainer`.
    // Here I am building a single item. I should probably use the same pattern or just send this one item if the backend handles appending.
    // Looking at `PictureContainer` again, it dispatches `setTwoPictureArray` to local state, then `NewsContainer` calls `updateContainer` with the whole array from state.
    // To avoid complex state management here, I will just dispatch to the backend directly if possible, OR follow the pattern.
    // The pattern in `NewsContainer` is:
    // 1. `PictureContainer` adds to `twoPictureArray` (redux state).
    // 2. `NewsContainer` has a "Create" button that calls `handleCreate` -> `dispatch(updateContainer({ container: twoPictureArray, id }))`.
    
    // I will simplify this for the user. This component will handle both "filling the form" and "submitting to backend".
    
    const container = [newPicture] as any;
    await dispatch(updateContainer({ container, id }));
    setIsAddNewItem(false);
    dispatch(resetTwoPictureArray()); // Clear local state just in case
    dispatch(getPageTwoPictures(page ?? ""));
    onSuccess();
  };

  return (
    <div className="w-full mt-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg w-5/6 mx-auto p-6 mt-6 border border-gray-200 flex flex-col justify-between gap-4"
      >
        <h2 className="text-xl font-bold mb-4">Add New Menu Item</h2>
        
        {/* Image */}
        <div className="flex gap-5 w-full">
          <label className="text-lg w-32 font-semibold">Image URL:</label>
          <input
            className="border p-2 rounded-lg w-4/5"
            type="text"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        {/* Header (Name) */}
        <div className="flex gap-5 w-full">
          <label className="text-lg w-32 font-semibold">Name:</label>
          <input
            className="border p-2 rounded-lg w-4/5"
            type="text"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            placeholder="Burger"
            required
          />
        </div>

        {/* Category */}
        <div className="flex gap-5 w-full">
          <label className="text-lg w-32 font-semibold">Category:</label>
          <input
            className="border p-2 rounded-lg w-4/5"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Main Course"
            required
          />
        </div>

        {/* Price */}
        <div className="flex gap-5 w-full">
          <label className="text-lg w-32 font-semibold">Price:</label>
          <input
            className="border p-2 rounded-lg w-4/5"
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="$12.99"
            required
          />
        </div>

        {/* Description */}
        <div className="flex gap-5 w-full">
          <label className="text-lg w-32 font-semibold">Description:</label>
          <textarea
            className="border p-2 rounded-lg w-4/5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Delicious beef burger..."
            required
          />
        </div>

        <div className="flex gap-4 justify-center mt-4">
            <button
                type="button"
                onClick={() => setIsAddNewItem(false)}
                className="border-2 border-gray-500 text-gray-500 py-2 px-4 rounded-lg hover:bg-gray-100"
            >
                Cancel
            </button>
            <button
                type="submit"
                className="border-2 border-blue-500 text-blue-500 py-2 px-4 rounded-lg hover:bg-blue-100"
            >
                Add Item
            </button>
        </div>
      </form>
    </div>
  );
};

export default RestaurantMenuAdd;

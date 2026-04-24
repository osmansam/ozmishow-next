import { PictureWithStyleType } from "../../../shared/types";

interface Props {
  item: PictureWithStyleType;
}

const MenuBox3 = ({ item }: Props) => {
  const { header, paragraphs } = item;
  const description = paragraphs?.content?.[0];
  const price = paragraphs?.content?.[1];

  return (
    <div className="border-b border-dotted border-gray-300 py-4 hover:bg-gray-50 transition-colors duration-200 px-2">
      <div className="flex justify-between items-baseline">
        <h3 className="font-serif font-bold text-xl text-gray-800">{header?.content}</h3>
        <span className="font-serif font-bold text-lg text-gray-800">{price}</span>
      </div>
      <p className="text-gray-500 italic text-sm mt-1 w-3/4">{description}</p>
    </div>
  );
};

export default MenuBox3;

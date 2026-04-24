import { PictureWithStyleType } from "../../../shared/types";

interface Props {
  item: PictureWithStyleType;
}

const MenuBox5 = ({ item }: Props) => {
  const { img, header, paragraphs } = item;
  const description = paragraphs?.content?.[0];
  const price = paragraphs?.content?.[1];

  return (
    <div className="flex flex-col items-center text-center p-6 hover:bg-orange-50 rounded-xl transition-colors duration-300">
      <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-orange-200 shadow-md mb-4">
        <img 
            src={img?.content} 
            alt={header?.content} 
            className="w-full h-full object-cover hover:rotate-12 transition-transform duration-500"
        />
      </div>
      <h3 className="font-bold text-xl text-gray-800 mb-1">{header?.content}</h3>
      <p className="text-gray-500 text-sm mb-3 px-4">{description}</p>
      <span className="text-orange-600 font-bold text-lg border border-orange-200 px-4 py-1 rounded-full">{price}</span>
    </div>
  );
};

export default MenuBox5;

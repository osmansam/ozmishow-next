import { PictureWithStyleType } from "../../../shared/types";

interface Props {
  item: PictureWithStyleType;
}

const MenuBox6 = ({ item }: Props) => {
  const { img, header, paragraphs } = item;
  const description = paragraphs?.content?.[0];
  const price = paragraphs?.content?.[1];

  return (
    <div className="flex bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-gray-800">
      <div className="w-1/3 relative">
        <img 
            src={img?.content} 
            alt={header?.content} 
            className="w-full h-full object-cover absolute inset-0"
        />
      </div>
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
            <h3 className="text-white font-bold text-lg">{header?.content}</h3>
            <p className="text-gray-400 text-xs mt-1">{description}</p>
        </div>
        <div className="flex justify-between items-center mt-3">
            <span className="text-green-400 font-mono font-bold">{price}</span>

        </div>
      </div>
    </div>
  );
};

export default MenuBox6;

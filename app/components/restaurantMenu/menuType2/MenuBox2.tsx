import { PictureWithStyleType } from "../../../shared/types";

interface Props {
  item: PictureWithStyleType;
}

const MenuBox2 = ({ item }: Props) => {
  const { img, header, paragraphs } = item;
  const description = paragraphs?.content?.[0];
  const price = paragraphs?.content?.[1];

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img 
            src={img?.content} 
            alt={header?.content} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-xl text-gray-900">{header?.content}</h3>
            <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">{price}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>

      </div>
    </div>
  );
};

export default MenuBox2;

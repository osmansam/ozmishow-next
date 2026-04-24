import { PictureWithStyleType } from "../../../shared/types";

interface Props {
  item: PictureWithStyleType;
}

const MenuBox1 = ({ item }: Props) => {
  const { img, header, paragraphs } = item;
  const description = paragraphs?.content?.[0];
  const price = paragraphs?.content?.[1];
  // const category = paragraphs?.content?.[2]; // Not displayed in the box usually

  return (
    <div className="flex gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100">
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img 
            src={img?.content} 
            alt={header?.content} 
            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <div>
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg text-gray-800">{header?.content}</h3>
                <span className="font-bold text-lg text-blue-600">{price}</span>
            </div>
            <p className="text-gray-500 text-sm mt-1 line-clamp-2">{description}</p>
        </div>

      </div>
    </div>
  );
};

export default MenuBox1;

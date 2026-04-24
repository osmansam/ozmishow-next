import { PictureWithStyleType } from "../../../shared/types";

interface Props {
  item: PictureWithStyleType;
}

const MenuBox4 = ({ item }: Props) => {
  const { img, header, paragraphs } = item;
  const description = paragraphs?.content?.[0];
  const price = paragraphs?.content?.[1];
  const imageSrc = img?.content?.trim();

  return (
    <div className="relative h-64 rounded-lg overflow-hidden group cursor-pointer">
      {imageSrc ? (
        <img
          src={imageSrc}
          alt={header?.content}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      ) : null}
      <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex flex-col justify-end p-6">
        <h3 className="text-white font-bold text-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {header?.content}
        </h3>
        <p className="text-gray-200 text-sm mt-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
          {description}
        </p>
        <div className="flex justify-between items-center mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-150">
          <span className="text-yellow-400 font-bold text-xl">{price}</span>
        </div>
      </div>
    </div>
  );
};

export default MenuBox4;

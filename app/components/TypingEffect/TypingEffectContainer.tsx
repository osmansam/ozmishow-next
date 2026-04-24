import { ImageType } from "../../shared/types";
import TypingEffect from "./TypingEffect";
type Props = {
  paragraphs: string[];
  img: { content: string; style: ImageType };
};

const TypingEffectContainer = ({ paragraphs, img }: Props) => {
  return (
    <div className="relative h-full flex flex-row">
      <div
        className="w-full h-screen bg-cover bg-center relative min-h-screen"
        style={{
          backgroundImage: `url(${img?.content})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="text-white absolute inset-0  flex  flex-col  items-center justify-center   h-full ">
        <div className="h-20 w-fit px-4 mx-auto">
          <TypingEffect texts={paragraphs}></TypingEffect>
        </div>
      </div>
    </div>
  );
};

export default TypingEffectContainer;

import { YoutubeType } from "../../shared/types";
import YoutubeEmbed from "./YoutubeEmbed";

const YoutubeVideo = ({ embedId, header }: YoutubeType) => {
  return (
    <div className="w-5/6 lg:w-2/5 mx-auto py-8">
      <div className="flex flex-col gap-2 h-full">
        <h1
          className="font-[700] text-4xl leading-[44px] pb-4"
          style={{ color: "#333333" }}
        >
          {header}
        </h1>
        <div className="h-80">
          <YoutubeEmbed embedId={embedId} />
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideo;

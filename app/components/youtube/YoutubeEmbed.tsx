type Props = { embedId: string };

const YoutubeEmbed = ({ embedId }: Props) => (
  <div className="overflow-hidden h-full w-full   ">
    <iframe
      src={`https://www.youtube.com/embed/${embedId}`}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
      className=" w-full h-full"
    />
  </div>
);

export default YoutubeEmbed;

// Sidebar.tsx
import Link from "./Link";

type Props = {
  img: string;
  name: string;
  links: string[];
};

const Sidebar = ({ img, name, links }: Props) => {
  return (
    <div
      className="fixed top-0 left-0 w-[200px] bg-[#121418] text-white h-screen"
      style={{ overflowY: "auto" }} // Add this line to enable scrolling when content exceeds the screen height
    >
      <div className="flex flex-col justify-between h-full">
        {/* img */}
        <div className="flex flex-col gap-3 items-center justify-center py-10">
          <img
            src={img}
            alt="osman erdogan"
            className="rounded-full h-48 w-48 border-8 border-[#343a3f] object-cover"
          />
          <h2 className="capitalize font-[500] text-xl leading-6">{name}</h2>
        </div>
        {/* links */}
        <div className="flex flex-col gap-6 items-center justify-center">
          {links.map((link) => (
            <Link key={link} page={link} /> // Add a key prop to fix the warning
          ))}
        </div>
        {/* links */}
        <div>Buraya icons gelecek with links</div>
      </div>
    </div>
  );
};

export default Sidebar;

import { useSelector } from "react-redux";
import { setSelectedSection } from "../../../features/context/contextSlice";
import { RootState, useAppDispatch } from "../../../store";

type Props = {
  page: string;
};

const Link = ({ page }: Props) => {
  const dispatch = useAppDispatch();
  const { selectedSection } = useSelector((state: RootState) => state.context);

  return (
    <li
      className={`  ${selectedSection === page ? "text-[#FF6B66]" : ""}
         hover:text-[#FFA6A3]
      `}
      onClick={() => dispatch(setSelectedSection(page))}
    >
      {page}
    </li>
  );
};

export default Link;

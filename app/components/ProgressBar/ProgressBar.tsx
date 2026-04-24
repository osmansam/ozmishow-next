type Props = {
  header: string;
  percentage: number;
};

const ProgressBar = ({ header, percentage }: Props) => {
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/2 px-4 pt-4">
      <div className="flex flex-row justify-between px-4">
        <h1 className=" font-[500] text-lg leading-[29px] text-[#212529] capitalize ">
          {header}
        </h1>
        <h1 className="font-[500] text-lg leading-[29px] text-[#212529] ">
          %{percentage}
        </h1>
      </div>

      <div className="w-full h-2 rounded-full bg-[#e9ecef]">
        <div
          className="h-full bg-[#fd7e14] rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

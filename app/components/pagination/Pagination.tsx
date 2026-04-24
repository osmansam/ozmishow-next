export function Pagination({
  page,
  limitPerPage,
  itemsCount,
  totalPages,
  handleClick,
}: {
  page: number;
  limitPerPage: number;
  itemsCount: number;
  totalPages: number;
  handleClick: (num: number) => void;
}) {
  return (
    <nav className="flex flex-col lg:flex-row justify-between items-center p-4 ">
      <div className="inline-flex items-center -space-x-px text-sm leading-tight">
        {page !== 1 && (
          <button
            className="block py-2 px-3 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => {
              if (page - 5 < 1) {
                handleClick(1);
              }
              handleClick(page - 5);
            }}
          >
            {"<<"}
          </button>
        )}
        {page > 1 && (
          <button
            className="py-2 px-3 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => handleClick(page - 1)}
          >
            {page - 1}
          </button>
        )}
        <button
          aria-current="page"
          className="z-10 py-2 px-3 text-blue-600 bg-blue-50 border border-blue-300 hover:bg-blue-100 hover:text-blue-700"
          onClick={() => handleClick(page)}
        >
          {page}
        </button>
        {page < totalPages && (
          <button
            className="py-2 px-3 text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => handleClick(page + 1)}
          >
            {page === totalPages ? "-" : page + 1}
          </button>
        )}
        {page !== totalPages && (
          <button
            className="block py-2 px-3 text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => {
              if (page + 5 > totalPages) {
                handleClick(totalPages);
              }
              handleClick(page + 5);
            }}
          >
            {">>"}
          </button>
        )}
      </div>
    </nav>
  );
}

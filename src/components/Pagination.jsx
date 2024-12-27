import React, { useState } from "react";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  toggleCardsCategories,
}) => {
  const [pageInput, setPageInput] = useState(""); // State to hold the inputted page number
  const pageLimit = 7; // Number of page numbers to show in the navigation

  const getPageNumbers = () => {
    const halfLimit = Math.floor(pageLimit / 2);
    let start = Math.max(0, currentPage - halfLimit);
    let end = Math.min(totalPages - 1, currentPage + halfLimit);

    if (currentPage <= halfLimit) {
      start = 0;
      end = Math.min(pageLimit - 1, totalPages - 1);
    }

    if (totalPages - currentPage < halfLimit) {
      start = Math.max(0, totalPages - pageLimit);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  // Function to handle the page input change
  const handlePageInput = (e) => {
    setPageInput(e.target.value);
  };

  // Function to handle the 'Enter' key press
  const handlePageInputKeyDown = (e) => {
    if (e.key === "Enter") {
      const pageNumber = parseInt(pageInput, 10); // Convert input to integer

      if (isNaN(pageNumber) || !Number.isInteger(pageNumber)) {
        // If input is not a valid number or a decimal, go to index 1 (page 1)
        onPageChange(0);
      } else if (pageNumber >= totalPages) {
        // If input number is greater than totalPages, go to the last page
        onPageChange(totalPages - 1);
      } else if (pageNumber < 1) {
        // If input is less than 1, go to the first page
        onPageChange(0);
      } else {
        // Go to the inputted page (zero-indexed)
        onPageChange(pageNumber - 1);
      }
      setPageInput(""); // Clear the input after navigating
    }
  };

  return (
    <nav>
      <ul className="flex flex-wrap justify-center space-x-1">
        {/* Show First Button only if the currentPage is >= 5 */}
        {currentPage > 3 && (
          <li>
            <button
              onClick={() => onPageChange(0)}
              className={`px-3.5 hover:bg-gray-100 focus:outline-none select-none lg:rounded-md rounded lg:h-[40px] md:h-[39px] h-[30px] lg:text-base text-sm ${
                currentPage === 0 ? "font-bold" : ""
              }`}
            >
              1
            </button>
          </li>
        )}

        {/* Previous Button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className={`w-9 flex items-center justify-center focus:outline-none select-none lg:rounded-md rounded lg:h-[40px] md:h-[39px] h-[30px] hover:bg-gray-100 ${
              currentPage === 0 && "hidden"
            }`}
          >
            <CgChevronLeft />
          </button>
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((pageNum) => (
          <li
            key={pageNum}
            className={`lg:h-[40px] md:h-[39px] h-[30px] lg:rounded-md rounded ${
              pageNum === currentPage && toggleCardsCategories
                ? " text-blue-600 border border-blue-500"
                : "hover:bg-gray-100"
            }`}
          >
            <button
              className={`px-3.5 h-full focus:outline-none select-none lg:text-base text-sm`}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum + 1}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
            className={`w-9 flex items-center justify-center focus:outline-none select-none lg:rounded-md rounded lg:h-[40px] md:h-[39px] h-[30px] hover:bg-gray-100 ${
              currentPage === totalPages - 1 && "hidden"
            }`}
          >
            <CgChevronRight className="text-lg" />
          </button>
        </li>

        {/* Last Button */}
        {currentPage < totalPages - 1 && (
          <li>
            <button
              onClick={() => onPageChange(totalPages - 1)}
              className={`px-3.5 hover:bg-gray-100 focus:outline-none  lg:text-base text-sm select-none lg:rounded-md rounded lg:h-[40px] md:h-[39px] h-[30px] ${
                currentPage >= totalPages - 4 && "hidden"
              }`}
            >
              {totalPages}
            </button>
          </li>
        )}

        <li className="pl-1">
          <input
            type="number"
            value={pageInput}
            onChange={handlePageInput}
            onKeyDown={handlePageInputKeyDown}
            placeholder="Page + enter"
            className="w-[115px] lg:text-sm text-xs lg:h-[40px] md:h-[39px] h-[30px] bg-gray-100 focus:outline-none lg:rounded-md rounded pl-2.5 pr-0.5 border border-gray-300"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

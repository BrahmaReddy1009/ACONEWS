
  import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
  
  interface IProps {
    currentPage: number;
    totalPages: number;
    handlePrevPage: () => void;
    handleNextPage: () => void;
  }
  
  const Pagination: React.FC<IProps> = (props) => {
    const { currentPage, totalPages, handlePrevPage, handleNextPage } = props;
  
    return (
      <div className="mx-auto w-fit flex items-center gap-0.5">
        <button
          className={`px-4 py-2 bg-white rounded-l-full ${
            currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage <= 1}
          onClick={handlePrevPage}
        >
          <FontAwesomeIcon icon={faChevronLeft} size="sm" /> Prev
        </button>
        <span className="px-4 py-2 bg-white">
          {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-white rounded-r-full ${
            currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={currentPage >= totalPages}
          onClick={handleNextPage}
        >
          Next <FontAwesomeIcon icon={faChevronRight} size="sm" />
        </button>
      </div>
    );
  };
  
  export default Pagination;
  
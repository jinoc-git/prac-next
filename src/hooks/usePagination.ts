import { useState } from 'react';

const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const next = () => {
    setCurrentPage(currentPage + 1);
  };

  const prev = () => {
    setCurrentPage(currentPage - 1);
  };

  return { currentPage, next, prev, setCurrentPage };
};

export default usePagination;

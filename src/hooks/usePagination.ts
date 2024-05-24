import React from 'react';

const usePagination = () => {
  const [currentPage, setCurrentPage] = React.useState(0);

  const next = () => setCurrentPage(currentPage + 1);
  const prev = () => setCurrentPage(currentPage - 1);

  return { currentPage, next, prev, setCurrentPage };
};

export default usePagination;

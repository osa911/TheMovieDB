import React, { PropTypes } from 'react';
import ReactPaginate from 'react-paginate';

const propTypes = {
  pageNum: PropTypes.number, // totalPages
  forceSelected: PropTypes.number,
  clickCallback: PropTypes.func,
};

const defaultProps = {
  pageNum: 1,
  forceSelected: 0,
};

const Paginate = ({ pageNum, forceSelected, clickCallback }) => (
  <div className="center">
    {pageNum > 1 &&
      <ReactPaginate
        pageNum={pageNum}
        pageRangeDisplayed={5}
        marginPagesDisplayed={1}
        breakLabel={<span>...</span>}
        breakClassName="break-me"
        clickCallback={clickCallback}
        forceSelected={forceSelected}
        containerClassName="pagination"
        subContainerClassName="pages pagination"
        activeClassName="active"
      />
    }
  </div>
);


Paginate.propTypes = propTypes;
Paginate.defaultProps = defaultProps;

export default Paginate;

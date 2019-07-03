import classNames from "classnames";
import noop from "lodash/noop";
import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import { fetchMovies } from "../../redux/actions";
import { MState } from "../../redux/store";
import PaginationItem from "../pagination-item";

import "./pagination-panel.css";

interface IProps {
  currentPage: number;
  pagesCount: number;
  fetchMoviesAction: typeof fetchMovies;
}

interface IMethods {
  renderPageNumbers: (pages: number[]) => void;
  renderPageButton: (pageNumber: number) => JSX.Element;
}

class PaginationPanel extends Component<IProps> implements IMethods {

  public renderPagBegin = () => {
    const { currentPage, fetchMoviesAction } = this.props;
    const style = classNames({
      invisible: currentPage === 1,
    });
    return (
      <Fragment>
        <PaginationItem
          title="First"
          btnStyle="active"
          onHandleChangePage={fetchMoviesAction}
          pageItemStyle={style}
          currentPage={1}
        />

        <PaginationItem
          title="Prev"
          onHandleChangePage={fetchMoviesAction}
          pageItemStyle={style}
          currentPage={currentPage - 1}
        />
      </Fragment>
    );
  }

  public renderPages = () => {
    const { currentPage, pagesCount, fetchMoviesAction } = this.props;
    const pageIndex = currentPage - 1;

    const PAGES_ARR = Array.from({ length: pagesCount }, (v, k) => k + 1);

    const prefPages = PAGES_ARR.slice(0, pageIndex);
    const afterPages = PAGES_ARR.slice(pageIndex + 1);
    const pageCount = 1;

    const pref = prefPages.length > pageCount ? prefPages.slice(-pageCount) : prefPages;
    const after = afterPages.length > pageCount
      ? afterPages.slice(0, pageCount)
      : afterPages;

    return (
      <Fragment>
        {prefPages.length > pageCount ? (
          <PaginationItem title="..." onHandleChangePage={noop} />
        ) : null}
        {this.renderPageNumbers(pref)}
        <PaginationItem
          key={`pagebutton-${currentPage}`}
          title={currentPage}
          btnStyle="active"
          onHandleChangePage={fetchMoviesAction}
          currentPage={currentPage}
        />
        {this.renderPageNumbers(after)}
        {afterPages.length > pageCount ? (
          <PaginationItem title="..." onHandleChangePage={noop} />
        ) : null}
      </Fragment>
    );
  }

  public renderPageNumbers = (pages: number[]) => (
    <Fragment>{pages.map(this.renderPageButton)}</Fragment>
  )

  public renderPageButton = (pageNumber: number) => {
    const { fetchMoviesAction } = this.props;
    return (
      <PaginationItem
        key={`pagebutton-${pageNumber}`}
        title={pageNumber}
        onHandleChangePage={fetchMoviesAction}
        currentPage={pageNumber}
      />
    );
  }

  public renderPagEnd = () => {
    const { currentPage, pagesCount, fetchMoviesAction } = this.props;
    const style = classNames({
      invisible: currentPage === pagesCount,
    });

    return (
      <Fragment>
        <PaginationItem
          title="Next"
          onHandleChangePage={fetchMoviesAction}
          pageItemStyle={style}
          currentPage={currentPage + 1}
        />

        <PaginationItem
          title="Last"
          btnStyle="active"
          onHandleChangePage={fetchMoviesAction}
          pageItemStyle={style}
          currentPage={pagesCount}
        />
      </Fragment>
    );
  }

  public render() {
    return (
      <div className="pagination-panel">
        <nav className="aria-label">
          <ul className="pagination justify-content-center">
            {this.renderPagBegin()}
            {this.renderPages()}
            {this.renderPagEnd()}
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ currentPage, pagesCount }: MState) => ({
  currentPage,
  pagesCount,
});

const mapDispatchToProps = {
  fetchMoviesAction: fetchMovies,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PaginationPanel);

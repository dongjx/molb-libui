import classNames from "classnames";
import _ from "lodash";
import React from "react";
import { Button } from "../button";
import { Size, Theme } from "../EnumValues";
import { IDataSource } from "../table/Table";

const styles = require("./pagination.scss");

export interface IPaginationProps {
  onPageChange: (newPage: number) => any;
  history?: any;
  disablePrev?: boolean;
  disableNext?: boolean;
  className?: string;
  dataSource?: IDataSource[];
  showTotalResultsAvailable?: boolean;
  totalResultsCount: number;
  rowsPerPage: number;
  currentPage: number;
}

export enum Results {
  IsOneOrLess = "result available",
  IsMultiple = "results available"
}

export class Pagination extends React.Component<IPaginationProps, {}> {
  public static defaultProps: Partial<IPaginationProps> = {
    showTotalResultsAvailable: true
  };

  public onChangePrevPage = () => {
    const { currentPage } = this.props;
    if (currentPage > 0) {
      this.props.onPageChange(currentPage - 1);
    }
  };

  public onChangeNextPage = () => {
    const { currentPage, totalResultsCount, rowsPerPage } = this.props;

    const lastItemIndex = (currentPage + 1) * rowsPerPage;
    if (lastItemIndex < totalResultsCount) {
      this.props.onPageChange(currentPage + 1);
    }
  };

  public render() {
    const sectionClassName = classNames(
      this.props.className ? this.props.className : ""
    );

    const {
      totalResultsCount,
      rowsPerPage,
      currentPage,
      disablePrev,
      disableNext,
      showTotalResultsAvailable
    } = this.props;

    const resultsAvailable =
      totalResultsCount > 1
        ? `${totalResultsCount} ${Results.IsMultiple}`
        : `${totalResultsCount} ${Results.IsOneOrLess}`;
    const currentPageRange: React.ReactNode = this.getPageRange(
      totalResultsCount,
      rowsPerPage,
      currentPage
    );

    const lastItemIndex = (currentPage + 1) * rowsPerPage;

    return (
      <section className={`${sectionClassName}`}>
        <div className={styles.paginationContainer}>
          <div className={styles.countContainer}>
            {showTotalResultsAvailable ? resultsAvailable : ""}
          </div>
          <div className={styles.pageRangeContainer}>{currentPageRange}</div>
          <div className={styles.ofCountContainer}>of {totalResultsCount}</div>
          <div>
            <Button
              className={styles.prevButton}
              size={Size.Square}
              theme={Theme.Grey}
              icon={"left"}
              iconAlign="center"
              disabled={
                !_.isNil(disablePrev)
                  ? disablePrev
                  : currentPage === 0 || totalResultsCount === 0
              }
              onClick={
                this.onChangePrevPage ||
                (() => {
                  /* noop */
                })
              }
            />
            <Button
              className={styles.nextButton}
              size={Size.Square}
              theme={Theme.Grey}
              icon={"right"}
              iconAlign="center"
              disabled={
                !_.isNil(disableNext)
                  ? disableNext
                  : lastItemIndex >= totalResultsCount
              }
              onClick={
                this.onChangeNextPage ||
                (() => {
                  /* noop */
                })
              }
            />
          </div>
        </div>
      </section>
    );
  }

  private getPageRange(
    totalResultsCount: number,
    rowsPerPage: number,
    currentPage: number
  ): React.ReactNode {
    if (totalResultsCount < 1) {
      return `0`;
    }

    const firstNumber = currentPage * rowsPerPage + 1;
    const lastItemIndex = (currentPage + 1) * rowsPerPage;
    const secondNumber = Math.min(lastItemIndex, totalResultsCount);

    return `${firstNumber}-${secondNumber}`;
  }
}

import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries, changePageNum } from "../../actions/country";
import ReactTable from "react-table";
import Spinner from "../layouts/spinner/Spinner";
import "react-table/react-table.css";
import "./country.scss";

const CountryList = ({
  getCountries,
  country: { isLoading, countryList, currentPage, isListFetched },
  changePageNum
}) => {
  useEffect(
    () => {
      if (!isListFetched) {
        getCountries();
      }
    },
    [getCountries, isLoading, isListFetched]
  );

  const columns = [
    {
      Header: "Country",
      accessor: "name" // String-based value accessors!
    },
    {
      Header: "Continent",
      accessor: "continent"
    },
    {
      Header: "Native",
      accessor: "native"
    },
    {
      id: "languages", // Required because our accessor is not a string
      Header: "Languages", // Custom header components!
      accessor: d => d.languages.join(", ")
    },
    {
      Header: "Action",
      accessor: "code",
      Cell: props =>
        <span className="number">
          <Link to={`/countries/${props.value}`} className="btn btn-light">
            View
          </Link>
        </span>
    }
  ];

  return (
    <Fragment>
      {!isListFetched
        ? <Spinner />
        : <div className="country-list">
            <div className="page-title-wrapper">
              <h3 className="page-title text-info">Countries of the World</h3>
            </div>
            <div className="country-list-table-wrapper">
              <ReactTable
                data={countryList}
                columns={columns}
                page={currentPage}
                onPageChange={page => changePageNum(page)}
              />
            </div>
          </div>}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  country: state.country
});

const mapDispatchToProps = {
  getCountries,
  changePageNum
};

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);

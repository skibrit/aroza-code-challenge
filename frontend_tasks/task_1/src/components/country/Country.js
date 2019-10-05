import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getCountryByCode, clearCountry } from "../../actions/country";
import Spinner from "../layouts/spinner/Spinner";
import { Emojione } from "react-emoji-render";
import "./country.scss";

const Country = ({
  location: { pathname },
  getCountryByCode,
  country: { isLoading, country },
  history,
  clearCountry
}) => {
  useEffect(
    () => {
      const arr = pathname.split("/");
      if (arr[2]) {
        getCountryByCode(arr[2].trim());
      }
    },
    [getCountryByCode, pathname]
  );

  const {
    name,
    native,
    phone,
    continent,
    capital,
    currency,
    emoji,
    languages
  } = country;

  return (
    <Fragment>
      {isLoading
        ? <Spinner />
        : !country || !country.name
          ? <h2>Not Found</h2>
          : <section className="country-section">
              <div className="page-title-wrapper">
                <h3 className="page-title text-info">
                  {name}
                </h3>
              </div>
              <div className="country-detail-wrapper">
                <div className="inner-wrapper">
                  <div className="single-row">
                    <div className="content-column label-column">Name</div>
                    <div className="content-column value-column">
                      {name}
                    </div>
                  </div>
                  <div className="single-row">
                    <div className="content-column label-column">Continent</div>
                    <div className="content-column value-column">
                      {continent}
                    </div>
                  </div>
                  <div className="single-row">
                    <div className="content-column label-column">Capital</div>
                    <div className="content-column value-column">
                      {capital}
                    </div>
                  </div>
                  <div className="single-row">
                    <div className="content-column label-column">Native</div>
                    <div className="content-column value-column">
                      {native}
                    </div>
                  </div>
                  <div className="single-row">
                    <div className="content-column label-column">Languages</div>
                    <div className="content-column value-column">
                      {languages.join(", ")}
                    </div>
                  </div>
                  <div className="single-row">
                    <div className="content-column label-column">Currency</div>
                    <div className="content-column value-column">
                      {currency}
                    </div>
                  </div>
                  <div className="single-row">
                    <div className="content-column label-column">Phone</div>
                    <div className="content-column value-column">
                      {phone}
                    </div>
                  </div>

                  <div className="single-row">
                    <div className="content-column label-column">Flag</div>
                    <div className="content-column value-column">
                      <Emojione text={emoji} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer">
                <button
                  className="btn btn-info"
                  onClick={e => {
                    //clear previously selected country
                    clearCountry();
                    history.push("/countries");
                  }}
                >
                  Go Back
                </button>
              </div>
            </section>}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  country: state.country
});

const mapDispatchToProps = {
  getCountryByCode,
  clearCountry
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(Country)
);

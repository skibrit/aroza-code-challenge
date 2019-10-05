import React from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./spinner.scss";

const Spinner = () => {
  return (
    <div className="spinner-wrapper">
      <div className="inner">
        <Loader
          type="Grid"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={-1}
        />
      </div>
    </div>
  );
};

export default Spinner;

import React from "react";
import "./home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="inner">
        <div className="home-logo">
          <img src={require("../../assets/images/logo.png")} alt="logo" />
        </div>
        <h1 className="welcome-title">Welcome to CountryWiki</h1>
      </div>
    </div>
  );
};

export default Home;

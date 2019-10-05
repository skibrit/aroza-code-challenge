import React from "react";
import Store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Navbar from "./components/layouts/navbar/Navbar";
import Footer from "./components/layouts/footer/Footer";
import CountryList from "./components/country/CountryList";
import Country from "./components/country/Country";
import "./App.scss";

function App() {
  return (
    <Provider store={Store}>
      <Router>
        <Navbar />
        <section className="container section-container ">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/countries" component={CountryList} />
            <Route exact path="/countries/:code" component={Country} />
          </Switch>
        </section>
      </Router>
      <Footer />
    </Provider>
  );
}

export default App;

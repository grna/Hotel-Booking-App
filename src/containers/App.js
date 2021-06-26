import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import About from "../components/About";
import RoomsContainer from "../containers/RoomsContainer";
import SearchContainer from "./SearchContainer";

const App = () => (
  <div className="app grid-container">
    <Header />
    <main>
      <Switch>
        <Route exact path="/" component={SearchContainer} />
        <Route path="/rooms" component={RoomsContainer} />
        <Route path="/about" component={About} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;

import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../components/common/header/Header";
import Footer from "../components/common/footer/Footer";
import About from "../components/about/About";
import RoomsContainer from "../containers/RoomsContainer";
import OrderContainer from "./OrderContainer";
import UserContainer from "./UserContainer";

const App = () => (
  <div className="app grid-container">
    <Header />
    <main>
      <Switch>
        <Route exact path="/" component={OrderContainer} />
        <Route path="/rooms" component={RoomsContainer} />
        <Route path="/about" component={About} />
        <Route path="/user" component={UserContainer} />
      </Switch>
    </main>
    <Footer />
  </div>
);

export default App;

import React from "react";
import {connect} from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import { User } from "../components/User";
import { Home } from "../components/Home";
import { setName } from "../actions/userActions";
import { Footer } from "../components/Footer";
import { Camera } from "./Camera"; 
import { TopRank } from "./TopRank";
import { Previous } from "./Previous";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                <Route exact path="/" component={Home}/>
                <Route path="/camera" component={Camera}/>
                <Route path="/top-rank" component={TopRank}/>
                <Route path="/previous" component={Previous}/>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
      math: state.math
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setName: (name) => {
            dispatch(setName(name));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

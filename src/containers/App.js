import React from "react";
import {connect} from "react-redux";
import {
    withRouter,
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import { User } from "components/User";
import { Home } from "components/Home";
// import { setName } from "actions/userActions";
import { Footer } from "components/Footer";
import Ranking from 'pages/Ranking'

import Camera from "./Camera";
import { TopRank } from "./TopRank";
import { Previous } from "./Previous";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          mute: false
        };
    }

    render() {
        return (
            <Router>
                <div id="root-bg" className='thaibg'>
                    <div className="grey-bg"></div>
                    <img id="bg-jpg" src="/img/huay.jpg" alt="just bg"/>
                    <div>
                        <Route exact path="/" component={Home}/>
                        <Route path="/camera" component={Camera}/>
                        <Route path="/top-rank" component={TopRank}/>
                        <Route path="/previous" component={Previous}/>
                        <Route path="/ranking" component={Ranking}/>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = (state) => {
  return {
      user: state.user,
      math: state.math,
      image: state.image
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
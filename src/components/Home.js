import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export const Home = (props) => {
    return (
        <div>
            <div className="container is-fluid has-text-centered">
                <div>
                    <img src="img/treeinheaven.png" alt=""/>
                </div>
                <br></br>  
                <div>
                    <Link to={"/camera"}><a className="button is-primary">จับภาพลุ้นโชค !</a></Link>
                </div>
                <br></br>
                <div>
                    <Link to={"/top-rank"}><a className="button is-primary">เลขเด็ดเพลานี้</a></Link>
                </div>
                <br></br>
                <div>
                    <Link to={"/previous"}><a className="button is-primary">เรียงเบอร์เพลาก่อน</a></Link>
                </div>
            </div>
            <br></br>
        </div>
    );
};
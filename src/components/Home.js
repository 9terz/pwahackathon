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
                    <img src="http://bulma.io/images/placeholders/128x128.png" alt=""/>
                </div>
                <div>
                    <Link to={"/camera"}><a className="button is-primary">ถ่ายรูปเช็คเลข !</a></Link>
                </div>
                <div>
                    <Link to={"/top-rank"}><a className="button is-primary">เลขเด็ดเดือนนี้</a></Link>
                </div>
                <div>
                    <Link to={"/previous"}><a className="button is-primary">เรียงเบอร์เดือนก่อน</a></Link>
                </div>
            </div>
        </div>
    );
};
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

import './Home.scss'

export const Home = (props) => {
    const play = () => {
        document.getElementById('intro-music').play()
        document.getElementById('start-app').style.display = 'none'
    }

    return (
        <div>
        <div id="start-app">
            <button id="start-app-btn" onClick={() => play()}>ตั้งจิตอธิษฐาน</button>
        </div>
        <audio id="intro-music" src="/audio/intro-ok.mp3" loop="true"/>
            <div className="container is-fluid has-text-centered">
                <div>
                    <img src="img/treeinheaven.webp" alt=""/>
                </div>
                <br></br>
                <div>
                    <Link to={"/camera"}><a className="button goto-cap">จับภาพลุ้นโชค !</a></Link>
                </div>
                <br></br>
                <div>
                    <Link to={"/top-rank"}><a className="button goto-top">เลขเด็ดเพลานี้</a></Link>
                </div>
                <br></br>
                <div>
                    <Link to={"/previous"}><a className="button goto-prev">เรียงเบอร์เพลาก่อน</a></Link>
                </div>
            </div>
            <br></br>
        </div>
    );
};
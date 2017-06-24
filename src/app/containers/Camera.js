import React from "react";
// import {connect} from "react-redux";

export class Camera extends React.Component {
    render() {
        return (
            <div className="container is-fluid">
                <div className="columns">
                    <div className="column">
                        <figure className="image is-128x128">
                            <img src="http://bulma.io/images/placeholders/128x128.png">
                            </img>
                        </figure>
                    </div>
                    <div className="column">
                        <a className="button is-primary">ถ่าย</a>
                    </div>
                </div>
            </div>
        );
    }
}

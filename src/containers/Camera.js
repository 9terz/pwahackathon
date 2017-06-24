import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import Webcam from 'react-webcam';

import { upLoadImage } from 'actions/imageAction';

const Camera = class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          screenshot: null,
          shakeProgress: 0
        };
    }
    setRef = (webcam) => {
        this.webcam = webcam;
    }

    capture = () => {
        const screenshot = this.webcam.getScreenshot();
        this.setState({ screenshot });
    };

    recapture = () => {
        this.setState({ screenshot: null });
    };

    uploadImage = () => {
        console.log('upload image');
        this.props.upLoadImage(this.state.screenshot)
    };

    componentDidMount(){
        console.log('camear did mount');
        window.addEventListener('deviceorientation', (event) =>{
            let x = event.beta;
            let y = event.gamma;
            this.state.shakeProgress+=x;
        });
    }

    render() {
        return (
            <div className="container is-fluid has-text-centered">
                <div>
                    {this.state.screenshot ?
                        <img src={this.state.screenshot} />
                        :
                        <Webcam
                        audio={false}
                        height={350}
                        ref={this.setRef}
                        screenshotFormat="image/jpeg"
                        width={350}/>
                        }
                </div>
                <div>
                    {this.state.screenshot ?
                        <a className="button is-primary" onClick={this.recapture}>ถ่ายใหม่</a>
                        :
                        <a className="button is-primary" onClick={this.capture}>ถ่าย</a>
                        }
                </div>
                <div>
                    <a className="button is-primary" onClick={this.uploadImage}>upload</a>
                </div>
                <p>{this.state.shakeProgress}</p>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    img: state.img
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        upLoadImage: (img) => {
            dispatch(upLoadImage(dispatch, img));
        }
    };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Camera)
)

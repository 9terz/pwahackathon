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
          shakeProgress: 0,
          video_w:0,
          video_h:0,
          acc_x: 0,
          acc_y: 0,
          img_opa: 1.0
        };
    }
    setRef = (webcam) => {
        this.webcam = webcam;
    }
    
    capture = () => {
        var video = document.querySelector('video');
        var canvas = document.getElementById("c");
        let w = this.state.video_w;
        let h = this.state.video_h;
        canvas.getContext("2d").drawImage(video, 0, 0, w, h, 0, 0, w, h);
        var img = canvas.toDataURL("image/jpeg");
        console.log(img);
        console.log('done');
        this.setState({ screenshot: img });
    };

    recapture = () => {
        this.setState({ screenshot: null });
        this.opencamera();
    };

    uploadImage = () => {
        console.log('upload image');
        this.props.upLoadImage(this.state.screenshot)
    };

    opencamera = () => {
        let that = this;
        var constraints = {
            audio: false,
            video: { 
                facingMode: "environment"
              }
        }; 
        console.log('starting');
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
        var video = document.querySelector('video');
        var canvas = document.getElementById("c");
        
		var button = document.getElementById("b");
        
        
        video.srcObject = mediaStream;
        console.log('width',mediaStream.width);
        video.onloadedmetadata = function(e) {
            video.play();
            console.log('width is', this.videoWidth);
            console.log('height is', this.videoHeight);
            canvas.width = this.videoWidth;
            canvas.height = this.videoHeight;
            that.setState({video_w: this.videoWidth});
            that.setState({video_h: this.videoHeight});

        };
        })
        .catch(function(err) { console.log(err.name + ": " + err.message); });
        // always check for errors at the end.
    }
    test = () => {
        this.setState({
            shakeProgress: this.state.shakeProgress + 1
        });
        if(this.state.shakeProgress > 1 && this.state.screenshot) {
                    // var snowDiv = document.getElementById("snow");
                    // snowDiv.className += " active";
                    var image = document.getElementById("my-image");
                    this.setState({img_opa: this.state.img_opa - 0.05})
                    image.style.opacity = this.state.img_opa;
                }
    };

    componentDidMount(){
        
        console.log('camear did mount');
        window.addEventListener('devicemotion', (event) =>{
            let x = event.acceleration.x;
            let y = event.acceleration.y;
            this.setState({acc_x:x});
            this.setState({acc_y:y});
            if (x > 10 || y > 10){
                this.setState({
                    shakeProgress: this.state.shakeProgress + 1
                });
            }
            if(this.state.shakeProgress > 1 && this.state.screenshot) {
                    // var snowDiv = document.getElementById("snow");
                    // snowDiv.className += " active";
                    var image = document.getElementById("my-image");
                    image.style.opacity -= 0.05 
                }
        });
        this.opencamera();
        
    }

    render() {
        return (
            <div className="container is-fluid has-text-centered">
                <p>v2</p>
                <a onClick={this.test}>increment</a>
                
                <canvas id="c" style={{'display':'none'}}></canvas>
                <div>
                    {this.state.screenshot ?
                        <img id="my-image" src={this.state.screenshot}/>
                        :
                        <video id="my-video"/>
                        }
                </div>
                <div>
                    {this.state.screenshot ?
                        <a className="button is-primary" onClick={this.recapture}>จับภาพอีกครั้งหนึ่ง</a>
                        :
                        <a className="button is-primary" onClick={this.capture}>จับภาพ</a>
                        }
                </div>
                <br></br>
                <div>
                    <a className="button is-primary" onClick={this.uploadImage}>ส่งผลไปยังเบื้องบน</a>
                </div>
                
                <p>x: {this.state.acc_x}</p>
                <p>y: {this.state.acc_y}</p>
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

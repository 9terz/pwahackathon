import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom'
import Webcam from 'react-webcam';
import FontAwesome from 'react-fontawesome';
import ScratchCard from 'react-scratchcard';

import { upLoadImage, decrementOpacity } from 'actions/imageAction';

const Camera = class Camera extends React.Component {
    constructor(props) {
        super(props);
        var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
        console.log('viewport:',w,h);
        this.settings = {
            width: w,
            height: h,
            image: '/img/grey.png',
            finishPercent: 50,
            onComplete: () => console.log('The card is now clear!')
        };
        this.state = {
          screenshot: null,
          shakeProgress: 0,
          video_w:0,
          video_h:0,
          acc_x: 0,
          acc_y: 0,
          img_opa: 1.0,
          step: 0
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
        this.uploadImage(img);

    };

    recapture = () => {
        this.setState({ screenshot: null });
        this.opencamera();
    };
    uploadImage = (img) => {
        console.log('upload image');
        this.props.upLoadImage(img);
    };

    decrementOpacity = (amount) => {
        console.log('dec',amount);
        this.props.decrementOpacity(amount);
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
        if(this.state.shakeProgress > 0 && this.state.screenshot) {
            var snowDiv = document.getElementById("snow");
            snowDiv.className = "snow active";
            var image = document.getElementById("my-image");
            this.setState({img_opa: this.state.img_opa - 0.05})
            this.decrementOpacity(0.05);
            image.style.opacity = this.state.img_opa;
        }
        if (this.state.img_opa - 0.05 <= 0 && this.state.step === 0) {
            console.log('step2');
            this.setState({step: 1});
            let allcontent = document.getElementById("allcontent");
            allcontent.style.display = "none";
            let scratchDiv = document.getElementById("scratchDiv");
            scratchDiv.style.display = "block"
        }
    };

    componentDidMount(){
        let that = this;
        console.log('camear did mount');
        window.addEventListener('devicemotion', (event) =>{
            let x = event.acceleration.x;
            let y = event.acceleration.y;
            this.setState({acc_x: x});
            this.setState({acc_y: y});
            if (x > 10 || y > 10){
                this.setState({
                    shakeProgress: this.state.shakeProgress + 1
                });
                if(this.state.shakeProgress > 0 && this.state.screenshot) {
                    var snowDiv = document.getElementById("snow");
                    snowDiv.className = "snow active";
                    var image = document.getElementById("my-image");
                    that.setState({img_opa: this.state.img_opa - 0.05})
                    that.decrementOpacity(0.05);
                    image.style.opacity = this.state.img_opa;
                }
                if (this.state.img_opa - 0.05 <= 0) {
                    console.log('step2');
                    this.setState({step: 1});
                    let allcontent = document.getElementById("allcontent");
                    allcontent.style.display = "none";
                    let scratchDiv = document.getElementById("scratchDiv");
                    scratchDiv.style.display = "block"
                }
            }
        });
        this.opencamera();
        
    }

    render() {
        return (
            <div id="cameraMainDiv" className="container is-fluid has-text-centered">
                <canvas id="c" style={{'display':'none'}}></canvas>
                <div id="allcontent">
                    <div id="snow">
                        {this.state.screenshot ?
                            <img id="my-image" src={this.state.screenshot}/>
                            :
                            <video id="my-video"/>
                            }
                        { this.state.screenshot && this.state.img_opa > 0 &&
                            <div id="diode" className="diode">
                                <div id="laser" className="laser" >
                                    <p style={{'color':'red','fontSize':'200%'}}>เขย่าเพื่อโรยแป้ง</p>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="center-justified">
                        {!this.state.screenshot &&
                            <a className="mybtn button is-primary btn-lr-margin" onClick={this.capture}>
                                <FontAwesome
                                    className='super-crazy-colors'
                                    name='camera-retro'
                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                />
                                &nbsp;จับภาพ
                            </a>
                            }
                    </div>
                    <p>{this.state.shakeProgress}</p>
                    <a onClick={this.test}>increment</a>
                    <a onClick={this.test}>swipe</a>
                    
                </div>
                <div id="scratchDiv" style={{
                    'display':'none',
                    }}>
                    <ScratchCard {...this.settings}>
                        <div>
                            <p>Hello</p>
                        </div>
                        {/*Congratulations! You WON!*/}
                        
                    </ScratchCard>
                </div>
                
                
            </div>
        );
    }
}

const mapStateToProps = (state) => {
  return {
    // img: state.img,
    // bgOpactiy: state.bgOpactiy
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        upLoadImage: (img) => {
            dispatch(upLoadImage(dispatch, img));
        },
        decrementOpacity: (amount) => {
            dispatch(decrementOpacity(dispatch, amount));
        }
    };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Camera)
)

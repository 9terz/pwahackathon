import React from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from 'react-router-dom'
import Webcam from 'react-webcam';
import FontAwesome from 'react-fontawesome';
import ScratchCard from 'react-scratchcard';
import { database } from '../../actions/database';

import { upLoadImage, decrementOpacity, setResult, setOpacity } from 'actions/imageAction';
import {
  Link
} from 'react-router-dom'

import './style.scss'

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
            onComplete: () => {
                var text = document.getElementById("scratchText")
                text.style.display = 'none';
                console.log('The card is now clear!')
                this.getRichNumber()
                // document.getElementById('sound-finish').play()
            }
        };
        this.state = {
          screenshot: null,
          shakeProgress: 0,
          video_w:0,
          video_h:0,
          acc_x: 0,
          acc_y: 0,
          img_opa: 1.0,
          step: 0,
          richNumber: 'loading',
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

    playAgain = () => {
        console.log('play again');
        this.setState({screenshot:null});
        this.setState({img_opa:1.0});
        this.setState({step:0});
        // this.router.history.push('/');
        this.setState({
            mustRedirect: true,
        })
        this.props.setOpacity(1.0);

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
                    // document.getElementById('sound-shake').play()
                    new Audio('/audio/mopmap.mp3').play()
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
        // this.updateCanvas();

    }

    getResult = () => {

}

    getRichNumber() {
        console.log('get result');
        console.log(this.props.img.name);
        let img_name = this.props.img.name;//'1498374219943.jpg'
        let result = '113'

        img_name = img_name.slice(0,img_name.indexOf('.'));
        database.ref('/img/'+img_name).once('value')
        .then((snapshot)=>{
            console.log(snapshot.val().predictResult);
            result = snapshot.val().predictResult;
            this.props.setResult(result);
            this.setState({
                richNumber2: result,
            })

            document.getElementById('open-eye').style.display = 'block'
        }).catch((err) =>{
            // console.log('error1234 ',err);
            result = ''+Math.floor( Math.random() * 10)+''+Math.floor( Math.random() * 10)+''+Math.floor( Math.random() * 10)
            this.setState({
                richNumber2: result,
            })
            this.speakNumber(result)
        })
    }

    speakNumber(result) {
        // document.getElementById('speak-num-start').play()

        // setTimeout(()=>{
        //     const a = document.getElementById('speak-num-1')
        //     a.src = '/audio/' + result[0] + '.mp3'
        //     a.play()
        // }, 1500);

        // setTimeout(()=>{
        //     const a = document.getElementById('speak-num-1')
        //     a.src = '/audio/' + result[1] + '.mp3'
        //     a.play()
        // }, 2500);

        // setTimeout(()=>{
        //     const a = document.getElementById('speak-num-1')
        //     a.src = '/audio/' + result[2] + '.mp3'
        //     a.play()
        // }, 3500);

        // setTimeout(()=>{
        //     document.getElementById('speak-ruay').play()
        // }, 4500);
        document.getElementById('speak-ruay').play()
    }

    render() {
        return (
            <div id="cameraMainDiv" className="container is-fluid has-text-centered">
                <div id="open-eye">
                    <button id="open-eye-btn" className="button"
                        onClick={() => {
                            this.speakNumber(this.state.richNumber2)
                            this.setState({
                                richNumber: this.state.richNumber2,
                            })
                            document.getElementById('open-eye').style.display = 'none'
                        }}>เบิกเนตร</button>
                </div>
                <audio src="/audio/number_t_org.mp3" id="speak-num-start"/>

                <audio src="/audio/0.mp3" id="speak-num-1"/>
                <audio src="/audio/0.mp3" id="speak-num-2"/>
                <audio src="/audio/0.mp3" id="speak-num-3"/>

                <audio src="/audio/ruay-sathu-sudyod.mp3" id="speak-ruay"/>
                <canvas id="c" style={{'display':'none'}}></canvas>
                <div id="allcontent">
                    <div id="snow">
                        {/*<a className="button goto-cap" onClick={this.getResult} >result</a>*/}
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
                        {!this.state.screenshot ?
                            (<a className="button camera" onClick={this.capture}>
                                <FontAwesome
                                    className='super-crazy-colors'
                                    name='camera-retro'
                                    style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }}
                                />
                                &nbsp;จับภาพ
                            </a>):
                                (
                                    <div>
                                        <a onClick={this.test} className="button">เขย่า</a>
                                    </div>
                                )
                            }
                    </div>
                </div>
                <div id="scratchDiv" style={{
                    'display':'none',
                    }}>
                    <div id="scratchText" className="scratchText">
                        ถูเบาๆ
                    </div>
                    <ScratchCard {...this.settings}>
                        <div className="container is-fluid">
                            <div id="circle-number" className="column is-4 is-offset-4">
                                <img src="/img/circle-rich.png" alt="" />
                                <p id="rich-number">{ this.state.richNumber === 'loading' ?
                                    (
                                        <div id="buddha-loading">
                                            <img src="/img/buddha-loading.gif" alt=""/>
                                        </div>
                                    ) :
                                    (
                                        <div>{ this.state.richNumber }</div>
                                    )
                                 }</p>
                            </div>
                            <div className="columns">
                                <div className="column is-12">
                                    <a className="button goto-cap" onClick={this.playAgain} >ลองอีกครั้ง</a>
                                    {
                                        this.state.mustRedirect && ( <Redirect to={'/'}/> )
                                    }
                                </div>
                                {/*<div className="column is-6">
                                    <Link to={"/camera"}><a className="button share">แชร์เลขเด็ด</a></Link>
                                </div>*/}

                            </div>
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
    img: state.image,
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
        },
        setOpacity: (num) => {
            dispatch(setOpacity(dispatch, 1.0));
        },
        setResult: (img_name) => {
            dispatch(setResult(dispatch,img_name));
        },

    };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Camera)
)

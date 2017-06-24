import React from "react";
import {connect} from "react-redux";
import Webcam from 'react-webcam';
import { upLoadImage } from '../actions/imageAction';
import { store } from '../store';

export class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          screenshot: null,
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
        // store.dispatch(upLoadImage(this.state.screenshot));
        console.log('upload image');
    };

    componentDidMount(){
        console.log('camear did mount');
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
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//   return {
//     //   user: state.user,
//     //   math: state.math
//     img: state.img
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         upLoadImage: (img) => {
//             dispatch(upLoadImage(img));
//         }
//     };
// };
// export default connect(state => state)(Camera)
// export default connect(mapStateToProps, mapDispatchToProps)(Camera);
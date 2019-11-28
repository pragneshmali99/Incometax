import React from 'react';
import './App.css';
import Webcam from "react-webcam";
import Popup from "reactjs-popup";

class App extends React.Component {

  setRef = webcam => {
    this.webcam = webcam;
  };
  capture = () => {
    const imageSrc = this.webcam.getScreenshot();
    alert(imageSrc);
  };

  render () {
   
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };
   
    return (
     
      <div className="App">
        <div className='popup'>
          <div className='popup_inner'>
            <div>
              <Webcam
                audio={false}
                height={300}
                ref={this.setRef}
                screenshotFormat="image/jpeg"
                width={300}
                videoConstraints={videoConstraints}/>
            </div>
            <div>
              <button onClick={this.capture}>Capture photo</button>
            </div>
          </div>
        </div>
     
      </div>
    );
  }
}

export default App;





'use strict'
import React, { Component } from 'react';
// import React from 'react';
import './App.css';
import Webcam from "react-webcam";
import Popup from "reactjs-popup";
import * as firebase from 'firebase';

//------------------------SPEECH RECOGNITION-----------------------------

const SpeechRecognition = typeof window !== 'undefined' && ( window.SpeechRecognition || window.webkitSpeechRecognition )
const recognition = new SpeechRecognition()
recognition.continous = true
recognition.interimResults = true
recognition.lang = 'hi-IN'

let stopCmd;
let database;
let dbimage;
let imageSrc;
let myrecorded;
let getedspeech;

// function storeDemo () {
//     console.log("Yes IN FUNCTION")
//     dbimage
//     .set(imageSrc)
//     .then(success => {
//        console.log("Yes successs")
//       })
//         .catch(err => {
//           console.log(err);
//         //   showMessage("Some error occurred");
//         });
// }

class Bothindialog extends React.Component {
    // -----------Speech--------------
    constructor() {
        super()
        this.state = {
          listening: false,
          isOpen: true 
          
        }
        this.toggleListen = this.toggleListen.bind(this)
        this.handleListen = this.handleListen.bind(this)
    }

    toggleListen() {
        this.setState({
          listening: !this.state.listening
        }, this.handleListen)
    }

    componentDidMount(){
        this.toggleListen();
        // window.setTimeout(function(){ document.location.reload(true); }, 15000);
    }

    
    handleListen() {

        console.log('listening?', this.state.listening)

        if (this.state.listening) {
        recognition.start()
        recognition.onend = () => {
            console.log("...continue listening...")
            recognition.start()
        }

        } else {
        recognition.stop()
        recognition.onend = () => {
            console.log("Stopped listening per click")
        }
        }

        recognition.onstart = () => {
        console.log("Listening!")
        }

        let finalTranscript = ''
        recognition.onresult = event => {
        // let interimTranscript = ''

        for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) finalTranscript += transcript + ' ';
            // else interimTranscript += transcript;
        }
        // document.getElementById('interim').innerHTML = interimTranscript
        document.getElementById('final').innerHTML = finalTranscript

        getedspeech = finalTranscript;


        console.log("FINAL T :: ", getedspeech );
       

        //-------------------------COMMANDS------------------------------------

        const transcriptArr = finalTranscript.split(' ')
        stopCmd = transcriptArr.slice(-3, -1)
        console.log('stopCmd :: ', stopCmd)
        

        if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
            recognition.stop()
            recognition.onend = () => {
            console.log('Stopped listening per command')
            const finalText = transcriptArr.slice(0, -3).join(' ')
            document.getElementById('final').innerHTML = finalText
            }
            
        }
        }
        
        //-----------------------------------------------------------------------
        
        recognition.onerror = event => {
        console.log("Error occurred in recognition: " + event.error)
        }

    }

    //---------------------------------IMAGE CAPTURE----------------------------------------------

    setRef = webcam => {
        this.webcam = webcam;
    };
    capture = () => {
        imageSrc = this.webcam.getScreenshot();
        // alert(imageSrc);
        myrecorded = getedspeech;
        console.log("LETS THE CHECK LISTNER :: ", myrecorded);
        console.log("LETS THE CHECK Image :: ", imageSrc);
       
        // writeUserData(email,fname,lname) {
        //     // database = firebase.database();
        //     firebase.database().ref('incometax-111d6/').push({
        //         image,
        //         speech
        //     }).then((data)=>{
        //         //success callback
        //         console.log('data ' , data)
        //     }).catch((error)=>{
        //         //error callback
        //         console.log('error ' , error)
        //     })
        // }

        // image = ["image"]

        var complainData={
            image:imageSrc,
            speech:myrecorded

            // description:this.authForm.value.description,
          
          } 
        database = firebase.database();
        dbimage = database.ref("/");
        console.log("MY DB IMAGE :: " , dbimage);
        dbimage.push(complainData).then((val) => {
            console.log("val",val);
            console.log("Sccess data");
            // this.navCtrl.push(ComplaintPage);
            this.setState({ isOpen: false });
          });

        

        // dbimage.push("value", snap => {
            
        //     // const val = snap.val();
        //     console.log("IN B")
        //     storeDemo();

        // });

        // dbimage.then((data)=>{
        //     //success callback
        //     console.log('data ' , data)
        // }).catch((error)=>{
        //     //error callback
        //     console.log('error ' , error)
        // })
    };

    // genrateIncometax (){
       
    //     const imageSrc = this.webcam.getScreenshot();
    //     const mylistner =  this.state.listening;
    //     console.log("LETS THE CHECK LISTNER :: ", mylistner);
    //     alert(imageSrc);

    // }

    handleOpen = () => {
        this.setState({ isOpen: true });
      }
    
    handleClose = () => {
    this.setState({ isOpen: false });
    }
    
    

    render () {
    
        const videoConstraints = {
        width: 1280,
        height: 1000,
        facingMode: "user"
        };
    
        return (

            <div>
                <div>
                <button onClick={this.handleOpen}>Open Popup</button>
                </div>
                <Popup
                    // trigger={<button>click to open</button>}
                    // content={<button onClick={this.handleClose}>click to close</button>}
                    on='click'
                    open={this.state.isOpen}
                    onOpen={this.handleOpen}>

                    <div>
                        <Webcam
                            audio={false}
                           
                          className="webcam"
                            ref={this.setRef}
                            screenshotFormat="image/jpeg"
                           
                            videoConstraints={videoConstraints}/>
                    </div>

                    <div style={container}>
                        {/* <button id='microphone-btn' style={button} onClick={this.toggleListen} />
                        <div id='interim' style={interim}></div>
                        <div id='final' style={final}></div> */}

                        <div id='final' style={final}></div>
                    </div>

                    <div>
                    <button  className="button"  onClick={this.capture}>Submit</button>
                    {/* <button onClick={this.handleClose}>click to close</button> */}
                    {/* <button onClick={this.genrateIncometax}>Capture photo</button> */}
                    </div>
                </Popup>
            </div>
  
        // <div className="popup">
        //     <div className='popup_inner'>
        //         <div className='App'>
                    // <div>
                    // <Webcam
                    //     audio={false}
                    //     height={250}
                    //     ref={this.setRef}
                    //     screenshotFormat="image/jpeg"
                    //     width={250}
                    //     videoConstraints={videoConstraints}/>
                    // </div>
                

                    // <div style={container}>
                    //     {/* <button id='microphone-btn' style={button} onClick={this.toggleListen} />
                    //     <div id='interim' style={interim}></div>
                    //     <div id='final' style={final}></div> */}

                    //     <div id='final' style={final}></div>
                    // </div>

                    // <div>
                    // <button onClick={this.capture}>Capture photo</button>
                    // {/* <button onClick={this.genrateIncometax}>Capture photo</button> */}
                    // </div>
        //         </div>
        //     </div>
        // </div>
        );
    }
}

export default Bothindialog;

//-------------------------CSS------------------------------------

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      padding: '1em',
      width: '380px',
      height: '50px'
    },
    button: {
      width: '60px',
      height: '60px',
      background: 'lightblue',
      borderRadius: '50%',
      margin: '6em 0 2em 0'
    },
    interim: {
      color: 'gray',
      border: '#ccc 1px solid',
      padding: '1em',
      margin: '1em',
      width: '300px'
    },
    final: {
      color: 'black',
      border: '#ccc 1px solid',
      padding: '1em',
      margin: '1em',
      width: '300px'
    }
  }
  
  const { container, button, interim, final } = styles





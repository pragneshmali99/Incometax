import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SpeechText from './SpeechText';
import Bothindialog from './Bothindialog';
import * as serviceWorker from './serviceWorker';
import * as firebase from 'firebase';


//------------Firebase Keyy-------------
  var firebaseConfig = {
    apiKey: "AIzaSyDHQ-IN3WfcPfSrAOK4JrhZ-ivv4OrruWM",
    authDomain: "incometax-111d6.firebaseapp.com",
    databaseURL: "https://incometax-111d6.firebaseio.com",
    projectId: "incometax-111d6",
    storageBucket: "incometax-111d6.appspot.com",
    messagingSenderId: "493277817876",
    appId: "1:493277817876:web:0b7fc11bcbd87a419b0b01",
    measurementId: "G-LSGETNQH0L"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
//   firebase.analytics();


// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<SpeechText />, document.getElementById('root'));
ReactDOM.render(<Bothindialog />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

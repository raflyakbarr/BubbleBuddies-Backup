import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

firebase.initializeApp({
  apiKey: "AIzaSyA3TgbpaKJQJMUO5bzzCzYyx5-8MYSVcsI",
  authDomain: "bubblebuddies-eb948.firebaseapp.com",
  databaseURL: "https://bubblebuddies-eb948-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "bubblebuddies-eb948",
  storageBucket: "bubblebuddies-eb948.appspot.com",
  messagingSenderId: "976214420802",
  appId: "1:976214420802:web:c879079705353c2c4d6cdb"
});

const FIREBASE = firebase;

export default FIREBASE;
import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAGNGi-jmFUqnasNW1kwJZ8ANlP8ovkCz8",
  authDomain: "my-favourite-streamers.firebaseapp.com",
  databaseURL: "https://my-favourite-streamers.firebaseio.com",
  projectId: "my-favourite-streamers",
  storageBucket: "my-favourite-streamers.appspot.com",
  messagingSenderId: "170337457033",
  appId: "1:170337457033:web:ee5fbb4eec8c80f4438758",
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth;
export const db = firebase.firestore();

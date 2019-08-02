importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');
var config = {
    apiKey: "AIzaSyC48D8A57sXBcTMYbdYnigwMLj_X4HouaM",
    authDomain: "ssafy-49605.firebaseapp.com",
    databaseURL: "https://ssafy-49605.firebaseio.com",
    projectId: "ssafy-49605",
    storageBucket: "ssafy-49605.appspot.com",
    messagingSenderId: "824421407150",
    appId: "1:824421407150:web:c16f3997c6febade"
};
firebase.initializeApp(config);
const messaging = firebase.messaging();

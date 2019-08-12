import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/messaging";
import RestService from "@/services/RestService";
import fbConfig from "../config/firebaseConfig";
const POSTS = "posts";
const PORTFOLIOS = "portfolios";

// Setup Firebase
const config = fbConfig;

firebase.initializeApp(config);
const firestore = firebase.firestore();

//firebase FCM push notification 사용
const messaging = firebase.messaging();
messaging
    .requestPermission()
    .then(function() {
        //console.log('Have Permission');
        return messaging.getToken();
        //토큰 생성
    })
    .then(function(token) {
        const pushtoken = token;
        RestService.insertToken(pushtoken);
        //console.log(pushtoken);
    })
    .catch(function(err) {
        console.log("Error Occured.");
    });

navigator.serviceWorker.register("firebase-messaging-sw.js");
messaging.onMessage(function(payload) {
    //console.log('onMessage: ', payload);
    //console.log(payload.notification.body);
    navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(
            payload.notification.title,
            JSON.parse(payload.notification.body)
        );
    });
});

export default {
    getPosts() {
        const postsCollection = firestore.collection(POSTS);
        return postsCollection
            .orderBy("created_at", "desc")
            .get()
            .then(docSnapshots => {
                return docSnapshots.docs.map(doc => {
                    let data = doc.data();
                    data.created_at = new Date(data.created_at.toDate());
                    return data;
                });
            });
    },
    postPost(title, body) {
        return firestore.collection(POSTS).add({
            title,
            body,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        });
    },
    getPortfolios() {
        const postsCollection = firestore.collection(PORTFOLIOS);
        return postsCollection
            .orderBy("created_at", "desc")
            .get()
            .then(docSnapshots => {
                return docSnapshots.docs.map(doc => {
                    let data = doc.data();
                    data.created_at = new Date(data.created_at.toDate());
                    return data;
                });
            });
    },
    postPortfolio(title, body, img) {
        return firestore.collection(PORTFOLIOS).add({
            title,
            body,
            img,
            created_at: firebase.firestore.FieldValue.serverTimestamp()
        });
    },
    loginWithGoogle() {
        let provider = new firebase.auth.GoogleAuthProvider();
        //console.log(provider);
        return firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                let accessToken = result.credential.accessToken;
                //console.log(accessToken);
                let user = result.user;
                //console.log(user);
                return result;
            })
            .catch(function(error) {
                console.error("[Google Login Error]", error);
            });
    },
    loginWithFacebook() {
        let provider = new firebase.auth.FacebookAuthProvider();
        return firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                let accessToken = result.credential.accessToken;
                //console.log(accessToken);
                let user = result.user;
                //console.log(user);
                return result;
            })
            .catch(function(error) {
                console.error("[Facebook Login Error]", error);
            });
    },
    loginWithEmail() {
        let provider = new firebase.auth.EmailAuthProvider();
        return firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                let accessToken = result.credential.accessToken;
                //console.log(accessToken);
                let user = result.user;
                //console.log(user);
                return result;
            })
            .catch(function(error) {
                console.error("[Facebook Login Error]", error);
            });
    }
};

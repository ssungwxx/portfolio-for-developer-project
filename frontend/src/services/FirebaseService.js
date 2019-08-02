import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/messaging";
const POSTS = "posts";
const PORTFOLIOS = "portfolios";

// Setup Firebase
const config = {
    apiKey: "AIzaSyC48D8A57sXBcTMYbdYnigwMLj_X4HouaM",
    authDomain: "ssafy-49605.firebaseapp.com",
    databaseURL: "https://ssafy-49605.firebaseio.com",
    projectId: "ssafy-49605",
    storageBucket: "ssafy-49605.appspot.com",
    messagingSenderId: "824421407150",
    appId: "1:824421407150:web:c16f3997c6febade"
};

firebase.initializeApp(config);
const firestore = firebase.firestore();

//firebase FCM push notification 사용
const messaging = firebase.messaging();
messaging.requestPermission()
.then(function(){
  console.log('Have Permission');
  return messaging.getToken();
  //토큰 생성
})
.then(function(token){
  console.log(token);
})
.catch(function(err){
  console.log('Error Occured.');
})

messaging.onMessage(function(payload){
  console.log('onMessage: ', payload);
  //페이지가 열려 있을 때면 push 알림이 아닌 console로
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
        console.log(provider);
        return firebase
            .auth()
            .signInWithPopup(provider)
            .then(function(result) {
                let accessToken = result.credential.accessToken;
                console.log(accessToken);
                let user = result.user;
                console.log(user);
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
                console.log(accessToken);
                let user = result.user;
                console.log(user);
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
                console.log(accessToken);
                let user = result.user;
                console.log(user);
                return result;
            })
            .catch(function(error) {
                console.error("[Facebook Login Error]", error);
            });
    }
};

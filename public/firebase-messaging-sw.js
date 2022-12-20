// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');
// import { initializeApp } from "firebase/app";
// import { getMessaging, onMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing the generated config
firebase.initializeApp( {
  apiKey: "AIzaSyDNr0TinKmk5a2pvea90fAAsGzjgBUPiE4",
  authDomain: "capstone-wellbell.firebaseapp.com",
  projectId: "capstone-wellbell",
  storageBucket: "capstone-wellbell.appspot.com",
  messagingSenderId: "1013195598076",
  appId: "1:1013195598076:web:89079b382cf037959b4f79",
  measurementId: "G-X50QF8GGM5"
});



// Retrieve firebase messaging
const messaging = firebase.messaging()


// Notification.requestPermission().then((permission) => {
//   if (permission === "granted") {
//     console.log("Notification permission granted.");
//   }})
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
    return true;
});
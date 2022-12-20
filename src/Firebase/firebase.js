// Imports
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { getAuth } from "firebase/auth";

// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDNr0TinKmk5a2pvea90fAAsGzjgBUPiE4",
  authDomain: "capstone-wellbell.firebaseapp.com",
  projectId: "capstone-wellbell",
  storageBucket: "capstone-wellbell.appspot.com",
  messagingSenderId: "1013195598076",
  appId: "1:1013195598076:web:89079b382cf037959b4f79",
  measurementId: "G-X50QF8GGM5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//messaging
const messaging = getMessaging(app);


export const retrieveToken = () => {

  return getToken(messaging, {
    vapidKey:
      "BP2vnUBO-X6Aw6KNtsS9Pst64XUuK_Pdscd70wrrylC_-g-oGW7nABQ6P-Mdr32jBL8isvGGB4Hn2MSb73DzwVk",
  })
    .then((currentToken) => { 
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        return currentToken;
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    console.log("onmessage thing works");
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });

//Auth

export const auth = getAuth(app);

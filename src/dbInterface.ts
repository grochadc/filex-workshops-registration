import firebase from "firebase";

console.log(".ENV", process.env);
const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: "https://filex-5726c.firebaseio.com",
  projectId: "filex-5726c",
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

firebase.initializeApp(config);
export default firebase.database();

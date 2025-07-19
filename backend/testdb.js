const db = require('./firebase-plattech');

db.collection('debug-test').add({ ping: "pong" })
  .then(() => {
    console.log("Success: Firestore is connected");
  })
  .catch(err => {
    console.error("Error: ", err);
  });

var admin = require("firebase-admin");

var serviceAccount = require('./geapp-d5a80-319fa003f413.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://geapp-d5a80.firebaseio.com"
});

module.exports.admin=admin
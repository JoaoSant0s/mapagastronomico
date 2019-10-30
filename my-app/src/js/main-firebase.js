class FirebaseWrapper {
  constructor() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyADb22PIWLCcvN0KYPWVPLKg9tUKbJU5g4",
      authDomain: "mapagastronomico-7896b.firebaseapp.com",
      databaseURL: "https://mapagastronomico-7896b.firebaseio.com",
      projectId: "mapagastronomico-7896b",
      storageBucket: "mapagastronomico-7896b.appspot.com",
      messagingSenderId: "60900977626",
      appId: "1:60900977626:web:b670e75b17455915942ee3",
      measurementId: "G-QX68MQMJ1Y"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }

  getMarkersDefinitions() {
    return new Promise((resolve, reject) => {
      try {
        firebase.database().ref('marketsDefinition').once('value').then(function (marketsDefinition) {
          let result = marketsDefinition.val() || [];
          resolve(result);
        })
      } catch (error) {
        console.log(error);
        resolve([]);
      }
    });
  }  
}

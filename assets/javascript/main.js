var config = {
    apiKey: "AIzaSyAR6zZxo6orXiylc0-YEWv4MMK4CBUKyG4",
    authDomain: "train-app-82493.firebaseapp.com",
    databaseURL: "https://train-app-82493.firebaseio.com",
    projectId: "train-app-82493",
    storageBucket: "train-app-82493.appspot.com",
    messagingSenderId: "750269279062"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
  var name = '';
  var destination = '';
  var frequency = '';
  var firstTrain = '';

  $("#button").on("click",function(event) {
    event.preventDefault();

    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    dataRef.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });
  });
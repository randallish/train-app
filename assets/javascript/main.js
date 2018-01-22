
// initializing firebase
var config = {
    apiKey: "AIzaSyAR6zZxo6orXiylc0-YEWv4MMK4CBUKyG4",
    authDomain: "train-app-82493.firebaseapp.com",
    databaseURL: "https://train-app-82493.firebaseio.com",
    projectId: "train-app-82493",
    storageBucket: "train-app-82493.appspot.com",
    messagingSenderId: "750269279062"
  };
  firebase.initializeApp(config);

// global variables and database reference
  var database = firebase.database();
  var name = '';
  var destination = '';
  var frequency = '';
  var firstTrain = '';

// assigning values and storing data  
  $("#submit").on("click",function(event) {
    event.preventDefault();

    // grabbing user input
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTrain = $("#first-input").val().trim();
    frequency = $("#frequency-input").val().trim();
    // console.log(name);
    // console.log(destination);
    // console.log(firstTrain);
    // console.log(frequency);

    // pushing new data to firebase
    database.ref().push({
        name: name,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });

    // resetting values
    $("#name-input").val('');
    $("destination-input").val('');
    $("#first-input").val('');
    $("#frequency-input").val('');
  });

// adding to database and appending to html
  database.ref().on("child_added", function(childSnapshot) {    
      // testing whats coming out of snapshot

    //   console.log(childSnapshot.val().name);
    //   console.log(childSnapshot.val().destination);    
    //   console.log(childSnapshot.val().firstTrain);    
    //   console.log(childSnapshot.val().frequency);    

    // variables for snapshot values
      var addedName = childSnapshot.val().name;
      var addedDest = childSnapshot.val().destination;
      var addedTrain = childSnapshot.val().firstTrain;
      var addedFreq = childSnapshot.val().frequency;


      // first time
      var convert = moment(convert).subtract(1,"years").format("MMM DD, YYYY hh:mm A");

      // difference between times
      var difference = moment().diff(moment(convert),"minutes");

      // time apart 
      var remainder = difference % addedFreq;

      // minutes away
      var minutesAway = addedFreq - remainder;

      // next train time    
      var nextTrain = moment().add(minutesAway,"minutes");

      // arrival time
      var arrival = moment(nextTrain).format("hh:mm");

      // appending to the table with cells/rows 
      $("#table-schedule > thead").append(
          "<tr><td>" + addedName +"</td>" +
          "<td>" + addedDest + "</td>" + 
          "<td>" + addedFreq + "</td>" +
          "<td>" + arrival  + "</td>" +
          "<td>" + minutesAway + "</td><tr>"
      );
  });


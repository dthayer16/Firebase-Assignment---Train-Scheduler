// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new trains - then update the html + update the database
// 3. Create a way to retrieve trains from the train database.
// 4. Create a way to calculate the next train arrival using moment.js
// 5. Calculate Minutes Away

// 1. Initialize Firebase
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAVdLPgGSyAkm2wyflXy_VQhJumQx6EAIU",
    authDomain: "fir-train-scheduler-67906.firebaseapp.com",
    databaseURL: "https://fir-train-scheduler-67906.firebaseio.com",
    projectId: "fir-train-scheduler-67906",
    storageBucket: "",
    messagingSenderId: "1030226735983",
    appId: "1:1030226735983:web:ffc759e7f4b3be2e"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  var database = firebase.database();
  
  // 2. Button for adding Trains
  $("#add-train-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrainTime = $("#train-time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();
  
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      destination: trainDestination,
      firstTrain: firstTrainTime,
      frequency: trainFrequency
    };
  
    // Uploads train data to the database
    database.ref().push(newTrain);
  
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#train-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrain;
    var trainFrequency = childSnapshot.val().frequency;
  
    // // Calculate Next Arrival based on first train, current time and frequency
    // //Asumptions 
    // var tFrequency = 3; // "#frequency-input"
    // // Time is 3:30 AM
    // var firstTime = "03:30"; //"#train-time-input"
    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    // Create the new row
    var newRow = $("<tr>").append(
      $("<td>").text(trainName),
      $("<td>").text(trainDestination),
      $("<td>").text(trainFrequency),
      $("<td>").text("Next Arrival"),
      $("<td>").text("Minutes Away")
    );
  
    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
  });
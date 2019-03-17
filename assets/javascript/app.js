
  
  var config = {
    apiKey: "AIzaSyDookgwH_5AK-NxX7i3mj403oKvYh19lb8",
    authDomain: "trainschedule2123.firebaseapp.com",
    databaseURL: "https://trainschedule2123.firebaseio.com",
    projectId: "trainschedule2123",
    storageBucket: "trainschedule2123.appspot.com",
    messagingSenderId: "379208211387"
  };
  firebase.initializeApp(config);


var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-input").val().trim();
  var trainDest = $("#destination-input").val();
  var trainTime = $("#time-input").val();
  var trainFreq = $("#frequency-input").val();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    dest: trainDest,
    time: trainTime,
    freq: trainFreq
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainTime = childSnapshot.val().time;
  var trainFreq = childSnapshot.val().freq;


  // Prettify the train start
  var trainStartPretty = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log("trainStartP", trainStartPretty);
 
  var diffTime = moment().diff(moment(trainStartPretty), "minutes");
  console.log("diffTime", diffTime);

  var timeRemain = diffTime % trainFreq;
  console.log("timeRemain", timeRemain);
  var tMinAway = trainFreq - timeRemain;

  var nextTrain = moment().add(tMinAway, "minutes").format("HH:mm");

// Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(tMinAway),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
}); 
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase


// Initialize Firebase
/* <script src="https://www.gstatic.com/firebasejs/5.9.0/firebase.js"></script> */

  // Initialize Firebase
  // Initialize Firebase
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

// 2. Button for adding Employees
$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    // Grabs user input
    var trainName = $("#train-input").val();
    var trainDest = $("#destination-input").val();
    var trainTime = $("#time-input").val();
    var trainFreq = moment($("#frequency-input").val(), "min").format("X");

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        name: trainName,
        dest: trainDest,
        time: trainTime,
        freq: trainFreq
    };

    // Uploads employee data to the database
    database.ref().push(newTrain);

    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.dest);
    console.log(newTrain.time);
    console.log(newTrain.freq);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#train-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var trainTime = childSnapshot.val().time;
    var trainFreq = childSnapshot.val().freq;

    // Employee Info
    console.log(trainName);
    console.log(trainDest);
    console.log(trainTime);
    console.log(trainFreq);

    // Prettify the employee start
    var trainStartPretty = moment.unix(trainTime).format("HH:mm");

    // Calculate the months worked using hardcore math
    // To calculate the months worked
    var trainArrival = moment().diff(moment(trainTime, "X"), "months");
    console.log(trainArrival);

    // Calculate the total billed rate
    // var empBilled = empMonths * empRate;
    // console.log(empBilled);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDest),
        $("<td>").text(trainStartPretty),
        $("<td>").text(trainArrival),
        $("<td>").text(trainFreq),
        // $("<td>").text(empBilled)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016

  // We know that this is 15 months.
  // Now we will create code in moment.js to confirm that any attempt we use meets this test case

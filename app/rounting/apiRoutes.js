// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsArr = require("../data/friends");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get("/api/friends", function (req, res) {
        res.json(friendsArr);
    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post("/api/friends", function (req, res) {
        // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
        // It will do this by sending out the value "true" have a table
        // req.body is available since we're using the body-parser middleware

        //computer best match
        var bestMatch = {
            Name: "",
            photo: "",
            Diff: 1000

        }
        
        var userData = req.body;
        var userScores = userData.scores;

        var totalDiff = 0;
      

        for (var i = 0; i < friendsArr.length; i++) {
            console.log(friendsArr[i].name);
            totalDiff = 0;

        
            for (var j = 0; j < friendsArr[i].scores; j++) {
                totalDiff += (Math.abs(parseInt(friendsArr[i].scores[j]) - parseInt(userScores[j])));
            

            // scoresArr.push(totalDiff);
            if (totalDiff <= bestMatch.Diff) {
                bestMatch.name = friendsArr[i].name;
                bestMatch.photo = friendsArr[i].Photo;
                bestMatch.Diff = totalDiff;
            }
        }
        }
        //after all friends are compared, find the best match
        // for (var i = 0; i < scoresArr.length; i++) {
        //     if(scoresArr[i] <= scoresArr[bestMatch]) {
        //         bestMatch = i;
        //     }
          
        // }
        // var bestFriend = friendsData[bestMatch];
        
    
        friendsArr.push(userData);
        res.json(bestMatch);
    });

   

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!
};
//   app.post("/api/clear", function() {
//     // Empty out the arrays of data
//     friendsData = [];

//     console.log(friendsData);


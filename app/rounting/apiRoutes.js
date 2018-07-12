// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendsData = require("../data/friends");

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
        res.json(friendsData);
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
        var userResults = req.body.scores;

        //computer best match
        var matchName = '';
        var matchPhoto = '';
        var totalDifference = 1000;
      

        for (var i = 0; i < friendsData.length; i++) {
            var diff = 0;
            for (var j = 0; j < userResults.length; j++) {
                diff += (Math.abs(parseInt(friendsData[i].scores[j]) - parseInt(userResults[j])));
            }

            // scoresArr.push(totalDiff);
            if ( diff<totalDifference){
                totalDifference = diff;
                matchName = friendsData[i].name;
                matchPhoto = friendsData[i].image;
            }
        }
        //after all friends are compared, find the best match
        // for (var i = 0; i < scoresArr.length; i++) {
        //     if(scoresArr[i] <= scoresArr[bestMatch]) {
        //         bestMatch = i;
        //     }
          
        // }
        // var bestFriend = friendsData[bestMatch];
        
    
        friendsData.push(req.body);
        res.json({status: "OK", matchName: matchName, matchPhoto: matchPhoto});
    });

   

    // ---------------------------------------------------------------------------
    // I added this below code so you could clear out the table while working with the functionality.
    // Don"t worry about it!
};
//   app.post("/api/clear", function() {
//     // Empty out the arrays of data
//     friendsData = [];

//     console.log(friendsData);


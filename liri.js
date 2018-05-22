// require("dotenv").config();

var request = require("request");

// Spotify:
// Client ID 33c8002b75c1496fbbe19c73c72e2eff
// Client Secret e3c636088aac46d7b16b29aff7221b71 

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "33c8002b75c1496fbbe19c73c72e2eff",
    secret: "e3c636088aac46d7b16b29aff7221b71"
});




// Add the code required to import the keys.js file and store it in a variable.



// You should then be able to access your keys information like so


//   var spotify = new Spotify(keys.spotify);
//   var client = new Twitter(keys.twitter);

// Make it so liri.js can take in one of the following commands:


// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`



var action = process.argv[2];


switch (action) {
    case "do-what-it-says":
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }

            var spotifySong = data;

            console.log(spotifySong);

            // // We will then print the contents of data
            // //   console.log(data);

            // // Then split it by commas (to make it more readable)
            // var dataArr = data.split(",");
            // var totalSum = 0;

            // for (i = 0; i < dataArr.length; i++) {
            //     totalSum = totalSum + parseFloat(dataArr[i]);
            //     // console.log("incremented total sum" + totalSum);
            // }

            // totalSum = totalSum.toFixed(2);

            // // We will then re-display the content as an array for later use.
            // console.log(totalSum);
        });

        break;

    case "spotify-this-song":
        var songName = "";
        // console.log(process.argv.length);
        for (i = 3; i < process.argv.length; i++) {
            songName = songName + " " + process.argv[i];
        }

        var artistSpotify = "";
        var songNameSpotify = "";
        var previewLinkSpotify = "";
        var albumSpotify = "";

        var queryUrl =


            spotify
            .search({
                type: 'track',
                query: songName
            })
            .then(function (response) {
                console.log(response);
                console.log(JSON.parse(response));
            })
            .catch(function (err) {
                console.log(err);
            });

        // spotify
        // .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
        // .then(function (data) {
        //     console.log(data);
        // })
        // .catch(function (err) {
        //     console.error('Error occurred: ' + err);
        // });



        break;

    case "movie-this":
        var movieName = "";
        // console.log(process.argv.length);
        for (i = 3; i < process.argv.length; i++) {
            movieName = movieName + " " + process.argv[i];
        }

        console.log(movieName);

        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";


        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);


        // Then create a request to the queryUrl
        // ...

        // If the request was successful...
        // Run the request function...
        // The request function takes in a URL then returns three arguments:
        // 1. It provides an error if one exists.
        // 2. It provides a response (usually that the request was successful)
        // 3. It provides the actual body text from the website <---- what actually matters.
        request(queryUrl, function (error, response, body) {

            // If the request is successful
            // ...
            if (!error && response.statusCode === 200) {



                // Then log the Release Year for the movie
                // ...

                // Then log the body from the site!
                console.log("The release date for " + movieName + " was " + JSON.parse(body).Released);
            }
        });


        // case "deposit":
        //     fs.appendFile("bank.txt", (", " + amount), function (err) {

        //         // If an error was experienced we say it.
        //         if (err) {
        //             console.log(err);
        //         }

        //         // If no error is experienced, we'll log the phrase "Content Added" to our node console.
        //         else {
        //             console.log("Deposit Added!");
        //         }
        //     });
        //     break;

        break;


}
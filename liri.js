require("dotenv").config();

var request = require("request");
var fs = require("fs");



// Spotify:
// Client ID 33c8002b75c1496fbbe19c73c72e2eff
// Client Secret e3c636088aac46d7b16b29aff7221b71 

var Spotify = require('node-spotify-api');

// var spotify = new Spotify({
//     id: "33c8002b75c1496fbbe19c73c72e2eff",
//     secret: "e3c636088aac46d7b16b29aff7221b71"
// });


var Twitter = require('twitter');


// Add the code required to import the keys.js file and store it in a variable.

var keys = require("./keys")


// You should then be able to access your keys information like so


  var spotify = new Spotify(keys.spotify);
  var client = new Twitter(keys.twitter);

// Make it so liri.js can take in one of the following commands:


// * `my-tweets`

// * `spotify-this-song`

// * `movie-this`

// * `do-what-it-says`



var action = process.argv[2];


function execute(action) {



    switch (action) {
        case "my-tweets":
            // client.get(`https://api.twitter.com/1.1/statuses/mentions_timeline.json?count=2&since_id=14927799&oauth_consumer_key=HLPz7LwWf3m7qkZf8qmGY1SmD&oauth_token=3241988938-f5HbP5NM5ZhuEBN5UN3vdTf5Bgw29yFrxxenH26`)
            // .then(
            //     console.log()
            // )

            
            var params = {screen_name: 'jnahuja'};
            client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {
                    // console.log(tweets);
                    if (tweets.length<20) {
                    for (var i=0; i<tweets.length; i++) {
                        console.log(tweets[i].text);
                    }
                } else {
                    for (var i=0; i<20; i++) {
                        console.log(tweets[i].text);
                    }
                }
                }
            });
            

        break;

        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function (error, data) {

                // If the code experiences any errors it will log the error to the console.
                if (error) {
                    return console.log(error);
                }

                var spotifySong = data;
                var dataArr = data.split(",");

                // console.log(dataArr[0]);
                // console.log(dataArr[1]);

                // execute(dataArr[0]);

            //     var songName = "";
            // // console.log(process.argv.length);
            // for (i = 1; i < dataArr.length; i++) {
            //     songName = songName + " " + dataArr[i];
            // }

            var songName = dataArr[1];

            // console.log(songName);

            var artistSpotify = "";
            var songNameSpotify = "";
            var previewLinkSpotify = "";
            var albumSpotify = "";

            var queryUrl = "";


            spotify
                .request("https://api.spotify.com/v1/search?query=" + songName + "&type=track&offset=0&limit=1")
                // .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
                .then(function (data) {
                    // console.log(data);
                    // console.log(JSON.parse(data));
                    // console.log(data.tracks.items[0]);
                    // console.log(data.tracks.items[0].name);
                    // console.log(data.tracks.items[0].album.name);
                    // console.log(data.tracks.items[0].album.artists[0].name);
                    // console.log(data.tracks.items[0].preview_url);
                    // console.log(data.tracks.items[0].album.artists);


                    artistSpotify = data.tracks.items[0].album.artists[0].name;
                    songNameSpotify = data.tracks.items[0].name;
                    previewLinkSpotify = data.tracks.items[0].preview_url;
                    albumSpotify = data.tracks.items[0].album.name;

                    console.log(`Artist(s): ${artistSpotify}`);
                    console.log(`Song Name: ${songNameSpotify}`);
                    console.log(`Preview Link: ${previewLinkSpotify}`);
                    console.log(`Album: ${albumSpotify}`);
                })
                .catch(function (err) {
                    console.error('Error occurred: ' + err);
                });

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
            var songName = process.argv[3];
            // console.log(process.argv.length);
            if (process.argv.length > 4) {    
                for (i = 3; i < process.argv.length; i++) {
                    songName = songName + " " + process.argv[i];
                }

            }

            console.log(songName);

            var artistSpotify = "";
            var songNameSpotify = "";
            var previewLinkSpotify = "";
            var albumSpotify = "";

            var queryUrl = "";


            // spotify
            // .search({
            //     type: 'track',
            //     query: songName
            // })
            // .then(function (response) {
            //     console.log(response);
            //     console.log(JSON.parse(response));
            // })
            // .catch(function (err) {
            //     console.log(err);
            // });


            // spotify.search({ type: 'track', query: songName }, function(err, data) {
            //     if (err) {
            //         return console.log('Error occurred: ' + err);
            //     }

            //     console.log(data); 
            //     });


            // "https://api.spotify.com/v1/search?query=+wrecking+ball&type=track&offset=0&limit=20"

            spotify
                .request("https://api.spotify.com/v1/search?query=" + songName + "&type=track&offset=0&limit=1")
                // .request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
                .then(function (data) {
                    // console.log(data);
                    // console.log(JSON.parse(data));
                    // console.log(data.tracks.items[0]);
                    // console.log(data.tracks.items[0].name);
                    // console.log(data.tracks.items[0].album.name);
                    // console.log(data.tracks.items[0].album.artists[0].name);
                    // console.log(data.tracks.items[0].preview_url);
                    // console.log(data.tracks.items[0].album.artists);


                    artistSpotify = data.tracks.items[0].album.artists[0].name;
                    songNameSpotify = data.tracks.items[0].name;
                    previewLinkSpotify = data.tracks.items[0].preview_url;
                    albumSpotify = data.tracks.items[0].album.name;

                    console.log(`Artist(s): ${artistSpotify}`);
                    console.log(`Song Name: ${songNameSpotify}`);
                    console.log(`Preview Link: ${previewLinkSpotify}`);
                    console.log(`Album: ${albumSpotify}`);
                })
                .catch(function (err) {
                    console.error('Error occurred: ' + err);
                });



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
                

                // console.log(JSON.parse(body));

                console.log(`Movie Title: ${JSON.parse(body).Title}`)
                console.log(`Movie Year: ${JSON.parse(body).Year}`)
                console.log(`IMDB Rating: ${JSON.parse(body).imdbRating}`)
                console.log(`Country where the movie was produced: ${JSON.parse(body).Country}`)
                console.log(`Language of the Movie: ${JSON.parse(body).Language}`)
                console.log(`Movie Plot: ${JSON.parse(body).Plot}`)
                console.log(`Actors in the movie: ${JSON.parse(body).Actors}`)
                }

            });
            break;
    }

}

execute(action);


// var params = {
//     screen_name: "cnn"
//   };
//   client.get("statuses/user_timeline", params, function(error, tweets, response) {
//     if (!error) {
//       for (var i = 0; i < tweets.length; i++) {
//         console.log(tweets[i].created_at);
//         console.log("");
//         console.log(tweets[i].text);
//       }
//     }
//   });
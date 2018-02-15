// review twitter command 'my-tweets' to pull back last 20 tweets
// review Spotify and return Ace of Base if song title is not found.
// review API key for OMDB, it is entered correctly in the keys.js file?
// review OMDB and return info for "mr. nobody" if no title is entered.
// review debugging (https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

require("dotenv").config();

// 1.  Add the code required to import the keys.js file and store it in a variable.
const keys = require('./keys.js');

//You should then be able to access your keys information like so
    // how do I test this?
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
console.log(keys.twitter);
console.log(keys.spotify);

const command = process.argv[2];
if (command === "my-tweets") {
tweets();
}
else if (command === "spotify-this-song") {
songCheck();
}
else if (command === "movie-this") {
movieCheck();
}
else if (command === "do-what-it-says") {
randomFile();
};


//****************twitter***************
//user input



//const commandSpotify = process.argv[3];
//const commandMovieName = process.argv[4];

// Take in the command line arguments
// Create a string for holding the command


//Twitter format below
//client.get(path, params, callback);
// Anna to create a for loop

function tweets () {
client.get("https://api.twitter.com/1.1/statuses/user_timeline.json", {screen_name:'linden_york_111'}, 
    function(err, tweetsResponse) {
    console.log("Your last 20 tweets:", tweetsResponse);

});
}


//***************Spotify******************

//let spotify = "spotify-this-song";
function songCheck () {
        
    // Take in the command line arguments
    // Create an empty string for holding the song
    let song = "";
    // Capture all the words in the song (again ignoring the first two Node arguments)
    for (let i = 3; i < process.argv.length; i++) {
    // Build a string with the address.
    song = song + " " + process.argv[i];
    }
    // Log the song we searched on Spotify
    console.log("Searching for " + song);

    if (song === "") {
        song = "The Sign";
            console.log("The Sign by Ace of Base")
    };

    spotify.search({ type: 'track', query: song}, function(err, data) {
        if ( err ) {
            console.log('Error occurred: ' + err);
            return;
        }
        
        console.log(data.tracks.items[0]);
    });
};



//****************Movie*****************
// Run a request to the OMDB API with the movie specified
function movieCheck () {

    const queryUrl = 'http://www.omdbapi.com/?t=' + movieName + '&y=&plot=short&apikey=trilogy';

    // This line is to help debug against the actual URL.
    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

        // Parse the body of the site and recover  1- Title of the movie. 2-  Year the movie came out. 3- IMDB Rating of the movie.
        // 4 - Rotten Tomatoes Rating of the movie. 5 - Country where the movie was produced. 6 - Language of the movie.
        // 7- Plot of the movie. 8 - Actors in the movie. 
        console.log('Release Year: ' + JSON.parse(body).Year);
    }
    });
};
//************************** Do What It Says **************************
// reset the values of the command and if statements again, make if statements into a big function and call it again. 

function randomFile () {

// fs is a core Node package for reading and writing files
const fs = require('fs');

// This block of code will read from the "random.txt" file.
// Include the "utf8" parameter or get "raw" data
// The code will store the contents of the reading inside the variable "data"
fs.readFile('random.txt','utf8',  function(error, data) {
    
    // If there's an error log it and return
    if (error) {
    return console.log(error);
    }
    // log the contents of data
    console.log(data);
  
    // Then split it by commas (CSV)
    var dataArr = data.split(",");
    
    // We will then re-display the content as an array.
    console.log(dataArr);
    // OR
    dataArr.forEach(v => console.log(v));
  });
  
  //OR
  dataArr.forEach(data => console.log(data));

}

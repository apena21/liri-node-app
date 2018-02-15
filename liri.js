// review twitter command 'my-tweets' to pull back last 20 tweets, receiving error message but 
// tweet history is successfully displayed
// add counter to tweet history 
// review OMDB how to enter a line break in console
// review debugging (https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

require("dotenv").config();

// 1.  Add the code required to import the keys.js file and store it in a variable.
const keys = require('./keys.js');

// access your keys information 
var Twitter = require('twitter');
var client = new Twitter(keys.twitter);
var Spotify = require('node-spotify-api');  
var spotify = new Spotify(keys.spotify);
var request = require('request');
//console.log(keys.twitter);
//console.log(keys.spotify);

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

//**************** twitter function **************
function tweets () {
    client.get("https://api.twitter.com/1.1/statuses/user_timeline.json", {screen_name:'linden_york_111'}, 
        function(err, tweetsResponse) {
        //console.log("The last 20 tweets:", "Your last 20 tweets:"["text"]);
        //console.log("Your last 20 tweets:", tweetsResponse["text"]);
        var response = tweetsResponse;
        for (let i = 0; i < 20; i++) {
        //console.log("The last 20 tweets:", tweetsResponse);    
        console.log("Recent tweet: ", response[i].text)
        }
    });
}

//*************** Spotify function ******************

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
    console.log(data.tracks.items[0].album.artists);
    //console.log(data.tracks.items[0].artists);
});
};


//**************** OMDB function *****************
// Run a request to the OMDB API with the movie specified
function movieCheck () {

	// Take in the command line arguments
	// Create an empty string for holding the movie title
	let movie = "";
	// Capture all the words in the movite title (again ignoring the first two Node arguments)
	for (let i = 3; i < process.argv.length; i++) {
        // Build a string with the address
        movie = movie + " " + process.argv[i];
    }
    movie = movie.trim();
		// Log the movie title we searched on Omdb
		//console.log("Searching for " + movie);

		if (movie === "") {
			movie = "Mr. Nobody";
                      
            console.log("Default movie details for 'Mr. Nobody'.")
		};

		// omdb.search({ title: '', year: '' }, true, function(err, movies) {
        //     if(err) {
        //         return console.error(err);
        //     }
        
        //     if(movies.length < 1) {
        //         return console.log('No movies were found!');
        //     }
        
        //     movies.forEach(function(movie) {
        //         console.log('%s (%d)', movie.title, movie.year);
        //     });
		// });
        
        //console.log(data.tracks.items[0]);

        var urlHit = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=" + keys.omdb.key;

        request(urlHit, function(error, response, body) {
            if(error) {
                return console.log(error);
            }
            if (!error && response.statusCode === 200) {
                var jsonData = JSON.parse(body);
                console.log("Movie title ", jsonData.Title, "Year Movie Came Out: ", jsonData.Year, 
                "IMDB Rating of the movie: ", jsonData.imdbRating, "Rotten Tomatoes Rating of the movie ", 
                jsonData.tomatoRating, "Country where the movie was produced: ", jsonData.Country, 
                "Language of the movie ", jsonData.Language, "Plot of the movie ", jsonData.Plot, 
                "Actors in the movie ", jsonData.Actors);
            }
        });
};


//	# lower level API request
//	omdb.request(t='True Grit', y=1969, plot='full', tomatoes='true', timeout=5)

	/*
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
	*/

//************************** Do What It Says **************************
// reset the values of the command and if statements again, make if statements into a big function and call it again. 
/*
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
*/
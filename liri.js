require("dotenv").config();

var axios = require("axios");

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

var command = process.argv[2];

var term = process.argv.slice(3).join(" ");

var concertThisCommand = "concert-this";

var spotifySongCommand = "spotify-this-song";

var movieThisCommand = "movie-this";

var doCommand = "do-what-it-says";

var fs = require("fs");

var divider = console.log("\n----------------\n");

if (command === concertThisCommand) {

    var artist = term;

    axios
        .get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
        .then(function (response) {
            console.log(response);
        })
} else if (command === movieThisCommand) {

    var movieTitle = term;

    axios
        .get("http://www.omdbapi.com/?apikey=1fee9e5d&t=" + movieTitle)
        .then(function (response) {
            // console.log(response.data);
            var movieData = response.data;

            console.log(divider);
            console.log("Title: " + movieData.Title);
            console.log("Year: " + movieData.Year);
            console.log("IMDB: " + movieData.imdbRating);
            // console.log("Rotten Tomatoes: " + movieData.Ratings.Source["Rotten Tomatoes"] );
            console.log("Country: " + movieData.Country);
            console.log("Language: " + movieData.Language);
            console.log("\nPlot: " + movieData.Plot + "\n");
            console.log("Actors: " + movieData.Actors);

            if (movieTitle === "") {
                axios
                    .get("http://www.omdbapi.com/?apikey=1fee9e5d&t=Mr.Nobody")
                    .then(function (response) {
                        // console.log(response.data);
                        var movieData = response.data;

                        console.log(divider);
                        console.log("Title: " + movieData.Title);
                        console.log("Year: " + movieData.Year);
                        console.log("IMDB: " + movieData.imdbRating);
                        // console.log("Rotten Tomatoes: " + movieData.Ratings.Source["Rotten Tomatoes"] );
                        console.log("Country: " + movieData.Country);
                        console.log("Language: " + movieData.Language);
                        console.log("\nPlot: " + movieData.Plot + "\n");
                        console.log("Actors: " + movieData.Actors);
                    }

                    )
            }
        }
        )
}
else if (command === spotifySongCommand) {

    var song = term;

    spotify.search({
        type: "track",
        query: song,
        limit: 1
    }, function(err,data){
        if (err){
            console.log("Error occured: " + err);
        }
        // console.log(data.tracks.items[0]);
        var songData = data.tracks.items[0];

        console.log("Artist(s): " + songData.artists[0].name);
        console.log("Song: " + songData.name);
        console.log("Preview: " + songData.preview_url);
        console.log("Album: " + songData.album.name);
    })
} else if (command === doCommand){
    fs.readFile("random.txt", "utf-8", function (err,data) {
        var txt = data.split(",");
        spotifySongCommand = txt[1];
        movieThisCommand = txt[2];
        
        console.log(spotifySongCommand + "\n");
    });
}
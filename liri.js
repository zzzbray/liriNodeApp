require("dotenv").config();
//Required vars
var keys = require("./keys.js");
var axios = require("axios");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

//User vars
var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

//Switch case statment that runs CLI app
switch (command) {
  //Bands in Town
  case "concert-this":
    console.log("searching for concerts")
    var bandQuery = process.argv.slice(3).join(" ");
    var concertUrl = "https://rest.bandsintown.com/artists/" + bandQuery + "/events?app_id=codingbootcamp";
    axios.get(concertUrl).then(function (response, err) {
      console.log("Venue Name: " + response.data[0].venue.name);
      console.log("City: " + response.data[0].venue.city);
      console.log("Time: " + response.data[0].datetime); // needs to be updated with moment.js
      console.log("Buy tickets here: " + response.data[0].offers.url);
      if (err) {
        console.log("Error: " + err)
      }
    })
    break;


    //Spotify
  case "spotify-this-song":
    console.log("searching for songs");
    spotify.search({
      type: "track",
      query: query
    }, function (err, data) {
      if (err) {
        return console.log("Error:" + err);
      }
      //revert/default needs fixing
      if (songQuery === '') {
        console.log("searching for The Sign")
        songQuery = "The Sign";
      }
      console.log("still looking for songs");
      console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Appears on: " + data.tracks.items[0].album.name);
      console.log("Listen on Spotify: " + data.tracks.items[0].preview_url);
    });
    break;


    //OMDB
  case "movie-this":
    console.log("searching for films");
    //api search
    var movieQuery = process.argv.slice(3);
    var movieUrl = "http://www.omdbapi.com/?t=" + movieQuery + "&apikey=7144e1fa";
    axios.get(movieUrl).then(function (response, err) {
      console.log("still searching for films")
      console.log(response.data)
      console.log("Title: " + response.data.Title);
      console.log("Year: " + response.data.year);
      console.log("IMDB Rating: " + response.data.imdbRating);
      console.log("Rotten Tomatoes Rating: " + response.data.Ratings[0].Value);
      console.log("Country: " + response.data.country);
      console.log("Languages: " + response.data.Language);
      console.log("Plot: " + response.data.Plot);
      console.log("Cast: " + response.data.Actors);
      if (err) {
        console.log("Error: " + err)
      }
    })

    //return
    break;

    //random.txt
  case "do-what-it-says":
    console.log("doing it");
    //process
    console.log("nearly there!")
    //return

    break;
  default:
    console.log("Please choose from concert-this, spotify-this-song, movie-this or do-what-it-says");
}
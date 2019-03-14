var topics = [
    'inuyasha',
    'naruto',
    'one piece',
    'spirited away',
    'batman',
    'thor',
    'pokemon',
    'black butler',
    'jessica jones',
    'luke cage',
    'black panther',
    'sailor moon',
    'black lagoon',
    'cowboy bebop'
];

//get the API key
var apiKey = 'e5UhuCrvRo33JUw8QgzmmzROGcglreVt';

//set a gifnumber
var gifNumber;
//gets the gifnumber from the selection list
function getGifNumber() {
    gifNumber = $('#gifNumber option:selected').text();
    console.log(gifNumber);
}

function buttonsToScreen() {
    //clears the button view
    $('#nerdButtons').empty();
    //goes through the topics array
    for (var i = 0; i < topics.length; i++) {
        //set up button variable
        var nButton = $('<button>');
        //add a class of travel button
        nButton.addClass('nerd-button');
        //add the data-name attribute
        nButton.attr('data-name', topics[i]);
        //set the text to the index
        nButton.text(topics[i]);
        //append to the travelButtons
        $('#nerdButtons').append(nButton);
    }
}

$('#addButton')
    .on('click', function (e) {
        //prevents the page from reloading
        e.preventDefault();
        //grab the input value and store it into a variable
        var nerdDom = $('#addButtonText')
            .val()
            .trim();
        //push into topics array
        topics.push(nerdDom);
        //call on the buttons to screen function
        buttonsToScreen();
        //empties the input
        $('#addButtonText').val('');

    });

function displayGifs() {
    //get the 'q' from the button
    var nerd = $(this).attr('data-name');
    getGifNumber();
    //get and set the giphy api
    var giphyURL = 'https://api.giphy.com/v1/gifs/search?q=' + nerd + '&api_key=' + apiKey + '&limit=' + gifNumber;
    //empty the travel gifs
    $('#nerdGifs').empty();
    //empty the info div
    $('#travelInfo').empty();
    //set the ajax
    $
        .ajax({
            url: giphyURL,
            method: 'GET'
        })
        .then(function (response) {
            //check to see  if it's working
            console.log(response);
            //loop through response
            for (var j = 0; j < response.data.length; j++) {
                //set the variables for the displayGifs
                var displayGifDiv = $('<div>');
                displayGifDiv.addClass('gif-div');
                var rating = response.data[j].rating;
                var title = response.data[j].title;
                var downsizedStill = response.data[j].images.downsized_still.url;
                var downSized = response.data[j].images.downsized.url;
                var source = response.data[j].source;
                var sourceTitle = response.data[j].source_tld;
                //create the placeholder elements
                var displayGif = $('<img>');
                displayGif.attr('src', downsizedStill);
                displayGif.attr('data-still', downsizedStill);
                displayGif.attr('data-animate', downSized);
                displayGif.attr('data-state', 'still');
                displayGif.addClass('gif');

                var displayTitle = $('<h4>');
                displayTitle.addClass('gif-title');
                displayTitle.text(title);

                var displayRating = $('<h5>');
                displayRating.addClass('gif-rating');
                displayRating.text('Rated: ' + rating);

                var displaySource = $('<a>');
                displaySource.attr('href', source);
                displaySource.attr('target', '_blank');
                displaySource.addClass('gif-source');
                displaySource.text(sourceTitle);

                var addFavorites = $('<button>');
                addFavorites.attr('data-name', title);
                addFavorites.addClass('add-favorites');
                addFavorites.text('Add to Favorites');

                //append to the page
                displayGifDiv.append(displayTitle, displayRating, displaySource, addFavorites, displayGif);
                $('#nerdGifs').append(displayGifDiv);

            }
        })

}

function displayInfo() {
    $('#nerdInfo').empty();
    let nerd = $(this).attr('data-name');
    const infoUrL = `http://www.omdbapi.com/?t=${nerd}&apikey=c3c3f2`;

    $
        .ajax({
            url: infoUrL,
            method: 'GET'
        })
        .then(function (response) {
            console.log(response);
            var title = response.Title;
            var genre = response.Genre;
            var year = response.Year;
            var rating = response.Rated;
            var released = response.Released;
            var plot = response.Plot;

            var titleRender = $('<h2>');
            var genreRender = $('<p>');
            var yearRender = $('<p>');
            var ratingRender = $('<p>');
            var releasedRender = $('<p>');
            var plotRender = $('<p>');

            titleRender.addClass('info-title');
            genreRender.addClass('info-genre');
            yearRender.addClass('info-year');
            ratingRender.addClass('info-rating');
            releasedRender.addClass('info-release');
            plotRender.addClass('info-plot');

            titleRender.text(title);
            genreRender.text(genre);
            yearRender.text(year);
            ratingRender.text(rating);
            releasedRender.text(released);
            plotRender.text(plot);

            $('#nerdInfo').append(titleRender, genreRender, yearRender, releasedRender, ratingRender, plotRender);

        })
}
//animates the gifs. got it from the class activity
function animateGifs() {
    //if the data state is still
    if ($(this).data().state === 'still') {
        //change it to animated
        $(this)
            .data()
            .state = 'animated';
        //switches the image source to the animated gif
        $(this).attr('src', $(this).data().animate);
        //if already animated
    } else if ($(this).data().state === 'animated') {
        $(this)
            .data()
            .state = 'still';
        //switches back to still
        $(this).attr('src', $(this).data().still);
    }
}

function addToFavorites() {
    //grab the button value by title
    var nerdURL = $(this)
        .siblings('a')
        .attr('href');
    $('#favorites').empty();

    //Michael helped me with this part
    let urls = localStorage.getItem("urls");
    urls = urls + " " + nerdURL;
    localStorage.setItem("urls", urls);
    console.log(urls.split(" "));
    urls = urls.split(' ');
    //iterate through each url
    for (var k = 0; k < urls.length; k++) {
        //create an <a> tag
        var favoriteURLDiv = $('<div>');
        var favoriteURL = $('<a>');
        favoriteURLDiv.addClass('favorites-div');
        favoriteURL.attr('href', urls[k]);
        favoriteURL.attr('target', '_blank');
        favoriteURL.addClass('favorite-url');
        favoriteURL.text('Favorite: ' + urls[k]);
        favoriteURLDiv.append(favoriteURL);
        $('#favorites').append(favoriteURLDiv);

    }

}

//puts the topics as buttons on the screen
buttonsToScreen();
//has the button work on click to activate function
$(document).on('click', '.nerd-button', displayGifs);
$(document).on('click', '.nerd-button', displayInfo);
//adds gifs to the favorites bar
$(document).on('click', '.add-favorites', addToFavorites);
//same but with gifs
$(document).on('click', '.gif', animateGifs);
$('#gifNumber').on('change', getGifNumber);
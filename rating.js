$ = jQuery;

$(function() {

	var movie = "";
	// this function is called several times a second by setInterval
	function updateMovie() {

		// in case bobBox doesn't exist in the page, or is yet to load:
		if (!$(".bobMovieHeader").length) return;

		var newMovie = $.trim($(".title").text());

		// looks like badMovieBox is reconstructed every time
		// it pops up, even when I hover over the same movie twice
		// so we might want display it again
		// TODO: cache the ratings in local storage
		var oldIMDBRating = $("#imdb_rating").text();

		if (newMovie != movie || oldIMDBRating === "") {
			movie = newMovie;
			$(".bobMovieHeader").append("<span id='imdb_rating'></span>");
			try {
        $.get('http://www.omdbapi.com/?i=&t='+escape(movie)).then(function(responseText) {
          $("#imdb_rating").text("IMDB="+JSON.parse(responseText).imdbRating);
        });
			} catch (err) { alert("Catched error: "+err); }
		}
	}
	setInterval(updateMovie, 500);
});

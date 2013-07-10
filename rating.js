$ = jQuery;

$(function() {

	var movie = "";
	var http = new XMLHttpRequest();

	// this method is called by XMLHttpRequest after a req is made from updateMovie()
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			try {
				// might throw an exception for bad JSON
				var imdb_obj = JSON.parse(http.responseText);
				$("#imdb_rating").text("IMDB="+imdb_obj.imdbRating);
			} catch (err) {}
		}
	}

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

		if (newMovie != movie || oldIMDBRating == "") {
			movie = newMovie;
			//year = $(".bobMovieHeader > .year").text();
			$(".bobMovieHeader").append("<span id='imdb_rating'></span>");
			try {
				http.open("GET", "http://www.omdbapi.com/?i=&t="+escape(movie));
				http.send();
			} catch (err) { alert("Catched error: "+err); }
		}
	}
	setInterval(updateMovie, 500);
});

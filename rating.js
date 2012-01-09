$ = jQuery;

$(function(){

	movie = "";
	http = new XMLHttpRequest();

	// this method is called by XMLHttpRequest after a req is made from updateMovie()
	http.onreadystatechange = function() {
		if (http.readyState == 4 && http.status == 200) {
			try {
				// might throw an exception for bad JSON
				imdb_obj = JSON.parse(http.responseText);
				$("#imdb_rating").append(imdb_obj.Rating);
			} catch (err) {}
		}
	}

	// this function is called several times a second by setInterval
	function updateMovie() {
		newMovie = $(".bobMovieHeader > .title").text();
		
		// looks like badMovieBox is reconstructed every time
		// it pops up, even when I hover over the same movie twice
		// so we might want display it again
		// TODO: cache the ratings in local storage
		oldIMDBRating = $("#imdb_rating").text();

		if (newMovie != movie || oldIMDBRating == "") {
			movie = newMovie;
			year = $(".bobMovieHeader > .year").text();
			$(".bobMovieHeader").append("<span id='imdb_rating'>IMDB=</span>");
			try {
			http.open("GET", "http://www.imdbapi.com/?t="+escape(movie)+"&y="+escape(year), true);
			http.send();
			} catch (err) { alert("uhoh: "+err); }
		}
	}

	setInterval(updateMovie, 200);

});

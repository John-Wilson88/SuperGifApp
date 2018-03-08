// using the gify API, use their search end point and display a gif.
// function to make a request the gify.

//API key = QOdIT0ej625x65600CHBzocVw5ABzPNs


// Variables
var topics = ["Superman", "Batman", "The Flash", "Spiderman", "Ironman", "Frodo Baggins"];


// Generate and dislpay buttons
function generateBtns() {

	$("#buttons").empty();

	for(var i = 0; i < topics.length; i++) {
		var gifBtn = $("<button>");
		gifBtn.addClass("btn");
		gifBtn.attr("data-name", topics[i]);
		gifBtn.text(topics[i]);
		$("#buttons").append(gifBtn);
	}
}	

function displayGifs() {
	var gif = $(this).attr("data-name");
	var url = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=QOdIT0ej625x65600CHBzocVw5ABzPNs&limit=10"; 
	
	$.ajax({
		url: url,
		method: 'GET'
	}).then(function(gifs) {

		$("#content").empty();

		var superGifs = gifs.data;
		console.log(superGifs);

		for(var z = 0;  z < superGifs.length; z++) {

			var still = superGifs[z].images.fixed_height_still.url;
			var animate = superGifs[z].images.fixed_height.url;

			var displayImage = $("<img>");
			displayImage.attr("src", still);
			displayImage.attr("data-still", still);
			displayImage.attr("data-animate", animate);
			displayImage.attr("data-state", "still");
			displayImage.addClass("card-img-top superHero");

			var rating = superGifs[z].rating;
			var displayRating = $("<p>").text("Rated: " + rating);
			displayRating.addClass("card-text rated");

			var cardDiv = $("<div>");
			cardDiv.addClass("card  gifCard");

			var cardBodyDiv = $("<div>");
			cardBodyDiv.addClass("card-body");

			cardBodyDiv.append(displayRating);
			cardDiv.append(displayImage);
			cardDiv.append(cardBodyDiv);
			$("#content").append(cardDiv);


		}
	});
}

// add values to topics
// this function will add search values, and call the function that will make the API request and display gifs.
$("#find-gif").on("click", function(event) {
	event.preventDefault();
	gif = $("#input-gif").val().trim();
	topics.push(gif);
	generateBtns();

});

function animateGif() {
	var state = $(this).attr("data-state");

	if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
	}
	if (state === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
	}
}


$(document).on("click", ".btn", displayGifs);

$(document).on("click", ".superHero", animateGif);










generateBtns();
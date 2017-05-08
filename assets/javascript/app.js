$(document).ready(function() {
    var topics = ["puppies", "cat", "koalas", "panda", "bird", "hedgehog", "pig", "goat", "turtle", "chinchilla", "bunny"];
    var topicBtn = "";
    var userInput = "";
    var userInputButton;

    function createButton() {
        for (var i = 0; i < topics.length; i++) {

            topicBtn = $("<button class='btn btn-primary topic-buttons'>" + topics[i] + "</button><br>");

            $("#buttons-go-here").prepend(topicBtn);

        };
    };

    createButton();

    function displayGifs() {
        $(".topic-buttons").on("click", function() {

            var animal = $(this).html();

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                animal + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {

                var results = response.data;

                var results = response.data;
                for (var i = 0; i < results.length; i++) {
                    var animalDiv = $("<div>");

                    var ratings = results[i].rating;

                    var ratingHTML = $("<h2 class='rating'>").text("Rating: " + ratings);

                    var animalGifs = $("<img class='gif'>");

                    animalGifs.attr("src", results[i].images.fixed_height_still.url);
                    animalGifs.attr("data-still", results[i].images.fixed_height_still.url);
                    animalGifs.attr("data-animate", results[i].images.fixed_height.url);
                    animalGifs.attr("data-state", "still");
                    animalDiv.append(ratingHTML);
                    animalDiv.append(animalGifs);

                    $(".gifs-go-here").prepend(animalDiv);
                };

                $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");

                    if (state === "still") {
                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("data-state", "still");
                    }
                });

            });
        });
    };

    displayGifs();

    $("#submitBtn").on("click", function() {

        var userInput = $("#animalUserInput").val().trim();

        if (userInput === "") {
            alert("You didn't enter an animal");


            $("#animalUserInput").val("");
        } else if ($.inArray(userInput, topics) != -1) {
            alert("Animal already exists");

            $("#animalUserInput").val("");
        } else {

            userInputButton = $("<button class='btn btn-primary topic-buttons'>" + userInput + "</button><br>");

            $("#buttons-go-here").prepend(userInputButton);

            displayGifs();

            $("#animalUserInput").val("");

        };
    });
});

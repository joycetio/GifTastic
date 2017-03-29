$(document).ready(function() {
    var topics = ["puppies", "cat", "koalas", "panda", "bird", "hedgehog", "pig", "goat", "turtle", "chinchilla", "bunny"];
    var topicBtn = "";
    var userInput = "";
    var userInputButton;

    function createButton() {
        for (var i = 0; i < topics.length; i++) {

            topicBtn = $("<button class='btn btn-primary topic-buttons'>" + topics[i] + "</button><br>");
            // console.log(topicBtn);

            $("#buttons-go-here").prepend(topicBtn);
            // $("#buttons-go-here").append(userInput); 

        };
    };

    createButton();

    function displayGifs() {
        $(".topic-buttons").on("click", function() {
            // console.log("i've been clicked");

            var animal = $(this).html();
            // console.log(this);
            // console.log(animal);

            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
                animal + "&api_key=dc6zaTOxFJmzC&limit=10";

            // console.log(queryURL);

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                // console.log(response);

                var results = response.data;
                // console.log("results: ", results);

                for (var i = 0; i < results.length; i++) {
                    var animalDiv = $("<div>");

                    var ratings = results[i].rating;
                    // console.log(ratings); 

                    var ratingHTML = $("<h2 class='rating'>").text("Rating: " + ratings);
                    // console.log(ratingHTML);

                    var animalGifs = $("<img class='gif'>");

                    animalGifs.attr("src", results[i].images.fixed_height_still.url);
                    animalGifs.attr("data-still", results[i].images.fixed_height_still.url);
                    animalGifs.attr("data-animate", results[i].images.fixed_height.url);
                    animalGifs.attr("data-state", "still");

                    // console.log(animalGifs); 
                    // console.log("results image still URL: ",results[i].images.fixed_height_still.url);


                    animalDiv.append(ratingHTML);
                    animalDiv.append(animalGifs);

                    $("#gifs-go-here").prepend(animalDiv);
                };

                $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");
                    // console.log("user click: ", this); 
                    // console.log(state);

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
        // console.log("clicked");

        var userInput = $("#animalUserInput").val().trim();

        if (userInput === "") {
            alert("You didn't enter an animal");

            $("#animalUserInput").val("");
        } else if ($.inArray(userInput, topics) != -1) {
            alert("Animal already exists");

            $("#animalUserInput").val("");
        } else {

            userInputButton = $("<button class='btn btn-primary topic-buttons'>" + userInput + "</button><br>");
            // console.log(userInput);
            // console.log(userInputButton);

            $("#buttons-go-here").prepend(userInputButton);

            displayGifs();

            $("#animalUserInput").val("");

        };

    });


});

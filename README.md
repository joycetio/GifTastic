# GifTastic

# Live Link: 
https://joycetio.github.io/GifTastic/

## Instructions: 
1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called topics. 
2. Your app should take the topics in this array and create buttons in your HTML. 
3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page. 
4. When the user clicks one of the still GIPHY images, the gif shoul animate. If the user clicks the gif again, it should stop playing. 
5. Under every gif, display its rating. 
    * This data is provided by the GIPHY API. 
6. Add a form to your page that takes the value from a user input box and adds it into your topics array. Then make a function call that takes each topic in the array that remakes the buttons on the page.

## Description on how to use the app: 
Click on any of the buttons or add one of your favorite animals to view some interesting gifs. 

## Technologies Used: 
* HTML 
* Javascript
* jQuery 
* GIPHY API 
* AJAX 

## Code Explanation: 
* Used a for loop to loop through the topics array to create buttons for each one
* I created a function called displayGifs that contains the on click function and an AJAX request to the Giphy API. 
````
function displayGifs() {
        $(".topic-buttons").on("click", function() {
            // console.log("i've been clicked");

            var animal = $(this).html();
            
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
                animal + "&api_key=dc6zaTOxFJmzC&limit=10";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {
                ...
            }; 
````

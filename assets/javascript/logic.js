
    var wrestlersArr =  ["Ric Flair", "Steve Austin", "Hulk Hogan", "Andre the Giant", "Jake Roberts", "Mick Foley", "Ted DiBiase",
                        "John Cena", "Bret Hart", "Shawn Michaels", "The Rock", "Randy Savage", "Chris Jerico", "Tripple H", 
                        "Dusty Rhodes", "Kurt Angle"];
      
function renderButtons() {
  
  $("#buttonPanel").empty();

  
  for (var i = 0; i < wrestlersArr.length; i++) {
    
    var button = $("<button>");
    button.addClass("wrestlerButton");
    button.attr("data-wrestler", wrestlersArr[i]);
    button.text(wrestlersArr[i]);

    
    $("#buttonPanel").append(button);
  }
}

$("#add-wrestler").on("click", function(event) {
  event.preventDefault();

  // Get the input from the textbox
  var wrestler = $("#wrestler-input").val().trim();

  wrestlersArr.push(wrestler);
  $("#wrestler-input").val("");

  
  renderButtons();
});


function gifArea() {
 
  var wrestlerName = $(this).attr("data-wrestler");
  var wrestle = wrestlerName.split(" ").join("+");

  
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ wrestle +"&api_key=e7f20711005445549faf3d73f264019c&limit=10";

  $.ajax({
    method: "GET",
    url: queryURL,
  })
  .done(function( result ) {
    // Get the results array
    var dataArray = result.data;

    
    $("#gifPanel").empty();
    for (var i = 0; i < dataArray.length; i++) {
      var newDiv = $("<div>");
      newDiv.addClass("wrestlerGif");

      var newRating = $("<h2>").html("Rating: " + dataArray[i].rating);
      newDiv.append(newRating);

      var newImg = $("<img>");
      newImg.attr("src", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-still", dataArray[i].images.fixed_height_still.url);
      newImg.attr("data-animate", dataArray[i].images.fixed_height.url);
      newImg.attr("data-state", "still");
      newDiv.append(newImg);

      
      $("#gifPanel").append(newDiv);
    }
  });
}


function animateWrestlerGif() {
  
  var state = $(this).find("img").attr("data-state");

  
  if (state === "still") {
    $(this).find("img").attr("src", $(this).find("img").attr("data-animate"));
    $(this).find("img").attr("data-state", "animate");
  } else {
    $(this).find("img").attr("src", $(this).find("img").attr("data-still"));
    $(this).find("img").attr("data-state", "still");
  }
}

$(document).ready(function() {
  renderButtons();
});


$(document).on("click", ".wrestlerButton", gifArea);


$(document).on("click", ".wrestlerGif", animateWrestlerGif);
          
            
          
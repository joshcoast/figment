$(document).ready(function () {

  let turndownService = new TurndownService();
  let y;

  function touchdown() {
    for (i = 0; i < $(".tdStuff").length; i++) {
      y = turndownService.turndown($(".tdStuff")[i]);
      $(".tdStuff")[i].innerHTML = y;
    }
  }
 
 touchdown();


  // Votes!
  $(".down").on("click", downVote);
  $(".up").on("click", upVote);

  function downVote() {
    let currentScore = $(this).siblings(".current-score").html();
    let storyId = $(this).data('author-id');
    currentScore = parseInt(currentScore) - 1;
    $(this).siblings(".current-score").html(currentScore);
    var newData = {
      id: storyId,
      votes: currentScore
    }
    updateScore(newData);
  }

  function upVote() {
    let currentScore = $(this).siblings(".current-score").html();
    let storyId = $(this).data('author-id');
    currentScore = parseInt(currentScore) + 1;
    $(this).siblings(".current-score").html(currentScore);
    var moreData = {
      id: storyId,
      votes: currentScore
    }
    updateScore(moreData);
  }

  function updateScore(newScore) {
    $.ajax({
      method: "PUT",
      url: "/api/story-index",
      data: newScore
    })
  }

  // Sort by Genre! 
  
  $("#humor").on("click", humor);
  $("#mystery").on("click", mystery);
  $("#romance").on("click", romance);
  $("#scifi").on("click", scifi);
  $("#all").on("click", all);

  function all() {
    console.log("show all")
    $(".Humor").show(250);
    $(".Mystery").show(250);
    $(".Romance").show(250);
    $(".Sci-Fi").show(250);
  }

  function humor() {
    console.log("humor");
    $(".Humor").show(250);
    $(".Mystery").hide(250);
    $(".Romance").hide(250);
    $(".Sci-Fi").hide(250);
  }

  function mystery() {
    $(".Humor").hide();
    $(".Mystery").show();
    $(".Romance").hide();
    $(".Sci-Fi").hide();
  }

  function romance() {
    $(".Humor").hide();
    $(".Mystery").hide();
    $(".Romance").hide();
    $(".Sci-Fi").hide();
  }

  function scifi() {
    $(".Humor").hide();
    $(".Mystery").hide();
    $(".Romance").hide();
    $(".Sci-Fi").show();

  }

  // classify("humor");
  // classify("mystery");
  // classify("romance");
  // classify("sci-fi");

  function sortListDir() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.getElementsByClassName("list-group");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      b = document.getElementsByClassName("list-group-item");
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;

        if (dir == "asc") {
          if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {

            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {

            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {

        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        switchcount++;
      } else {

        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

  // Plugin Settings
  $('.modal').modal();
  $('.matchHeight').matchHeight();
});
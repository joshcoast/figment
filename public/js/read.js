$(document).ready(function () {
  // $("#final").on("click", newComment);
  // // A function for handling what happens when the form to create a new story is submitted
  // function newComment() {
  //   // Wont submit the story if we are missing a body, title, or author
  //   if (!$("#comment").val().trim()) {
  //     return;
  //   }
  //   // Constructing a newPost object to hand to the database
  //   var newPost = {
  //     reader: "Jesse",
  //     feedback: $("#comment")
  //       .val()
  //       .trim(),
  //   };
  //   submitComment(newPost);
  // }
  // function submitComment(story) {
  //   $.post("/api/comment", story, function () {
  //     window.location.href = "/story-index";
  //   });
  // }
  console.log("hotdog");

  // Votes!
  $(".down").on("click", downVote);
  $(".up").on("click", upVote);

  function downVote() {
    let currentScore = $(this).siblings(".current-score").html();
    let storyId = $(this).data('author-id');
    currentScore = parseInt(currentScore) - 1;
    $(this).next().html(currentScore);
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
    $(this).prev().html(currentScore);
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

  // Other stuff! 

  $("#genre").on("click", genre);
  $(".title").on("click", readersChoice);
  $("#humor").on("click", humor);
  $("#mystery").on("click", mystery);
  $("#romance").on("click", romance);
  $("#scifi").on("click", scifi);
  $("#all").on("click", all);
  $("#alphabet").on("click", alphabet);
  $("#recent").on("click", mostrecent);

  function alphabet() {
    $("#genres").css("display", "none");
    for (i = 0; i < $(".list-group-item").length; i++) {
      $(".listId")[i].before($(".title")[i]);
      console.log($(".list-group-item")[i]);
    }
    sortListDir();
  }

  function mostrecent() {
    $("#genres").css("display", "none");
    for (i = 0; i < $(".list-group-item").length; i++) {
      $(".title")[i].before($(".listId")[i]);
      console.log($(".list-group-item")[i]);
    }
    sortListDir();
  }

  function all() {
    $('.humor', '.mystery', '.romance', '.sci-fi').css("display", "block");
  }

  function genre() {
    $("#genres").css("display", "block");
  }

  function classify(x) {
    for (i = 0; i < $(".type").length; i++) {
      if ($(".type")[i].innerHTML == x) {
        $(".type")[i].parentElement.classList.add(x);
      }
    }
  }

  function readersChoice() {
    $(this).next('.body').css("display", "block");
    $('.type').css("display", "none");
  }

  function humor() {
    $(".humor").css("display", "block");
    $(".mystery").css("display", "none");
    $(".romance").css("display", "none");
    $(".sci-fi").css("display", "none");
  }

  function mystery() {
    $(".humor").css("display", "none");
    $(".mystery").css("display", "block");
    $(".romance").css("display", "none");
    $(".sci-fi").css("display", "none");
  }

  function romance() {
    $(".humor").css("display", "none");
    $(".mystery").css("display", "none");
    $(".romance").css("display", "block");
    $(".sci-fi").css("display", "none");
  }

  function scifi() {
    $(".humor").css("display", "none");
    $(".mystery").css("display", "none");
    $(".romance").css("display", "none");
    $(".sci-fi").css("display", "block");

  }

  classify("humor");
  classify("mystery");
  classify("romance");
  classify("sci-fi");

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
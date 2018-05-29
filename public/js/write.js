$(document).ready(function() {
  // Getting jQuery references to the story body, title, form, and author select
  var bodyInput = $("#body");
  var titleInput = $("#storyTitle");
  var storyForm = $("#storyForm");

  var currentUser = $('#storyForm').data( "userid" );

  console.log(currentUser);

 let storyData = {
   title: "default Title",
   genre: "default genre",
   description: "default description",
   body: "default body",
   user_id: currentUser
  };

  $("#submit").on("click", function(event) {
    $.post("/api/story-index", storyData)
      .then(getAuthors);
  });

  function getAuthors(){
    console.log("ran");
  }

  
//   // Submits a new story and brings user to story-index page upon completion
//   function submitPost(story) {
//     $.post("/api/story-index", story, function() {
//       window.location.href = "/story-index";
//     });
//   }




});

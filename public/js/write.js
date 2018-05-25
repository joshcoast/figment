$(document).ready(function() {
  // Getting jQuery references to the story body, title, form, and author select
  var bodyInput = $("#body");
  var titleInput = $("#storyTitle");
  var storyForm = $("#storyForm");

  var currentUser = $('#storyForm').data( "userid" );

  console.log(currentUser);

//   // Submits a new story and brings user to story-index page upon completion
//   function submitPost(story) {
//     $.post("/api/story-index", story, function() {
//       window.location.href = "/story-index";
//     });
//   }




});

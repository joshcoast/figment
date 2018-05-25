$(document).ready(function() {
  // Getting jQuery references to the story body, title, form, and author select
  var bodyInput = $("#body");
  var titleInput = $("#storyTitle");
  var storyForm = $("#storyForm");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a story)
  var url = window.location.search;
  var storyId;
  var authorId;

  console.log($('#storyForm').data( "userId" ));


  // A function for handling what happens when the form to create a new story is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the story if we are missing a body, title, or author
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !authorSelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
      AuthorId: authorSelect.val()
    };

    // If we're updating a story run updatePost to update a story
    // Otherwise run submitPost to create a whole new story
    if (updating) {
      newPost.id = storyId;
      updatePost(newPost);
    }
    else {
      submitPost(newPost);
    }
  }

  // Submits a new story and brings user to story-index page upon completion
  function submitPost(story) {
    $.post("/api/story-index", story, function() {
      window.location.href = "/story-index";
    });
  }





});

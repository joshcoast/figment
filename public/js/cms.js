$(document).ready(function() {
  // Getting jQuery references to the story body, title, form, and author select
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var cmsForm = $("#cms");
  var authorSelect = $("#author");
  // Adding an event listener for when the form is submitted
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a story)
  var url = window.location.search;
  var storyId;
  var authorId;
  // Sets a flag for whether or not we're updating a story to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the story id from the url
  // In '?story_id=1', storyId is 1
  if (url.indexOf("?story_id=") !== -1) {
    storyId = url.split("=")[1];
    getPostData(storyId, "story");
  }
  // Otherwise if we have an author_id in our url, preset the author select box to be our Author
  else if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
  }

  // Getting the authors, and their storys
  getAuthors();

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

  // Gets story data for the current story if we're editing, or if we're adding to an author's existing stories
  function getPostData(id, type) {
    var queryUrl;
    switch (type) {
    case "story":
      queryUrl = "/api/story-index/" + id;
      break;
    case "author":
      queryUrl = "/api/authors/" + id;
      break;
    default:
      return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.AuthorId || data.id);
        // If this story exists, prefill our cms forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        authorId = data.AuthorId || data.id;
        // If we have a story with this id, set a flag for us to know to update the story
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Authors and then render our list of Authors
  function getAuthors() {
    $.get("/api/authors", renderAuthorList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderAuthorList(data) {
    if (!data.length) {
      window.location.href = "/authors";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAuthorRow(data[i]));
    }
    authorSelect.empty();
    console.log(rowsToAdd);
    console.log(authorSelect);
    authorSelect.append(rowsToAdd);
    authorSelect.val(authorId);
  }

  // Creates the author options in the dropdown
  function createAuthorRow(author) {
    var listOption = $("<option>");
    listOption.attr("value", author.id);
    listOption.text(author.name);
    return listOption;
  }

  // Update a given story, bring user to the story-index page when done
  function updatePost(story) {
    $.ajax({
      method: "PUT",
      url: "/api/story-index",
      data: story
    })
      .then(function() {
        window.location.href = "/story-index";
      });
  }
});

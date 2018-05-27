$(document).ready(function() {
  /* global moment */


/*
  // storyindexContainer holds all of our stories
  var storyindexContainer = $(".story-container");
  var storyCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleStoryDelete);
  $(document).on("click", "button.edit", handleStoryEdit);
  // Variable to hold our stories
  var stories;

  // The code below handles the case where we want to get story-index stories for a specific author
  // Looks for a query param in the url for author_id
  var url = window.location.search;
  var authorId;
  if (url.indexOf("?author_id=") !== -1) {
    authorId = url.split("=")[1];
    getStories(authorId);
  }
  // If there's no authorId we just get all stories as usual
  else {
    getStories();
  }


  // This function grabs stories from the database and updates the view
  function getStories(author) {
    authorId = author || "";
    if (authorId) {
      authorId = "/?author_id=" + authorId;
    }
    $.get("/api/story-index" + authorId, function(data) {
      console.log("Stories", data);
      stories = data;
      if (!stories || !stories.length) {
        displayEmpty(author);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete stories
  function deleteStory(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/story-index/" + id
    })
      .then(function() {
        getStories(storyCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed story HTML inside storyindexContainer
  function initializeRows() {
    storyindexContainer.empty();
    var storiesToAdd = [];
    for (var i = 0; i < stories.length; i++) {
      storiesToAdd.push(createNewRow(stories[i]));
    }
    storyindexContainer.append(storiesToAdd);
  }

  // This function constructs a story's HTML
  function createNewRow(story) {
    var formattedDate = new Date(story.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newStoryCard = $("<div>");
    newStoryCard.addClass("card");
    var newStoryCardHeading = $("<div>");
    newStoryCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newStoryTitle = $("<h2>");
    var newStoryDate = $("<small>");
    var newStoryAuthor = $("<h5>");
    newStoryAuthor.text("Written by: " + story.Author.name);
    newStoryAuthor.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newStoryCardBody = $("<div>");
    newStoryCardBody.addClass("card-body");
    var newStoryBody = $("<p>");
    newStoryTitle.text(story.title + " ");
    newStoryBody.text(story.body);
    newStoryDate.text(formattedDate);
    newStoryTitle.append(newStoryDate);
    newStoryCardHeading.append(deleteBtn);
    newStoryCardHeading.append(editBtn);
    newStoryCardHeading.append(newStoryTitle);
    newStoryCardHeading.append(newStoryAuthor);
    newStoryCardBody.append(newStoryBody);
    newStoryCard.append(newStoryCardHeading);
    newStoryCard.append(newStoryCardBody);
    newStoryCard.data("story", story);
    return newStoryCard;
  }

  // This function figures out which story we want to delete and then calls deleteStory
  function handleStoryDelete() {
    var currentStory = $(this)
      .parent()
      .parent()
      .data("story");
    deleteStory(currentStory.id);
  }

  // This function figures out which story we want to edit and takes it to the appropriate url
  function handleStoryEdit() {
    var currentStory = $(this)
      .parent()
      .parent()
      .data("story");
    window.location.href = "/cms?story_id=" + currentStory.id;
  }

  // This function displays a message when there are no stories
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Author #" + id;
    }
    storyindexContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No stories yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    storyindexContainer.append(messageH2);
  }
*/

});

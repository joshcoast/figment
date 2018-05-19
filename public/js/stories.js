$(document).ready(function() {
  /* global moment */
  // storiesContainer holds all of our stories
  var storiesContainer = $(".stories-container");
  var storyCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleStoryDelete);
  $(document).on("click", "button.edit", handleStoryEdit);
  storyCategorySelect.on("change", handleCategoryChange);
  var stories;

  // This function grabs stories from the database and updates the view
  function getStories(category) {
    var categoryString = category || "";
    if (categoryString) {
      categoryString = "/category/" + categoryString;
    }
    $.get("/api/stories" + categoryString, function(data) {
      console.log("Stories", data);
      stories = data;
      if (!stories || !stories.length) {
        displayEmpty();
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete stories
  function deleteStories(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/stories/" + id
    })
      .then(function() {
        getStories(storyCategorySelect.val());
      });
  }

  // Getting the initial list of stories
  getStories();
  // InitializeRows handles appending all of our constructed story HTML inside
  // storiesContainer
  function initializeRows() {
    storiesContainer.empty();
    var storiesToAdd = [];
    for (var i = 0; i < stories.length; i++) {
      storiesToAdd.push(createNewRow(stories[i]));
    }
    storiesContainer.append(storiesToAdd);
  }

  // This function constructs a story's HTML
  function createNewRow(story) {
    var newStoryCard = $("<div>");
    newStoryCard.addClass("card");
    var newStoryCardHeading = $("<div>");
    newStoryCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-default");
    var newStoryTitle = $("<h2>");
    var newStoryDate = $("<small>");
    var newStoryCategory = $("<h5>");
    newStoryCategory.text(story.category);
    newStoryCategory.css({
      float: "right",
      "font-weight": "700",
      "margin-top":
      "-15px"
    });
    var newStoryCardBody = $("<div>");
    newStoryCardBody.addClass("card-body");
    var newStoryBody = $("<p>");
    newStoryTitle.text(story.title + " ");
    newStoryBody.text(story.body);
    var formattedDate = new Date(story.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    newStoryDate.text(formattedDate);
    newStoryTitle.append(newStoryDate);
    newStoryCardHeading.append(deleteBtn);
    newStoryCardHeading.append(editBtn);
    newStoryCardHeading.append(newStoryTitle);
    newStoryCardHeading.append(newStoryCategory);
    newStoryCardBody.append(newStoryBody);
    newStoryCard.append(newStoryCardHeading);
    newStoryCard.append(newStoryCardBody);
    newStoryCard.data("story", story);
    return newStoryCard;
  }

  // This function figures out which story we want to delete and then calls
  // deleteStory
  function handleStoryDelete() {
    var currentStory = $(this)
      .parent()
      .parent()
      .data("story");
    deleteStory(currentStory.id);
  }

  // This function figures out which story we want to edit and takes it to the
  // Appropriate url
  function handleStoryEdit() {
    var currentStory = $(this)
      .parent()
      .parent()
      .data("story");
    window.location.href = "/cms?story_id=" + currentStory.id;
  }

  // This function displays a message when there are no stories
  function displayEmpty() {
    storiesContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No stories yet for this category, navigate <a href='/cms'>here</a> in order to create a new story.");
    storiesContainer.append(messageH2);
  }

  // This function handles reloading new stories when the category changes
  function handleCategoryChange() {
    var newStoryCategory = $(this).val();
    getStories(newStoryCategory);
  }

});

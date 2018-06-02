$(document).ready(function() {
  //plugin settings 
  $('textarea#storyBody').characterCounter();

  $('select').formSelect();

  //var currentUser = $('#storyForm').data( "userid" );

  $("#submit").on("click", function(event) {

    const storyTitle = $( "#storyTitle" ).val();
    const storyDescription = $( "#storyDescription" ).val();
    const storyGenre = $( "#genreChoices" ).val();
    const storyBody = $( "#storyBody" ).val();

    const storyData = {
      title: storyTitle,
      description: storyDescription,
      genre: storyGenre,
      body: storyBody,
      votes: 0
    };

    $.post("/api/story-index/", storyData).then(getAuthors);
    
  });

  function getAuthors(){
    console.log("ran");
  }


  // Submits a new story and brings user to story-index page upon completion
  // function submitPost(story) {
  //   $.post("/api/story-index", story, function() {
  //     window.location.href = "/story-index";
  //   });
  // }



//plug-in scripts
$('.modal').modal();
$('.matchHeight').matchHeight();

});


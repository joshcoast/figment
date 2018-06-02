$(document).ready(function() {
  //plugin settings 
  $('textarea#sourceTA').characterCounter();
  $('select').formSelect();
  $('.modal').modal();
  $('.matchHeight').matchHeight();

  //var currentUser = $('#storyForm').data( "userid" );

  /*function run() {
    var text = document.getElementById('sourceTA').value,
        target = document.getElementById('targetDiv'),
        converter = new showdown.Converter(),
        html = converter.makeHtml(text);
      
      target.innerHTML = html;
  }*/

  $("#submit").on("click", function(event) {

    /*var text = document.getElementById('sourceTA').value,
        target = document.getElementById('targetDiv'),
        converter = new showdown.Converter(),
        html = converter.makeHtml(text);
      
      target.innerHTML = html;*/

    const storyTitle = $( "#storyTitle" ).val();
    const storyDescription = $( "#storyDescription" ).val();
    const storyGenre = $( "#genreChoices" ).val();
    const storyBody = $( "#sourceTA" ).val();
    const converter = new showdown.Converter();
    //var turndownService = new TurndownService();
    const html = converter.makeHtml(storyBody);
    //const markdown = turndownService.turndown(html);
    

    const storyData = {
      title: storyTitle,
      description: storyDescription,
      genre: storyGenre,
      body: html,
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





});


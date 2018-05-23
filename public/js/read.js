$(document).ready(function() {
 
    $("#final").on("click", newComment);
  
    // A function for handling what happens when the form to create a new story is submitted
    function newComment() {
      
      // Wont submit the story if we are missing a body, title, or author
      if (!$("#comment").val().trim()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newPost = {
        reader: "Jesse"
          ,
        feedback: $("#comment")
          .val()
          .trim(),
        
      };
      
      submitComment(newPost);
    
    }
  
    function submitComment(story) {
        $.post("/api/comment", story, function() {
          window.location.href = "/story-index";
        });
      }
   
  });
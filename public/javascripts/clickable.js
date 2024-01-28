$(function() {
   console.log("In clickable.js"); 
   $("#article_box").on("click", function() {
      // This needs to call a jquery AJAX post
      // Maybe post to /article/:id
      console.log(this)
   })
});
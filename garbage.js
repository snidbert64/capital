$(document).ready(function() {

  firebase.initializeApp({
    apiKey: 'AIzaSyCpx0dAKNSqol9123GLyuhaIqkzLvdIVrA',
    authDomain: 'https://capital-1556235479390.firebaseio.com/',
    projectId: 'capital-1556235479390'
  });

    // import("firebase/app");
    // import("firebase/firestore");
    
    var db = firebase.firestore();

    var user = firebase.auth().currentUser;

    var email;

    if (user != null) {
      email = user.email;

      db.collection("users").where("email", "==", email)
      .onSnapshot(function(querySnapshot) {
        $("#chat").empty();
        querySnapshot.forEach(function(doc) {
            $("#name").html(doc.data().name);
            $("#score").html(doc.data().score);
        });
      });
    }



  // Add a new document in collection "cities"

  console.log("Oh well");

  $("#add-chat").on("click", function(){
    event.preventDefault();
    db.collection("posts").add({
      author: "Nobody",
      content: $("#chat-input").val(),
      date: new Date(),
      score: 0
    })
    .then(function() {
      console.log("Document successfully written!");
    })
    .catch(function(error) {
      console.error("Error writing document: ", error);
    });
  });

    db.collection("posts").where("score", ">", -1)
    .onSnapshot(function(querySnapshot) {
      $("#chat").empty();
      querySnapshot.forEach(function(doc) {
          var post = $("<div>");
          $("<h4>"+ doc.data().author + "</h4>").appendTo(post);
          $("<button data-author='"+ doc.data().author +"' data-id='" + doc.data().id + "'>" + doc.data().score + "</button>").appendTo(post);
          $("<p>" + doc.data().content + "</p>").appendTo(post);
          post.appendTo($("#chat"));
      });
    });


});
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

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.

      console.log("There is a user logged in!");

      email = user.email;

      db.collection("users").where("email", "==", email)
      .onSnapshot(function(querySnapshot) {
        $("#chat").empty();
        querySnapshot.forEach(function(doc) {
            $("#name").html(doc.data().name);
            $("#score").html(doc.data().score);
        });
      });
    } else {
      // No user is signed in.
      console.log("There is not a user logged in!");
    }
  });

  console.log("foo");

  $("#add-chat").on("click", function(){
    event.preventDefault();
    db.collection("posts").add({
      author: user.name,
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

    db.collection("posts").orderBy("score", "desc")
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
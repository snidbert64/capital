$(document).ready(function() {

  firebase.initializeApp({
    apiKey: 'AIzaSyCpx0dAKNSqol9123GLyuhaIqkzLvdIVrA',
    authDomain: 'https://capital-1556235479390.firebaseio.com/',
    projectId: 'capital-1556235479390'
  });

    // import("firebase/app");
    // import("firebase/firestore");
    
    var db = firebase.firestore();

    var username;

    var email;

    var userid;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.

      console.log("There is a user logged in!");

      email = user.email;

      db.collection("users").where("email", "==", email)
      .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          username = doc.data().name;
          userid = doc.data().name;
            $("#name").html(doc.data().name);
            $("#score").html(doc.data().score);
        });
      });
    } else {
      // No user is signed in.
      console.log("There is not a user logged in!");
    }
  });

  console.log("Time Travel!");

  $("#add-chat").on("click", function(){
    event.preventDefault();
    if (username != null) {
      db.collection("posts").add({
        author: username,
        authorid: userid,
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
    }
  });

    db.collection("posts").orderBy("score", "desc")
    .onSnapshot(function(querySnapshot) {
      $("#chat").empty();
      querySnapshot.forEach(function(doc) {
          var post = $("<div>");
          $("<h4>"+ doc.data().author + "</h4>").appendTo(post);
          $("<button class='upvote-button' data-authorid='" + doc.data().authorid + "' data-author='"+ doc.data().author +"' data-id='" + doc.data().id + "'>" + doc.data().score + "</button>").appendTo(post);
          $("<p>" + doc.data().content + "</p>").appendTo(post);
          post.appendTo($("#chat"));
      });
    });

    $(".upvote-button").on("click", function(){
      event.preventDefault();

      if (userid != null) {
        db.collection("posts").doc($(this).attr("data-id")).update({
          score: firebase.firestore.FieldValue.increment(1)
        });

        db.collection("users").doc(userid).doc(userid).update({
          score: firebase.firestore.FieldValue.increment(-1)
        });

        if (userid !== $(this).attr("data-authorid")) {
          db.collection("posts").doc($(this).attr("data-authorid")).update({
            score: firebase.firestore.FieldValue.increment(1)
          });
        }
      }
    });


});
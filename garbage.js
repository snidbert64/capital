$(document).ready(function() {

  // shut up, dad!

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
          userid = doc.id;
            $("#name").html(doc.data().name);
            $("#score").html(doc.data().score);
        });
      });
    } else {
      // No user is signed in.
      console.log("There is not a user logged in!");
    }
  });

  console.log("Nobody but me is gonna read this, so it doesn't matter what I put here");

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
<<<<<<< HEAD
        $("<hr>").appendTo($("#chat"));
        var post = $("<div>");
        $("<strong>"+ doc.data().author + " </strong>").appendTo(post);
        $("<span>" + doc.data().score + " points</span>").appendTo(post);
        $("<button class='upvote-button' data-authorid='" + doc.data().authorid + "' data-author='"+ doc.data().author +"' data-id='" + doc.id + "'>+</button>").appendTo(post);
        $("<p>" + doc.data().content + "</p>").appendTo(post);
        post.appendTo($("#chat"));
=======
          var post = $("<div>");
          $("<strong>"+ doc.data().author + " </strong>").appendTo(post);
          $("<button class='upvote-button' data-authorid='" + doc.data().authorid + "' data-author='"+ doc.data().author +"' data-id='" + doc.id + "'>Upvote (" + doc.data().score + ")</button>").appendTo(post);
          $("<p>" + doc.data().content + "</p>").appendTo(post);
          post.appendTo($("#chat"));
>>>>>>> e332d697ab54cf17e1e7df64d61e1e82b0bb6b54
      });

      $(".upvote-button").off("click");

      $(".upvote-button").on("click", function(){
        event.preventDefault();
  
        console.log("Clicked!");

        console.log(userid);
  
        if (userid != null) {
          db.collection("posts").doc($(this).attr("data-id")).update({
            score: firebase.firestore.FieldValue.increment(1)
          });
  
          db.collection("users").doc(userid).update({
            score: firebase.firestore.FieldValue.increment(-1)
          });
  
          console.log("upvoted!");
  
          if (userid !== $(this).attr("data-authorid")) {
            db.collection("users").doc($(this).attr("data-authorid")).update({
              score: firebase.firestore.FieldValue.increment(1)
            });
          }
        }
      });
    });




});
$(document).ready(function() {

  firebase.initializeApp({
    apiKey: 'AIzaSyCpx0dAKNSqol9123GLyuhaIqkzLvdIVrA',
    authDomain: 'https://capital-1556235479390.firebaseio.com/',
    projectId: 'capital-1556235479390'
  });
  
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    console.log(user);
    // ...
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
    

    console.log("It's");



    // import("firebase/app");
    // import("firebase/firestore");
    
    var db = firebase.firestore();

    db.collection("posts").where("score", ">", -1)
    .onSnapshot(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            var post = $("<div>");
            $("<h4>"+ doc.data().author + "</h4>").appendTo(post);
            $("<button data-author='"+ doc.data().author +"' data-id='" + doc.data().id + "'>" + doc.data().score + "</button>").appendTo(post);
            $("<p>" + doc.data().content + "</p>").appendTo(post);
            post.appendTo($("#chat"));
        });
    });


});
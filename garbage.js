$(document).ready(function() {
    var name;

    function onSignIn(googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    }

    // function onSignIn(googleUser) {
    //     console.log("Signed In!");
    //     var profile = googleUser.getBasicProfile();
    //     name = profile.getName();
    //     console.log("Welcome, " + name);

    //     db.collection("users").where("name", "==", name)
    //     .onSnapshot(function(querySnapshot) {
    //         console.log(querySnapshot);
    //         if (querySnapshot.docs.size === 0){
    //             db.collection("users").add({
    //                 name: name,
    //                 score: 100 
    //             })
    //             .then(function(docRef) {
    //                 console.log("User added with ID: ", docRef.id);
    //             })
    //             .catch(function(error) {
    //                 console.error("Error adding user: ", error);
    //             });
    //         }


    //     });
    // }
    

    console.log("Plagueis");

    firebase.initializeApp({
        apiKey: 'AIzaSyCpx0dAKNSqol9123GLyuhaIqkzLvdIVrA',
        authDomain: 'https://capital-1556235479390.firebaseio.com/',
        projectId: 'capital-1556235479390'
    });

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
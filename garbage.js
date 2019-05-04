$(document).ready(function() {
    var auth2; // The Sign-In object.
var googleUser; // The current user.

/**
 * Calls startAuth after Sign in V2 finishes setting up.
 */
var appStart = function() {
  gapi.load('auth2', initSigninV2);
};

/**
 * Initializes Signin v2 and sets up listeners.
 */
var initSigninV2 = function() {
  auth2 = gapi.auth2.init({
      client_id: 'CLIENT_ID.apps.googleusercontent.com',
      scope: 'profile'
  });

  // Listen for sign-in state changes.
  auth2.isSignedIn.listen(signinChanged);

  // Listen for changes to current user.
  auth2.currentUser.listen(userChanged);

  // Sign in the user if they are currently signed in.
  if (auth2.isSignedIn.get() == true) {
    auth2.signIn();
  }

  // Start with the current live values.
  refreshValues();
};

/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
var signinChanged = function (val) {
  console.log('Signin state changed to ', val);
  document.getElementById('signed-in-cell').innerText = val;
};

/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
var userChanged = function (user) {
  console.log('User now: ', user);
  googleUser = user;
  updateGoogleUser();
  document.getElementById('curr-user-cell').innerText =
    JSON.stringify(user, undefined, 2);
};

/**
 * Updates the properties in the Google User table using the current user.
 */
var updateGoogleUser = function () {
  if (googleUser) {
    document.getElementById('user-id').innerText = googleUser.getId();
    document.getElementById('user-scopes').innerText =
      googleUser.getGrantedScopes();
    document.getElementById('auth-response').innerText =
      JSON.stringify(googleUser.getAuthResponse(), undefined, 2);
  } else {
    document.getElementById('user-id').innerText = '--';
    document.getElementById('user-scopes').innerText = '--';
    document.getElementById('auth-response').innerText = '--';
  }
};

/**
 * Retrieves the current user and signed in states from the GoogleAuth
 * object.
 */
var refreshValues = function() {
  if (auth2){
    console.log('Refreshing values...');

    googleUser = auth2.currentUser.get();

    document.getElementById('curr-user-cell').innerText =
      JSON.stringify(googleUser, undefined, 2);
    document.getElementById('signed-in-cell').innerText =
      auth2.isSignedIn.get();

    updateGoogleUser();
  }
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
    

    console.log("I");

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
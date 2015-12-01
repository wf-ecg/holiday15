/*jslint  white:false */
/*global define, window, FB, gapi */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['http://connect.facebook.net/en_US/all.js', 'https://apis.google.com/js/platform.js'], function (F, G) {
    var W, C;

    W = W || window;
    C = C || W.console;

// Dynamic Social Share

FB.init({appId: "744661099000077", status: true, cookie: true});

function facebookDynamicPony(ponyName) {
    // calling the API ...
    var obj = {
        method: 'feed',
        redirect_uri: 'http://www.wellsfargo.com/holidays#pony',
        link: 'http://www.wellsfargomedia.com/holidays/pony/index.html',
        picture: 'http://www.wellsfargomedia.com/holidays/pony/images/icons/social/ponies/PonyTile_' + ponyName + '.jpg',
        name: "I'm just like " + ponyName + ".",
        caption: 'Wells Fargo',
        description: "What's your pony personality? Take the quiz to find out at wellsfargo.com/holidays#pony."
    };

    function callback(response) {
        //document.getElementById('msg').innerHTML = "Post ID: " + response['post_id'];
    }

    FB.ui(obj);
}

function googlePlusDynamicPony(ponyName) {

    var options = {
        contenturl: 'http://www.wellsfargomedia.com/holidays/pony/index.html',
        contentdeeplinkid: '/pages',
        clientid: '549262275864-diq538uo7217empmla5omrfqekn8quk3.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        prefilltext: "I'm most like" + ponyName + ". " + "What's your pony personality? Take the quiz to find out at wellsfargo.com/holidays#pony.",
        calltoactionlabel: 'PLAY',
        calltoactionurl: 'http://www.wellsfargo.com/holidays#pony',
        calltoactiondeeplinkid: '/pages/create'
    };

    // Call the render method when appropriate within your app to display the button.

    gapi.interactivepost.render('shareGooglePost', options);

}

function tweetDynamic(ponyName) {
    //var phrase = document.getElementById('result').innerText;
    var tweetUrl = "https://twitter.com/share?text=I'm just like " +
        encodeURIComponent(ponyName) +
        ". What's your pony personality? Take the quiz to find out at wellsfargo.com/holidays#pony.";

    window.open(tweetUrl);
}

function emailDynamic(ponyName) {
    //var phrase = document.getElementById('result').innerText;
    var emailUrl = "mailto:?subject=What's%20Your%20Pony%20Personality?&body=I'm%20most%20like%20" + ponyName + ". What's%20your%20pony%20personality?%20Take%20the%20quiz%20to%20find%20out%20at%20https://www.wellsfargo.com/holidays%23pony";

    window.open(emailUrl);
}

});

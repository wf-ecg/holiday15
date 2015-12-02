/*jslint  white:false */
/*global define, window, FB, gapi */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['http://connect.facebook.net/en_US/all.js', 'https://apis.google.com/js/platform.js'], function () {
    var W, C;

    W = W || window;
    C = C || W.console;

// Dynamic Social Share

    FB.init({appId: '744661099000077', status: true, cookie: true});

    function facebookDynamicPony(ponyName) {
        ponyName = ponyName || W.document.getElementById('pn').innerHTML;
        // calling the API ...
        var obj = {
            caption: 'Wells Fargo',
            description: 'What’s your pony personality? ' +
                'Take the quiz to find out at wellsfargo.com/holidays#pony. #WFpony',
            link: 'http://www.wellsfargomedia.com/holidays/pony/index.html',
            method: 'feed',
            name: 'I’m just like ' + ponyName + '.',
            picture: 'http://www.wellsfargomedia.com/holidays/pony/images/icons/social/ponies/PonyTile_' +
                ponyName + '.jpg',
            redirect_uri: 'http://www.wellsfargo.com/holidays#pony',
        };

//        function callback(response) {
//            W.document.getElementById('msg').innerHTML = 'Post ID: ' + response['post_id'];
//        }

        FB.ui(obj);
    }

    function googlePlusDynamicPony(ponyName) {
        ponyName = ponyName || W.document.getElementById('pn').innerHTML;

        var obj = {
            calltoactionlabel: 'PLAY',
            calltoactiondeeplinkid: '/pages/create',
            calltoactionurl: 'http://www.wellsfargo.com/holidays#pony',
            clientid: '549262275864-diq538uo7217empmla5omrfqekn8quk3.apps.googleusercontent.com',
            contentdeeplinkid: '/pages',
            contenturl: 'http://www.wellsfargomedia.com/holidays/pony/index.html',
            cookiepolicy: 'single_host_origin',
            prefilltext: 'I’m most like ' + ponyName +
                '. What’s your pony personality? ' +
                'Take the quiz to find out at wellsfargo.com/holidays#pony. #WFpony',
        };
        // Call the render method when appropriate within your app to display the button.
        C.log('g+', obj, gapi.interactivepost.render('shareGooglePost', obj));
    }

    function tweetDynamic(ponyName) {
        ponyName = ponyName || W.document.getElementById('pn').innerHTML;

        var url = 'https://twitter.com/share?' +
            'text=I’m just like ' + ponyName +
            '. What’s your pony personality? ' +
            'Take the quiz to find out at wellsfargo.com/holidays#pony. #WFpony';

        W.open(url);
    }

    function emailDynamic(ponyName) {
        ponyName = ponyName || W.document.getElementById('pn').innerHTML;

        var url = 'mailto:?subject=What’s%20Your%20Pony%20Personality?&body=' +
            'I’m%20most%20like%20' + encodeURIComponent(ponyName) +
            '. What’s%20your%20pony%20personality?' +
            '%20Take%20the%20quiz%20to%20find%20out%20at%20' +
            'https://www.wellsfargo.com/holidays%23pony';

        W.open(url);
    }

    return {
        facebook: facebookDynamicPony,
        google: googlePlusDynamicPony,
        tweet: tweetDynamic,
        email: emailDynamic,
    };
});

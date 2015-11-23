/*jslint white:false */
/*global */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function hideStartScreen() {
    $('#welcome').removeClass('visible').addClass('hidden');
    $('.stagecoach-footer').removeClass('visible').addClass('hidden');
    $('#game').removeClass('hidden').addClass('visible');
}

function showStartScreen() {
    $('#welcome').removeClass('hidden').addClass('visible');
    $('#stageCoach').removeClass('hidden').addClass('visible');
    $('#game').removeClass('visible').addClass('hidden');
}

$("#btnStart").click(function () {
    showGame();
});

function showGame() {
    $('#welcome').removeClass('visible').addClass('hidden');
    $('#stageCoach').removeClass('visible').addClass('hidden');
    $('#game').removeClass('hidden').addClass('visible');
}

if (window.location.hash) {
    var hash = window.location.hash.substring(1); //Puts hash in variable, and removes the # character


    //alert (hash);
    // hash found
} else {
    //alert ("There is no hash");
    // No hash found
}

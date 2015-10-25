/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery'], function
    MAIN($) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window), C = (W.C || W.console || {});
    var Db = W.debug > 0;
    var PC = !W.navigator.userAgent.match(/mobi/i);

//EXTEND
    Main.mobile = !PC;

    $.scrollMain = function (px, ms) {
        $('html,body').animate({scrollTop: px}, (ms || 999), 'swing');
    };

//  PRIVATE
    function watchInputDevice() {
        $('body').on('keydown', function () {
            $(this).removeClass('mouse');
            $(this).addClass('keyboard');
        }).on('mousemove', function () {
            $(this).removeClass('keyboard');
            $(this).addClass('mouse');
        });
    }
    function doBindings() {
        watchInputDevice();
    }
    function expose() {
        W.main = Main; // expose for dev
        $.extend(Main, {
//            Modal: Modal,
//            Jumble: Jumble,
//            Tile: Tile,
//            Timer: Timer,
        });
    }
    function runTests() {
        // require(['jumble.test']);
        // require(['tile.test']);
        // require(['timer.test']);
        // require(['data.test']);
    }
//  INIT
    $(function () {
        if (Db) {
            expose();
            runTests();
        }
        doBindings();
    });

});

/*




*/

function swapper(arr, lf, rt) {
    var tmp = arr[lf];
    arr[lf] = arr[rt];
    arr[rt] = tmp;
}
function shuffler(array) {
    var arr = array.concat(),
        rem = arr.length,
        swap = function (a, b, c) {
            swapper(arr, a, b);
        };
    while (rem--) {
        swap(rem, Math.floor(Math.random() * (rem+1)));
    }
    return arr;
}




function displayCurrent () { // show anagram by
    // telling each of the tiles
    // from the solving array
    // to draw to the screen
}


function swap(i1, i2) {
    // update [solving]
    swapper(solving, i1, i2);
    swapHelper(divs[i1], divs[i2]);
}

function swapHelper(div1, div2) {
    // animate div1 and div2 tile coordinates
    var pair1 = div1.getPos();
    var pair2 = div2.getPos();
    div1.setPos(pair2);
    div2.setPos(pair1);
}
function done() {
    // show finished screen
    // play again?
}
function begin() {
    // dismiss start scren
    // tell each of [solving] to drawTo(screen)
}
function currentMatch(num) {
    a = solving[num].getVal();
    b = correct[num];
    return a === b;
}


// Wrap solving array
function () {
  qu
}




//

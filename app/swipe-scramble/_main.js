/*jslint white:false, laxcomma:true */
/*global W, define */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-09

 USE
 single use
 hook up scripts to DOM

 TODO

 */
define(['jquery', 'lodash', 'sequence', 'shuffle', 'data', 'message', 'skrollr'], function
    MAIN($, _, Seq, Shuf, Data, Msg, skrollr) {
    'use strict';

    var Nom = 'Main';
    var Main = {};
    var W = (W && W.window || window),
        C = (W.C || W.console || {});

    function db(num) {
        return W.debug > (num || 1);
    }
    function expose(obj, log) {
        if (db()) {
            W.Main = Main; // expose for dev
            $.extend(Main, obj);
        }
        if (log) {
            C.info(Nom, 'expose', Main);
        }
    }

    var pair, correct, anagram, play, scroll;
    var attempt = 0;
    var msgs = new Msg();
    var shuffle = new Shuf();
    var sequence = new Seq('', {
        random: !true,
    }); // blank but randomized
    var ACT = 'keypress click';
    var seg = 860;

    // - - - - - - - - - - - - - - - - - -
    // EXTEND
    expose({
        shuffle: shuffle,
        sequence: sequence,
        Data: Data,
        // Skor: skrollr.init({
        //     forceHeight: true,
        //     mobileCheck: function (){return true},
        //     skrollrBody: 'skrollr-body',
        // });
    });
    var header = $('header').first();
    var pushin = $('.pushin').first();
    var button = header.find('button').first();

    button.click(function () {
        $('.row-offcanvas').toggleClass('active');
        button.toggleClass('collapsed');

        if (button.is('.collapsed')) {
            pushin.find('.shareBar ul').appendTo(header.find('.shareBar'));
        } else {
            header.find('.shareBar ul').appendTo(pushin.find('.shareBar'));
        }
    });
    $.watchResize(function () {
        if (!button.is('.collapsed')) {
            button.click();
        }
    });

    pushin.load('../includes/main_pushin.html .pushin > *');

    $.watchInputDevice();
    //$.markAgent();

    // - - - - - - - - - - - - - - - - - -
    // PRIVATE
    function begin() {
        var tmp;

        scrollUp();
        msgs.select('intro').show();

        play.fadeOut();
        pair = '';
        do { // skip incongruent data sets
            if (attempt++ > 99)
                throw new Error('out of data');
            pair = Data.get();
        } while (!pair.anagram);

        correct = pair.correct.toUpperCase();
        anagram = pair.anagram.toUpperCase();
        tmp = anagram + ' -> ' + correct;

        shuffle.init(anagram);
        sequence.init(correct);

        shuffle.display();
        watchScroll(_.throttle(doNext, 666));
        C.log(Nom, 'begin', sequence.array, tmp);
    }
    function done() {
        watchScroll();
        shuffle.destroy();
        scrollUp();
        msgs.select('finish').show(_.delay(function () {
            scroll.one('scroll', begin); // wait and allow a scroll to begin
        }, 2222));
    }
    function scrollUp(off) {
        msgs.cheer();
        scroll.scrollTop(off);
    }
    function scrollDown() {
        scroll.animate({
            scrollTop: seg
        }, 999, function () {
            doNext();
            scroll.css({
                scrollTop: 0,
            });
        });
    }

    function doNext() {
        var i, j, l, w;
        var off = (scroll.scrollTop() - seg) % seg;
        if (off < 0) return;

        try {
            i = sequence.getNext();
        } catch (err) {
            if (db(2)) {
                C.log(err);
            }
            return done();
        }
        l = correct[i];
        j = shuffle.indexOf(l, i);
        w = anagram[i];
        if (j > -1) {
            shuffle.tiles[j].get().addClass('correct');
            if (l && (i !== j) && (l !== w)) {
                shuffle.swap(i, j);
                scrollUp(off);
                C.log(Nom, 'doNext SWAP', [i, j], [l, w], [shuffle.toString()]);
            } else {
                C.log(Nom, 'doNext skip', [i, j], [l, w], [shuffle.toString()]);
                doNext();
            }
        }
        if (sequence.check() < 3) { // sooo close just keep going
            scroll.scrollTop(seg);
        }
    }

    function watchScroll(fn) {
        if (fn) {
            watchScroll.last = fn;
            scroll.on('scroll', fn);
        } else {
            scroll.off('scroll', watchScroll.last);
        }
    }
    function doBindings() {
        scroll = $('.scrollOuter');
        play = scroll.find('button');
        $('.lookdown').on(ACT, scrollDown).find('div').attr('tabIndex', 0);
    }

//  INIT
    $(function () {
        C.info(Nom, 'init @', new Date(), 'debug:', W.debug);
        Main.begin = begin;
        doBindings();
        begin();
    });

});

/*




 */

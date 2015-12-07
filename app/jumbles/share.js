/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
 created drt 2015-12

 USE
 ...

 TODO
 ...
 */
define(['jquery'], function () {
    var W = W || window,
        C = C || W.console;

    var div, init, share, tweak;

    div = '#shareBarDynamic';
    share = {
        fb_id: '744661099000077',
        greet: 'Happy holidays! I thought you might like to play the holiday Jingle Jumbles anagram game from Wells Fargo.',
        index: 'http://www.wellsfargomedia.com/holidays/jumbles/',
        link: '',
        message: '',
        score: '',
        subject: 'Wells Fargo Jingle Jumbles',
        title: '',
    };

    init = function (sel) {
        div = $(sel || div);

        return false;
    };

    tweak = function (score, rating) {
        if (init) {
            init = init();
        }
        share.score = 'I scored ' + score + '.';

        switch (rating) {
            case 'okay':
                share.title = share.score + ' I’m a Jingle Jumbles rock star.';
                share.message = 'Now it’s your turn. ';
                break;
            case 'good':
                share.title = share.score + ' I’m a Jingle Jumbles word master.';
                share.message = 'I double-dog dare you to beat my score. ';
                break;
            default:
                share.title = share.score + ' I’m a Jingle Jumbles natural.';
                share.message = 'Can you beat my score? ';
        }

        share.message += 'See how many Jingle Jumbles you can solve.';
        share.long = share.title + ' ' + share.message;
        share.email = share.title + ' ' + share.message + ' ' + share.index;

        updateLinks();
    };

    function updateLinks() {
        div.find('a.icon-facebook')
            .attr('href', querify('https|//www.facebook.com/dialog/feed?', {
                app_id: share.fb_id,
                caption: share.score,
                description: share.long,
                display: 'popup',
                link: share.index,
                redirect_uri: share.index,
            }));

        div.find('a.icon-twitter')
            .attr('href', querify('https|//twitter.com/intent/tweet?', {
                text: share.title,
                url: share.index,
            }));

        div.find('a.icon-googleplus')
            .attr('href', querify('https|//plus.google.com/share?', {
                url: share.index,
            }));

        div.find('a.icon-share')
            .attr('href', querify('mailto|?', {
                body: share.email,
                subject: share.subject,
            }));
    }

    /// INTERNALS

    function db(num) {
        return W.debug > (num || 0);
    }

    function querify(str, obj) {
        var url = str.replace('|', ':') + $.param(obj).replace(/\+/g, '%20');

        db() && C.info(obj, url);
        db(1) && W.open(url);
        return url;
    }

    return {
        tweak: tweak,
        expose: function () {
            return share;
        },
    };
});

/*



 */

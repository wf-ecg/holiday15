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
        greet: 'What’s your pony personality?',
        index: 'http://www.wellsfargomedia.com/holidays/pony/',
        link: '',
        message: 'Take the quiz to find out at wellsfargo.com/holidays#pony. #WFpony',
        score: '',
        subject: 'What’s your pony personality?',
        title: '',
    };

    init = function (sel) {
        div = $(sel || div);

        return false;
    };

    tweak = function (pony) {
        if (init) {
            init = init();
        }
        var jpg = 'PonyTile_' + pony.replace(/\s/g, '') + '.jpg';

        share.score = 'I’m most like ' + pony + '.';
        share.image = share.index + 'images/icons/social/ponies/' + jpg;

        share.short = share.score + ' ' + share.message;
        share.long = share.score + ' ' + share.greet + ' ' + share.message;
        share.email = share.long + ' ' + share.index;

        updateLinks();
    };

    function updateLinks() {
        div.find('a.icon-facebook')
            .attr('href', querify('https|//www.facebook.com/dialog/feed?', {
                app_id: '189445374730755',
                caption: share.score,
                description: share.long,
                display: 'popup',
                link: share.index,
                picture: share.image,
                redirect_uri: share.index,
            }));

        div.find('a.icon-twitter')
            .attr('href', querify('https|//twitter.com/intent/tweet?', {
                text: share.short,
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

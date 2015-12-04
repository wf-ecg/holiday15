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
        greet: 'Build Your Own Snowman!',
        index: 'http://www.wellsfargomedia.com/holidays/pony/',
        link: '',
        message: 'Create a snowman as cool as you with the Snowman Shuffle.',
        subject: 'Build Your Own Snowman',
        title: '',
    };

    init = function (sel) {
        div = $(sel || div);

        return false;
    };

    tweak = function (link) {
        if (init) {
            init = init();
        }
        share.index = link;

        share.long = share.greet + ' ' + share.message;
        share.email = share.message + ' ' + share.index;

        updateLinks();
    };

    function updateLinks() {
        div.find('a.icon-facebook')
            .attr('href', querify('https|//www.facebook.com/dialog/feed?', {
                app_id: share.fb_id,
                caption: share.greet,
                description: share.long,
                display: 'popup',
                link: share.index,
                //picture: share.image,
                redirect_uri: share.index,
            }));

        div.find('a.icon-twitter')
            .attr('href', querify('https|//twitter.com/intent/tweet?', {
                text: share.greet,
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

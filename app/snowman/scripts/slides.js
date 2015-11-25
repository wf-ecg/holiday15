/*jslint  white:false */
/*globals define, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
define(['lodash', 'help', 'page'], function (_, Help, Page) {
    var W, C;

    W = W || window;
    C = C || W.console;

    Slides = {
        $: '.slider',
        A: null,
        B: null,
        C: null,
        div: '.snowmen',
        preview: '#Preview',
        closePreview: new Function,
        openPreview: new Function,
        scramble: new Function,
        makeLink: new Function,
    };

    Slides.init = function ($) {
        var self = this, mode, preview$;

        mode = Page.getMode() > 0 ? 1 : 0;
        preview$ = $(self.preview);

        self.div = $(self.div).eq(0);

        preview$.on('mousedown', function (evt) {
            //C.debug(evt);
            if (evt.target === preview$[0]) {
                evt.stopImmediatePropagation();
                self.closePreview();
            }
        });

        self.$ = $(self.$).randId();
        self.ia = parseInt(Help.getParameterByName('a') || '0', 10);
        self.ib = parseInt(Help.getParameterByName('b') || '0', 10);
        self.ic = parseInt(Help.getParameterByName('c') || '0', 10);

        $.extend(Help.defaults, {
            $DragOrientation: mode,
        });

        self.A = new $JssorSlider$(self.$[0].id, Help.makeOptions({
            $StartIndex: self.ia,
        }));
        self.B = new $JssorSlider$(self.$[1].id, Help.makeOptions({
            $StartIndex: self.ib,
        }));
        self.C = new $JssorSlider$(self.$[2].id, Help.makeOptions({
            $StartIndex: self.ic,
        }));

        function disableBtnForSecs(sel, sec) {
            var btn, url, slug = 'javascript';

            btn = $(sel);
            url = btn.attr('href');

            btn.fadeTo(sec * 99, 0.5);
            btn.attr('href', slug + ':');

            _.delay(function () {
                btn.attr('href', url);
                btn.fadeTo(sec * 9, 1);
            }, sec * 999);
        }

        self.scramble = function () {
            var i;
            Page.reset();

            function rando() {
                return (Math.random() * 9 + 1) | 0;
            }

            for (i = 0; i < rando(); i++) {
                W.setTimeout($.fn.click.bind(self.$.eq(0).find('.right')), i * 99);
            }
            for (i = 0; i < rando(); i++) {
                W.setTimeout($.fn.click.bind(self.$.eq(1).find('.left')), i * 99);
            }
            for (i = 0; i < rando(); i++) {
                W.setTimeout($.fn.click.bind(self.$.eq(2).find('.right')), i * 99);
            }
            disableBtnForSecs('.button.preview', 1);
            disableBtnForSecs('.button.scramble', 1);
        };

        function readIndexes() {
            self.ia = self.A.$CurrentIndex();
            self.ib = self.B.$CurrentIndex();
            self.ic = self.C.$CurrentIndex();
        }

        self.makeLink = function (mode, msg) {
            msg = 'share_via_' + (msg || 'load');
            var currentIndexes = []; // generate link based of current slides positions
            var href = W.location.href.replace(/\#.*/, ''); // clear query
            var stub = '';
            var toke = '+';

            readIndexes();
            currentIndexes.push('#a' + self.ia);
            currentIndexes.push('b' + self.ib);
            currentIndexes.push('c' + self.ic);
            stub = currentIndexes.join(toke);

            href += stub;
            $('#OG_url').attr('content', href);

            if (mode === false) {
                if (W.ga)
                    W.ga('send', 'event', 'SNOWMAN', msg + stub, {
                        'nonInteraction': true
                    });
                C.warn('send', 'event', 'SNOWMAN', msg + stub);
                return href;
            } else if (mode === true) {
                mode = Page.getMode();
            }
            window.location.hash = stub + (mode ? toke + 'm' + mode : ''); // TODO why no W?

            return href;
        };

        function makeClone() {
            var clone = $('#Clone');

            if (!clone.length) {
                clone = self.div.clone(); // duplicate snowman

                clone.attr('id', 'Clone') //
                    .find('[id]').randId().end() //
                    .css({// hack to match container
                        height: self.$.height(),
                        width: self.$.width(),
                    }).append($(' .splash').clone()) //
                    ;

                clone.find('.splash') //
                    .css('position', 'absolute') //
                    .attr('title', 'Drag to position / Click to fade') //
                    .draggable({containment: '#Preview'}) //
                    .click(function () {
                        $(this).animate({
                            opacity: '-=0.2'
                        });//remove();
                    });
            }
            preview$.append(clone);
        }

        self.openPreview = function () {
            $('html, body').addClass('freeze');
            self.makeLink(true);

            preview$.fadeIn();
            _.delay(function () {
                makeClone();
                $('#Preview .splash').stikit(1.11, 2.3);
            }, 333);
        };

        self.closePreview = function () {
            $('html, body').removeClass('freeze');
            $('#Clone, #Preview .splash').remove();
            preview$.fadeOut();
        };
        //self.scale = scaleSlider;
    };

    return Slides;
});

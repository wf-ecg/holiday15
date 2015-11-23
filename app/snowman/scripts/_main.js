/*jslint white:false */
/*global document, jQuery, window, Page, Slides */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W, C;

W = W || window;
C = C || W.console;

jQuery(function () {
    var mode = Page.getMode();

    FastClick.attach(W.document.body);
    Page.reset(function () {
        Page.reSource($('[data-src]'));
        $('.loader').fadeOut(999);
        Slides.init(W.jQuery);
        //Slides.makeLink(false); <--- needed?
    });

    /// EVENTS

    $('a.closeLink').first().click(function (e) {
        Slides.closePreview();
        e.preventDefault();
    });
    $('body').on('keydown', function (evt) {
        //C.debug('keydown', evt.keyCode);
        if (evt.keyCode === 27) {
            Slides.closePreview();
        }
    });

    /// MODES

    mode = mode > 0 ? mode : 0;
    $('body').addClass('mode' + mode);
    $('.greeting').show();

    if (mode > 0) {

        $('.create').show();

        switch (mode) {
            case 0:
                break;
            case 2:
                $('.charity').show();
                break;
            case 3:
                //$('body').toggleClass('wells wystar');
        }
    } else {
        $('.shared').show();
        $('.create, .arrow').remove();
    }
});

/*jslint white:false */
/*globals document, jQuery, window,
    Help, Page:true,
    $JssorEasing$, $JssorSlider$,
*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W, C, Page;

W = W || window;
C = C || W.console;
Page = {
    getMode: Function,
    reset: Function,
    reSource: Function,
};

Page.getMode = function () {
    return parseInt(Help.getParameterByName('m') || '-1', 10);
};

Page.reset = function (cb) {
    $('body').animate({
        'scrollTop': 0,
    }, 333);

    W.setTimeout(function () {
        if (cb) {
            cb();
        }
        W.scrollTo(0, 0);
        W.scrollTo(0, 1);
    }, 999);
};

Page.reSource = function (eles) {
    //C.debug(eles);
    $(eles).each(function (i, e) {
        var me = $(e);
        me.attr('src', me.data('src'));
    });
};

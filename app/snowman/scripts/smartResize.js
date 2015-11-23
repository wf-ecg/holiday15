/*jslint white:false */
/*global */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function ($, sr) {

    var debounce = function (func, threshold, execAsap) {

        var timeout;

        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            }

            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);

            timeout = setTimeout(delayed, threshold || 100);
        };
    };

    // smartresize
    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };

})(jQuery, 'smartresize');


$(document).ready(function () {


    function snowmanScrambleInit() {

        var screenWidth = $(window).width();
        var screenHeight = $(window).height();

        var vmHeight = screenHeight;
        var vmWidth = screenWidth;


        if (screenWidth < 599) {

            // set primary dynamic ratios
            var snowmanHeight = vmHeight * 0.90;
            var sliderHeight = snowmanHeight / 3;

            var snowmanWidth = sliderHeight * 2.80;
            var sliderWidth = snowmanWidth;
            var buttonRowHeight = vmHeight * 0.10;

            var toyHeight = snowmanHeight;

            //var snowmanOffsetCalc = snowmanWidth * 0.01;
            //var snowmanOffset = snowmanOffsetCalc * -1;
            var snowmanOffset = (screenWidth - sliderWidth) / 2;

        } else {
            var screenWidth = $(window).width();
            var screenHeight = $(window).height();

            // set primary dynamic ratios
            //var snowmanHeight = vmHeight * 0.90;
            //var sliderHeight = snowmanHeight / 3;
            //var snowmanWidth = sliderHeight * 2.80;
            //var sliderWidth = snowmanWidth;
            //var buttonRowHeight = vmHeight * 0.10;
            //var toyHeight = snowmanHeight;

        }



        function adjustScreenSize() {

            //$('#snowmen').height(snowmanHeight);
            $('#snowmen').width(snowmanWidth);
            $('#snowmanButtons').height(buttonRowHeight);

            $('.slider').height(sliderHeight);
            $('.slider').width(sliderWidth);

            $('.snowmen div').width(snowmanWidth);
            $('.snowmen div').height(sliderHeight);

            $('.snowmen div img.img-slider').width(snowmanWidth);
            $('.snowmen div img.img-slider').height(sliderHeight);


            $('#snowmen').offset({offset: snowmanOffset});
            $('.slider').offset({left: snowmanOffset});
            $('.snowmen div').offset({left: snowmanOffset});
            $('.snowmen div img.img-slider').offset({left: snowmanOffset});

        }

        console.log(
            "snowmanWidth: " + snowmanWidth +
            " snowmanHeight: " + snowmanHeight +
            " screenHeight: " + screenHeight +
            " screenWidth: " + screenWidth +
            " vmHeight: " + vmHeight +
            " vmWidth: " + vmWidth +
            " snowmanWidth: " + snowmanWidth +
            " snowmanHeight: " + snowmanHeight +
            " sliderWidth: " + sliderWidth +
            " sliderHeight: " + sliderHeight +
            " sliderHeight: " + sliderHeight +
            " buttonRowHeight: " + buttonRowHeight +
            " snowmanOffset: " + snowmanOffset
            );
    }

    snowmanScrambleInit();


    $(window).smartresize(function () {
        snowmanScrambleInit();

    });

});

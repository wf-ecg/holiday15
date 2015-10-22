
function getMasony() {
    $('.masonry-container').masonry({
        itemSelector: '.tile',
        gutter: 0,
        columnWidth: 30,
    });
}
window.setTimeout(function () {
    $('.stagecoach-logo').dblclick(getMasony);
}, 999);

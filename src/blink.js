var $cursor = $('#cursor'),
    visible = true;

function blink() {
    if (visible) {
        $cursor.addClass('invisible');
    } else {
        $cursor.removeClass('invisible');
    }

    visible = !visible;
}

setInterval(blink, 1000);

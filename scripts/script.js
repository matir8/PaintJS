/// <reference path="../../typings/tsd.d.ts" />
var $wrapper = $('.wrapper'),
    $tools = $('#tools-container'),
    canvas = document.getElementById('canvas'),
    tempcanvas = document.getElementById('tempcanvas'),
    ctx = tempcanvas.getContext('2d'),
    mainctx = canvas.getContext('2d'),
    color = 'black',
    rectSelect = false,
    triangleSelect = false,
    circleSelect = false,
    pencilSelect = false,
    brushSelect = false,
    eraserSelect = false,
    lineSelect = false,
    x1,
    y1,
    x2,
    y2,
    mouseDown = false,
    lineWidth = 3;

function setColor(ev) {
    color = ev.target.id;
}
$('.color-button').on('click', setColor);

$tools.on('click', '#rectangle', function (ev) {
    rectSelect = true;
    triangleSelect = false;
    circleSelect = false;
    pencilSelect = false;
    brushSelect = false;
    eraserSelect = false;
    lineSelect = false;
    changeCursirIcon();
});

$tools.on('click', '#triangle', function (ev) {
    rectSelect = false;
    triangleSelect = true;
    circleSelect = false;
    pencilSelect = false;
    brushSelect = false;
    eraserSelect = false;
    lineSelect = false;
    changeCursirIcon();
});

$tools.on('click', '#circle', function (ev) {
    rectSelect = false;
    triangleSelect = false;
    circleSelect = true;
    pencilSelect = false;
    brushSelect = false;
    eraserSelect = false;
    lineSelect = false;
    changeCursirIcon();
});

$tools.on('click', '#pencil', function (ev) {
    rectSelect = false;
    triangleSelect = false;
    circleSelect = false;
    pencilSelect = true;
    brushSelect = false;
    eraserSelect = false;
    lineSelect = false;
    changeCursirIcon(true, 'pencil-cursor');
});

$tools.on('click', '#brush', function (ev) {
    rectSelect = false;
    triangleSelect = false;
    circleSelect = false;
    pencilSelect = false;
    brushSelect = true;
    eraserSelect = false;
    lineSelect = false;
    changeCursirIcon(true, 'brush-cursor');
});

$tools.on('click', '#eraser', function (ev) {
    rectSelect = false;
    triangleSelect = false;
    circleSelect = false;
    pencilSelect = false;
    brushSelect = false;
    eraserSelect = true;
    lineSelect = false;
    changeCursirIcon(true, 'eraser-cursor');
});

$tools.on('click', '#line', function (ev) {
    rectSelect = false;
    triangleSelect = false;
    circleSelect = false;
    pencilSelect = false;
    brushSelect = false;
    eraserSelect = false;
    lineSelect = true;
    changeCursirIcon();
});

$(tempcanvas).on('mousedown', function (ev) {
    mouseDown = true;
    var rect = tempcanvas.getBoundingClientRect();
    x1 = ev.clientX - rect.left;
    y1 = ev.clientY - rect.top;
});

$(tempcanvas).on('mousemove', function (event) {
    if (mouseDown) {
        var rect = tempcanvas.getBoundingClientRect();

        x2 = event.clientX - rect.left;
        y2 = event.clientY - rect.top;

        if (rectSelect) {
            width = x2 - x1;
            height = y2 - y1;

            drawRect(x1, y1, width, height, color, lineWidth);
        }
        if (circleSelect) {
            ctx.clearRect(0, 0, tempcanvas.width, tempcanvas.height);
            drawEllipse(x1, y1, x2, y2, color, lineWidth);

            ctx.strokeStyle = 'rgba(255, 0, 0, 0)';
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        }
        if (pencilSelect) {

            drawWithPencil(x1, y1, x2, y2, color, lineWidth);
            x1 = x2;
            y1 = y2;
        }
        if (brushSelect) {
            ctx.save();

            drawWithPencil(x1, y1, x2, y2, color, (lineWidth + 2));
            x1 = x2;
            y1 = y2;

            ctx.restore();
        }
        if (eraserSelect) {
            eraser(x1, y1);
            x1 = x2;
            y1 = y2;
        }
        if (triangleSelect) {
            width = x2 - x1;
            height = y2 - y1;

            drawTriangle(x1, y1, width, height, color, lineWidth);
        }
        if (lineSelect) {
            ctx.clearRect(0, 0, tempcanvas.width, tempcanvas.height);
            drawLine(x1, y1, x2, y2, color, lineWidth);

        }

    }
});

$(tempcanvas).on('mouseup', function (ev) {
    mouseDown = false;
    mainctx.drawImage(tempcanvas, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});



$('#color-picker').on('change', function () {
    var $this = $(this),
        value = $this.val();
    color = '#' + value;

    $this.val(color);

});

function changeCursirIcon(hasIcon, className) {
    $(tempcanvas).removeClass('pencil-cursor');
    $(tempcanvas).removeClass('brush-cursor');
    $(tempcanvas).removeClass('eraser-cursor');

    if (hasIcon) {
        $(tempcanvas).addClass(className);
    }
}

$('#file-upload').on('change', drawImg);

$('#reset').on('click', function () {
    console.log('reset clicked');
    mainctx.clearRect(0, 0, canvas.width, canvas.height);
});

$('#save').on('click', function () {
    var canvas = document.getElementById('canvas'),
        image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"),
        link = document.getElementById('download-link');

    link.setAttribute('href', image);
    link.click();
});

$('#small').on('click', function () {
    lineWidth = 2;
    console.log('small');
    console.log(lineWidth);
});

$('#normal').on('click', function () {
    lineWidth = 5;
    console.log('normal');
    console.log(lineWidth);
});

$('#large').on('click', function () {
    lineWidth = 8;
    console.log('large');
    console.log(lineWidth);
});


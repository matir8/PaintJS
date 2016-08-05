/// <reference path="../typings/tsd.d.ts" />
var $wrapper = $('.wrapper'),
    $tools = $('#tools-container'),
    canvas = document.getElementById('canvas'),
    tempcanvas = document.getElementById('tempcanvas'),
    ctx = tempcanvas.getContext('2d'),
    mainctx = canvas.getContext('2d'),
    color = 'black',
    rectSelect = false,
    circleSelect = false,
    pencilSelect = false,
    brushSelect = false,
    x1,
    y1,
    x2,
    y2,
    mouseDown = false;

function setColor(id) {
    color = id;
}

$tools.on('click', '#rectangle', function (ev) {
    rectSelect = true;
    circleSelect = false;
    pencilSelect = false;
    brushSelect = false;
    changeCursirIcon();
});

$tools.on('click', '#circle', function (ev) {
    rectSelect = false;
    circleSelect = true;
    pencilSelect = false;
    brushSelect = false;
    changeCursirIcon();
});

$tools.on('click', '#pencil', function (ev) {
    rectSelect = false;
    circleSelect = false;
    pencilSelect = true;
    brushSelect = false;
    changeCursirIcon(true, 'pencil-cursor');
});

$tools.on('click', '#brush', function (ev) {
    rectSelect = false;
    circleSelect = false;
    pencilSelect = false;
    brushSelect = true;
    changeCursirIcon(true, 'brush-cursor');
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

            drawRect(x1, y1, width, height, color);
        }
        if (circleSelect) {
            ctx.clearRect(0, 0, tempcanvas.width, tempcanvas.height);
            drawEllipse(x1, y1, x2, y2, color);

            ctx.strokeStyle = 'rgba(255, 0, 0, 0)';
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        }
        if (pencilSelect) {

            drawWithPencil(x1, y1, x2, y2, color);
            x1 = x2;
            y1 = y2;
        }
        if(brushSelect) {
            ctx.save();

            // Use function for Pencil, but with different lineWidth. 
            ctx.lineWidth = 5; 
            drawWithPencil(x1, y1, x2, y2, color);
            x1 = x2;
            y1 = y2;

            ctx.restore();
        }
    }
});

$(tempcanvas).on('mouseup', function (ev) {
    mouseDown = false;
    mainctx.drawImage(tempcanvas, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

function drawRect(x, y, width, height, color) {
    var canvasWidth = canvas.width,
        canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = color;
    ctx.beginPath();

    ctx.strokeRect(x, y, width, height);
}

$('#color-picker').on('change', function () { 
    let $this = $(this),
        value = $this.val();
        color = '#' + value;
    
    $this.val(color);

 });

function drawEllipse(x1, y1, x2, y2, color) {
    var radiusX = (x2 - x1) * 0.5,
        radiusY = (y2 - y1) * 0.5,
        centerX = x1 + radiusX,
        centerY = y1 + radiusY,
        step = 0.01,
        a = step,
        pi2 = Math.PI * 2 - step;

    ctx.beginPath();
    ctx.moveTo(centerX + radiusX * Math.cos(0),
        centerY + radiusY * Math.sin(0));

    for (; a < pi2; a += step) {
        ctx.lineTo(centerX + radiusX * Math.cos(a),
            centerY + radiusY * Math.sin(a));
    }

    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.stroke();
}

function drawWithPencil(x1, y1, x2, y2, color) {
    ctx.beginPath();
    ctx.strokeStyle = color;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

}

function changeCursirIcon(hasIcon, className) {
    $(tempcanvas).removeClass('pencil-cursor');
    $(tempcanvas).removeClass('brush-cursor');

    if (hasIcon) {
        $(tempcanvas).addClass(className);
    }
}
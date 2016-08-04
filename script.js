/// <reference path="../typings/tsd.d.ts" />
var $wrapper = $('.wrapper'),
    $tools = $('#tools-container'),
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    color = 'black',
    rectSelect = false,
    circleSelect = false,
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
});

$tools.on('click', '#circle', function (ev) {
    rectSelect = false;
    circleSelect = true;
});

$(canvas).on('mousedown', function (ev) {
    mouseDown = true;
    var rect = canvas.getBoundingClientRect();
    x1 = ev.clientX - rect.left;
    y1 = ev.clientY - rect.top;
});

$(canvas).on('mousemove', function (event) {
    if (mouseDown) {
        if (rectSelect) {
            var rect = canvas.getBoundingClientRect(),
                endX = event.pageX - rect.left,
                endY = event.pageY - rect.top,
                width = endX - x1,
                height = endY - y1;
            drawRect(x1, y1, width, height, color);
        }
        if (circleSelect) {
            var rect = canvas.getBoundingClientRect(),
                x2 = event.clientX - rect.left,
                y2 = event.clientY - rect.top;

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawEllipse(x1, y1, x2, y2, color);

            ctx.strokeStyle = 'rgba(255, 0, 0, 0)';
            ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        }
    }
});

$(canvas).on('mouseup', function (ev) {
    mouseDown = false;
});

function drawRect(x, y, width, height, color) {
    var canvasWidth = canvas.width,
        canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = color;
    ctx.beginPath();

    ctx.strokeRect(x, y, width, height);
}

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
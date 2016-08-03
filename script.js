/// <reference path="../typings/tsd.d.ts" />
var $wrapper = $('.wrapper'),
    $tools = $('#tools-container'),
    canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d'),
    rectSelect = false,
    mouseDown = false;

$tools.on('click', '#rectangle', function (ev) {
    rectSelect = true;
});


$(canvas).on('mousedown', function (ev) {
    mouseDown = true;
    var startX = ev.pageX - findPos(this).x,
        startY = ev.pageY - findPos(this).y;
    if (rectSelect) {
        $(canvas).on('mousemove', function (event) {
            if (mouseDown) {
                var endX = event.pageX - findPos(this).x,
                    endY = event.pageY - findPos(this).y,
                    width = endX - startX,
                    height = endY - startY;
                drawRect(startX, startY, width, height, "black");
            }
        });
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

function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}


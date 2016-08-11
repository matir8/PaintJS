function drawRect(x, y, width, height, color, lineWidth) {
    var canvasWidth = canvas.width,
        canvasHeight = canvas.height;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.beginPath();

    ctx.strokeRect(x, y, width, height);
}

function drawTriangle(x, y, width, height, color, lineWidth) {
    ctx.beginPath();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.moveTo(x, y);
    ctx.lineTo(x + width / 2, y + height);
    ctx.lineTo(x - width / 2, y + height);
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function drawLine(x1, y1, x2, y2, color, lineWidth) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function drawEllipse(x1, y1, x2, y2, color, lineWidth) {
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
    ctx.lineWidth = lineWidth;
    ctx.stroke();
}

function drawWithPencil(x1, y1, x2, y2, color, lineWidth) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;

    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

function eraser(x, y) {
    const eraserSize = 10;
    mainctx.beginPath();
    mainctx.fillStyle = 'white';
    mainctx.fillRect(x, y, eraserSize, eraserSize);
}

function drawImg() {
    var input = document.getElementById("file-upload");
    if (input.files.length > 0) {
        var img = new Image(),
            f = input.files[0],
            url = window.URL || window.webkitURL,
            src = url.createObjectURL(f);

        img.src = src;
        img.onload = function () {
            mainctx.drawImage(img, 0, 0);
            url.revokeObjectURL(src);
        };
    }
    input.value = "";
}
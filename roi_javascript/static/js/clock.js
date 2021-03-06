
var canvas1 = document.getElementById('canvas1'),
    context1 = canvas1.getContext('2d'),
    canvas2 = document.getElementById('canvas2'),
    context2 = canvas2.getContext('2d'),
    FONT_HEIGHT = 15,
    MARGIN = 35,
    HAND_TRUNCATION = canvas1.width/25,
    HOUR_HAND_TRUNCATION = canvas1.width/10,
    NUMERAL_SPACING = 20,
    RADIUS = canvas1.width/2 - MARGIN,
    HAND_RADIUS = RADIUS + NUMERAL_SPACING;

// Functions.....................................................
function drawCircle() {
    context1.beginPath();
    context1.arc(canvas1.width/2, canvas1.height/2,
        RADIUS, 0, Math.PI*2, true);
    context1.stroke();
}

function drawNumerals() {
    var numerals = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ],
        angle = 0,
        numeralWidth = 0;
    numerals.forEach(function(numeral) {
        angle = Math.PI/6 * (numeral-3);
        numeralWidth = context1.measureText(numeral).width;
        context1.fillText(numeral,
            canvas1.width/2  + Math.cos(angle)*(HAND_RADIUS) - numeralWidth/2,
            canvas1.height/2 + Math.sin(angle)*(HAND_RADIUS) + FONT_HEIGHT/3);
    });
}

function drawCenter() {
    context1.beginPath();
    context1.arc(canvas1.width/2, canvas1.height/2, 5, 0, Math.PI*2, true);
    context1.fill();
}

function drawHand(loc, isHour,color) {
    var angle = (Math.PI*2) * (loc/60) - Math.PI/2,
        handRadius = isHour ? RADIUS - HAND_TRUNCATION-HOUR_HAND_TRUNCATION
            : RADIUS - HAND_TRUNCATION;
    context2.beginPath();
    context2.strokeStyle = color;
    context2.moveTo(canvas2.width/2, canvas2.height/2);
    context2.lineTo(canvas2.width/2  + Math.cos(angle)*handRadius,
        canvas2.height/2 + Math.sin(angle)*handRadius);
    context2.stroke();
}



function drawHands() {
    context2.clearRect(0,0,canvas2.width,canvas2.height);
    var date = new Date,
        hour = date.getHours();
    hour = hour > 12 ? hour - 12 : hour;
    drawHand(hour*5 + (date.getMinutes()/60)*5, true, "#FF0000");
    drawHand(date.getMinutes(), false, "#00FF00");
    drawHand(date.getSeconds(), false, "#0000FF");
}



function drawClock() {
    drawCircle();
    drawCenter();
    drawNumerals();
}

// Initialization................................................

  context1.font = FONT_HEIGHT + 'px Arial';
  drawHands();
  drawClock();
  loop = setInterval(drawHands, 1000);

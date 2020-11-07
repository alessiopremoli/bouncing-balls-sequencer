speedX = 2;
speedY = 3;
circles = [];
splittedWidth = [];
splittedHeight = [];
notes = (new Array(12)).fill(1).map((v, i) => v = +i + 1);
octave = '3';
timePressed = 0;
MIN_RADIUS = 4;
MAX_RADIUS = 100;

function setup() {
    createCanvas(1200, 600);
    notes.forEach(n => {
        splittedWidth.push({
            start: (width / 12) * (n - 1),
            end: (width / 12) * n,
            note: n
        });

        splittedHeight.push({
            start: (height / 12) * (n - 1),
            end: (height / 12) * n,
            note: n
        })
    });
}

function draw() {
    background(255, 0);
    clear();
    for (i = 0; i < circles.length; i++) {
        // console.warn(circles[i]);
        circles[i] = drawBall(circles[i].x, circles[i].y, circles[i].speedX, circles[i].speedY, circles[i].radius);
    }
}

function drawBall(xCo, yCo, speedXCo, speedYCo, radiusCo) {
    // Add the current speed to the x location.
    xCo = xCo + speedXCo;
    yCo = yCo + speedYCo

    let selectedNote;
    if ((xCo >= width - radiusCo / 2) || (xCo <= radiusCo / 2)) {
        // If the object reaches either edge, multiply speed by -1 to turn it around.
        speedXCo = speedXCo * -1;
        selectedNote = splittedHeight.filter(el => yCo >= el.start && yCo < el.end)[0];
    }

    if ((yCo >= height - radiusCo / 2) || (yCo <= radiusCo / 2)) {
        // If the object reaches either edge, multiply speed by -1 to turn it around.
        speedYCo = speedYCo * -1;
        selectedNote = splittedWidth.filter(el => xCo >= el.start && xCo < el.end)[0];

    }

    if (selectedNote) {
        let hw = width / 2;
        pan = (xCo - hw) / hw;

        synth = winterSynth(pan, map(radiusCo, MIN_RADIUS, MAX_RADIUS, -6, 0));
        synth.triggerAttackRelease(`${mapNumberToNoteWinterAirport(selectedNote.note, octave)}`, "4n");
    }

    stroke(0, 120);
    fill(175, 120);
    ellipse(xCo, yCo, radiusCo, radiusCo);
    return { x: xCo, y: yCo, speedX: speedXCo, speedY: speedYCo, radius: radiusCo }
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        timePressed = millis();
    }
}

function mouseReleased() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        timePressed = millis() - timePressed;
        let xRand = random([-1, 1]);
        let yRand = random([-1, 1]);
        circles.push({
            x: mouseX,
            y: mouseY,
            speedX: xRand * speedX,
            speedY: yRand * speedY,
            radius: Math.min(map(min(timePressed, 4000), 0, 4000, MIN_RADIUS, MAX_RADIUS), width - mouseX - 1, height - mouseY - 1)
        });
    }
    return false;
}

function resetBalls() {
    circles = [];
    synthArray = [];
}
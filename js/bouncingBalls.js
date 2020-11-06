radius = 4;
speedX = 2;
speedY = 3;
circles = [];
splittedWidth = [];
splittedHeight = [];
notes = (new Array(12)).fill(1).map((v, i) => v = +i + 1);
octave = '4';

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
    background(220);
    for (i = 0; i < circles.length; i++) {
        // console.warn(circles[i]);
        circles[i] = drawBall(circles[i].x, circles[i].y, circles[i].speedX, circles[i].speedY);
    }
}

function drawBall(xCo, yCo, speedXCo, speedYCo) {
    // Add the current speed to the x location.
    xCo = xCo + speedXCo;
    yCo = yCo + speedYCo

    let selectedNote;
    if ((xCo > width - radius) || (xCo < radius)) {
        // If the object reaches either edge, multiply speed by -1 to turn it around.
        speedXCo = speedXCo * -1;
        selectedNote = splittedHeight.filter(el => yCo >= el.start && yCo < el.end)[0];
    }

    if ((yCo > height - radius) || (yCo < radius)) {
        // If the object reaches either edge, multiply speed by -1 to turn it around.
        speedYCo = speedYCo * -1;
        selectedNote = splittedWidth.filter(el => xCo >= el.start && xCo < el.end)[0];

    }

    if (selectedNote) {
        console.log();
        let hw = width / 2;
        pan = new Tone.Panner((xCo - hw) / hw);
        console.log((yCo - hw) / hw);
        synth = new Tone.Synth();
        synth.connect(pan);
        pan.toDestination();

        synth.triggerAttackRelease(`${mapNumberToNote(selectedNote.note)}${octave}`, "8n");
        synth = null;
    }

    stroke(0);
    fill(175);
    ellipse(xCo, yCo, radius, radius);
    return { x: xCo, y: yCo, speedX: speedXCo, speedY: speedYCo }
}

function mousePressed() {
    if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
        let xRand = random([-1, 1]);
        let yRand = random([-1, 1]);
        circles.push({ x: mouseX, y: mouseY, speedX: xRand * speedX, speedY: yRand * speedY });
    }
    return false;
}

function resetBalls() {
    circles = [];
}
import { winterSynth } from "./synthsFactory";
import { mapNumberToNoteWinterAirport, signum } from "./utils";
import { OCTAVE, MIN_RADIUS, MAX_RADIUS, MIN_SPEED_X, MIN_SPEED_Y, MAX_SPEED_X, MAX_SPEED_Y, SPEED_INCREMENT } from "./constants";


let speedX = MIN_SPEED_X;
let speedY = MIN_SPEED_Y;
let circles = [];
const splittedWidth = [];
const splittedHeight = [];
let notes = (new Array(12)).fill(1).map((v, i) => v = +i + 1);
let timePressed = 0;
let synth = [];

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
    for (let i = 0; i < circles.length; i++) {
        // console.warn(circles[i]);
        circles[i] = drawBall(circles[i].x, circles[i].y, circles[i].speedX, circles[i].speedY, circles[i].radius, i);
    }
}

function drawBall(xCo, yCo, speedXCo, speedYCo, radiusCo, index) {
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
        let pan = (xCo - hw) / hw;

        if (synth.length === 0 || Math.floor(index / 32) === synth.length) {
            synth.push(winterSynth(pan, map(radiusCo, MIN_RADIUS, MAX_RADIUS, -6, 0)));
            console.log(`Added synth ${Math.floor(index / 32)}; ${synth}`);
        }
        synth[Math.floor(index / 32)].triggerAttackRelease(`${mapNumberToNoteWinterAirport(selectedNote.note, OCTAVE)}`, "4n");
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
    synth = [];
}

function increaseSpeed() {
    circles.forEach((v, i, a) => {
        a[i].speedX = signum(v.speedX) * min(abs(v.speedX) + SPEED_INCREMENT, MAX_SPEED_X);
        a[i].speedY = signum(v.speedY) * min(abs(v.speedX) + SPEED_INCREMENT, MAX_SPEED_Y);
        console.log(v.speedX, v.speedY);
    })
    speedX = min(speedX + SPEED_INCREMENT, MAX_SPEED_X);
    speedY = min(speedY + SPEED_INCREMENT, MAX_SPEED_Y);
}

function decreaseSpeed() {
    circles.forEach((v, i, a) => {
        a[i].speedX = signum(v.speedX) * max(abs(v.speedX) - SPEED_INCREMENT, MIN_SPEED_X);
        a[i].speedY = signum(v.speedY) * max(abs(v.speedX) - SPEED_INCREMENT, MIN_SPEED_Y);
        console.log(v.speedX, v.speedY);
    })
    speedX = max(speedX - SPEED_INCREMENT, MIN_SPEED_X);
    speedY = max(speedY - SPEED_INCREMENT, MIN_SPEED_Y);
}

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.mouseReleased = mouseReleased;
window.resetBalls = resetBalls;
window.increaseSpeed = increaseSpeed;
window.decreaseSpeed = decreaseSpeed;
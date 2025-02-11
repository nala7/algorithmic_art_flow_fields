const num = 1;
const noiseScale = 0.01;
const particles = [];
let currentColor;  
let colorChange = 0.5;
let currentIteration = 0; 

function setup() {
    createCanvas(1550, 900);
    colorMode(HSB);
    currentColor = color(0, 0, 100); // Set initial color
    background(0, 0, 0);

    for (let i = 0; i < num; i++) {
        particles.push(createVector(random(width), random(height)));
    }
}

function draw() {
    if (currentIteration % 3 === 0) {
        for (let i = 0; i < num; i++) {
            particles.push(createVector(random(width), random(height)));
        }
    }

    background(0, 0, 0, 0.01);

    for (let i = 0; i < particles.length; i++) {
        // Gradually change hue over time
        // let hueValue = (frameCount * 0.5) % 360; // Change hue dynamically
        // stroke(hueValue, 100, 100); // Set color with varying hue
        stroke(currentColor);
        let p = particles[i];
        point(p.x, p.y);
        let n = noise(p.x * noiseScale, p.y * noiseScale);
        let a = TAU * n;
        p.x += cos(a);
        p.y += sin(a);

        if (!onScreen(p)) {
            p.x = random(width);
            p.y = random(height);
        }
    }

    currentIteration++; // Increment iteration count
}

function mousePressed() {
    noiseSeed(millis());
}

function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

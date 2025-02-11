let audioContext, analyser, dataArray, sound;
let num = 1;
let noiseScale = 0.01;
let particles = [];
let currentColor;
let currentIteration = 0;
let isPlaying = false;
let baseSpeed = 1; // Default movement speed
let lastAveFrequency = 0; 

// Load and play an audio file
function preload() {
    soundFormats('mp3');
    sound = loadSound("Cornfield_Chase.mp3", soundLoaded);
}

// Ensure user interaction before playing audio
function soundLoaded() {
    console.log("Audio loaded. Click to start.");
}

function setup() {
    createCanvas(1550, 900);
    colorMode(HSB);
    currentColor = color(0, 0, 100);
    background(0, 0, 0);

    for (let i = 0; i < num; i++) {
        particles.push(createParticle());
    }
}

function draw() {
    if (!isPlaying) return; // Wait until audio starts

    background(0, 0, 0, 0.01);

    if (analyser) {
        analyser.getByteFrequencyData(dataArray);

        let avgFrequency = getAverageFrequency(dataArray);
        
        // Increase movement speed based on audio intensity
        let speedFactor = map(avgFrequency, 0, 60, 0.1, 5);
        baseSpeed = speedFactor;

        // Change noise strength dynamically based on frequency
        noiseScale = map(avgFrequency, 0, 60, 0.005, 0.001);

        // Change color dynamically
        let hueValue = map(avgFrequency, 0, 60, 360, 0);
        currentColor = color(hueValue, 100, 100);

        console.log(avgFrequency);

        if (currentIteration % 15 === 0 && avgFrequency > 30) {
            for (let i = 0; i < num; i++) {
                particles.push(createParticle());
            }
        }
    
        if (!isIncreasing(lastAveFrequency, avgFrequency) && particles.length > 1000) {
            for (let i = 0; i < num; i++) {
                particles.pop();
                particles.pop();
                particles.pop();
            }
        }

        lastAveFrequency = avgFrequency;
    }

    if (currentIteration % 15 === 0) {
        for (let i = 0; i < num; i++) {
            particles.push(createParticle());
        }
    }

    for (let i = 0; i < particles.length; i++) {
        stroke(currentColor);
        let p = particles[i];
        point(p.x, p.y);

        let n = noise(p.x * noiseScale, p.y * noiseScale);
        let angle = TAU * n;
        
        // Move particles based on audio
        p.x += cos(angle) * baseSpeed;
        p.y += sin(angle) * baseSpeed;

        if (!onScreen(p)) {
            particles[i] = createParticle(); // Respawn off-screen particles
        }
    }

    currentIteration++;
}

// Start music on user interaction
function mousePressed() {
    if (!isPlaying) {
        setupAudio();
        sound.loop();
        isPlaying = true;
        console.log("Audio started.");
    }
    noiseSeed(millis());
}

// Check if particle is on screen
function onScreen(v) {
    return v.x >= 0 && v.x <= width && v.y >= 0 && v.y <= height;
}

// Create a new particle
function createParticle() {
    return createVector(random(width), random(height));
}

function setupAudio() {
    audioContext = getAudioContext();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;

    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    sound.connect(analyser);
    analyser.connect(audioContext.destination);
}

// Get average frequency from frequency data
function getAverageFrequency(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum / array.length;
}


function isIncreasing(lastAveFrequency, avgFrequency) {
    return lastAveFrequency < avgFrequency;
}
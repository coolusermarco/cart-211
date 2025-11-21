// references used: https://www.youtube.com/watch?v=S9tFImRyL-8
//https://www.youtube.com/watch?v=MA_aFQV9vss
//https://editor.p5js.org/natayie/sketches/044WMWeri
//GEN AI for the quotations in whisperText (I'll change them soon i had to focus on the rest of the codes)

"use strict";

let bgImg;
let whispers = [];
let character = { x: 300, y: 500, size: 100, speed: 5 };
let characterImg;
let mageImg;
let mage2Img;
let bgMusic;

let whisperTexts = [
  "The soil hums with old names, best left buried...",
  "Something watches from beneath the petals.",
  "You hear it breathing, slow and patient.",
  "Every path leads somewhere you shouldn't go.",
  "The flowers whisper, but not in words you know.",
  "Roots curl around the memories of the lost.",
  "A shadow stirs where no wind should move.",
  "You step softly… but the garden already knows you.",
  "The vines remember more than they should.",
  "Light bends differently here, as if afraid."
];

function preload() {
  bgImg = loadImage("backgroundp3.jpg");
  mageImg = loadImage("mage.png");
  mage2Img = loadImage("mage.png");
  characterImg = loadImage("boy.png");
  bgMusic = loadSound("musicpage2.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont("Cinzel");
  textAlign(LEFT, CENTER);
  textSize(22);
}

function draw() {
  // draw background
  image(bgImg, 0, 0, width, height);

  // draw the mage in chat bubble
  if (mage2Img) {
    image(mage2Img, 300, 500, 300, 250);
  }

  drawCharacter();
  moveCharacter();

  // draw whispers
  for (let i = whispers.length - 1; i >= 0; i--) {
    let w = whispers[i];

    // subtle background for whisper text
    fill(0, 0, 0, 100);
    let bubbleWidth = textWidth(w.text) + 100;
    let bubbleHeight = 60;
    rect(w.x - 40, w.y - bubbleHeight / 2, bubbleWidth, bubbleHeight, 15);

    // mage image beside whisper
    if (mageImg) {
      image(mageImg, w.x - 30, w.y - 25, 50, 50);
    }

    // whisper text
    fill(220, 255, 230, w.alpha);
    text(w.text, w.x + 40, w.y);

    // fade out
    w.alpha -= 2;
    if (w.alpha <= 0) whispers.splice(i, 1);
  }
}

function drawCharacter() {
  fill(210, 255, 210, 180);
  image(characterImg, character.x, character.y, character.size, character.size);
}

function moveCharacter() {
  if (keyIsDown(87)) character.y -= character.speed; // W
  if (keyIsDown(83)) character.y += character.speed; // S
  if (keyIsDown(65)) character.x -= character.speed; // A
  if (keyIsDown(68)) character.x += character.speed; // D
  character.x = constrain(character.x, 0, width);
  character.y = constrain(character.y, 0, height);
}

function mousePressed() {

    if (!bgMusic.isPlaying()) {
    bgMusic.loop();
    bgMusic.setVolume(0.4);
  }

  let randomText = random(whisperTexts);
  let randomX = mouseX + random(-80, 80);
  let randomY = mouseY + random(-50, 50);

  whispers.push({
    text: randomText,
    x: randomX,
    y: randomY,
    alpha: 255
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

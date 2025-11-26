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
let snakeeyesImg;
let muteButton;
let musicMuted = false;

let whisperTexts = [
  "...???"
];

function preload() {
  bgImg = loadImage("backgroundp4.jpg");
  mageImg = loadImage("mage.png");
  mage2Img = loadImage("mage.png");
  characterImg = loadImage("boy.png");
  bgMusic = loadSound("musicpage4.mp3");
  snakeeyesImg = loadImage("snakeeyes.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont("Cinzel");
  textAlign(LEFT, CENTER);
  textSize(22);

  // mute button
  
  muteButton = createButton("Mute Music");

  muteButton.style("position", "absolute");
  muteButton.style("z-index", "9999");
  muteButton.style("padding", "10px 20px");
  muteButton.style("font-size", "16px");
  muteButton.style("background", "rgba(0,0,0,0.6)");
  muteButton.style("color", "#fff");
  muteButton.style("border", "2px solid #fff");
  muteButton.style("border-radius", "8px");
  muteButton.style("cursor", "pointer");

  muteButton.position(20, 20);
  muteButton.mousePressed(toggleMusic);
}

function draw() {
  // draw background
  image(bgImg, 0, 0, width, height);

  // draw the mage in chat bubble
  if (mage2Img) {
    image(mage2Img, 800, 630, 300, 300);
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
    if (snakeeyesImg) {
      image(snakeeyesImg, w.x - 30, w.y - 25, 50, 50);
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

  if (!bgMusic.isPlaying() && !musicMuted) {
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

//mute button
function toggleMusic() {
  if (musicMuted) {
    //ON
    if (!bgMusic.isPlaying()) {
      bgMusic.loop();
      bgMusic.setVolume(0.4);
    }
    muteButton.html("Mute Music");
    musicMuted = false;
  } else {
    //OFF
    bgMusic.stop();
    muteButton.html("Unmute Music");
    musicMuted = true;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

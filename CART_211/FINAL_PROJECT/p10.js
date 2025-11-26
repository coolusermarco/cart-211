// references used: https://www.youtube.com/watch?v=S9tFImRyL-8
// https://www.youtube.com/watch?v=MA_aFQV9vss
// https://editor.p5js.org/natayie/sketches/044WMWeri
// https://www.youtube.com/watch?v=cnRD9o6odjk 

"use strict";

let bgImg;
let character = { x: 300, y: 500, size: 100, speed: 5 };
let characterImg;
let mage2Img;
let bgMusic;

let mage2HP = 10;
let mage2 = {
  x: 160,
  y: 100,
  w: 800,
  h: 800
};

let muteButton;
let musicMuted = false;

function preload() {
  bgImg = loadImage("backgroundp10.jpg");
  mage2Img = loadImage("goblinking.png");
  characterImg = loadImage("boy.png");
  bgMusic = loadSound("musicpage10.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont("Cinzel");
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
  image(bgImg, 0, 0, width, height);

  if (mage2Img && mage2HP > 0) {
    image(mage2Img, mage2.x, mage2.y, mage2.w, mage2.h);

    // HP Bar background
    fill(0, 0, 0, 150);
    rect(mage2.x + mage2.w / 2 - 80, mage2.y - 50, 160, 30, 10);

    // HP text
    fill(255);
    textAlign(CENTER, CENTER);
    text(`HP: ${mage2HP}`, mage2.x + mage2.w / 2, mage2.y - 35);
    textAlign(LEFT, CENTER);
  }

  drawCharacter();
  moveCharacter();
}

function drawCharacter() {
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

  if (mage2HP > 0) {
    let withinX = mouseX > mage2.x && mouseX < mage2.x + mage2.w;
    let withinY = mouseY > mage2.y && mouseY < mage2.y + mage2.h;

    if (withinX && withinY) {
      mage2HP--;

      if (mage2HP <= 0) {
        mage2HP = 0;
      }
    }
  }
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

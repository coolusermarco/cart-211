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

let goblins = [];
let goblinImg;
let maxGoblins = 5; 
let spawnInterval = 180; 


function preload() {
  bgImg = loadImage("backgroundp6.jpg");
  mageImg = loadImage("mage.png");
  mage2Img = loadImage("mage.png");
  characterImg = loadImage("boy.png");
  bgMusic = loadSound("musicpage2.mp3");

  goblinImg = loadImage("goblin.png");
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
    image(mage2Img, 500, 630, 300, 300);
  }

  drawCharacter();
  moveCharacter();

  if (frameCount % spawnInterval === 0 && goblins.length < maxGoblins) {
    spawnGoblin();
  }
  drawGoblins();

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

function spawnGoblin() {
  let size = random(70, 130);
  let margin = 100;

  // keep them mostly in the lower half of the screen
  let x = random(margin, width - margin);
  let y = random(height / 2, height - margin);

  goblins.push({
    x: x,
    y: y,
    size: size
  });
}

function drawGoblins() {
  if (!goblinImg) return;
  imageMode(CENTER);
  for (let g of goblins) {
    image(goblinImg, g.x, g.y, g.size, g.size);
  }
  imageMode(CORNER);
}

function mousePressed() {
  for (let i = goblins.length - 1; i >= 0; i--) {
    let g = goblins[i];
    // simple hitbox
    let d = dist(mouseX, mouseY, g.x, g.y);
    if (d < g.size / 2) {
      // remove goblin from array (killed)
      goblins.splice(i, 1);
    }
  }

  // music on first click
  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
    bgMusic.setVolume(0.4);
  }

  // existing whisper behavior
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

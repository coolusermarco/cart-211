// references used: https://www.youtube.com/watch?v=S9tFImRyL-8
//https://www.youtube.com/watch?v=MA_aFQV9vss
//https://editor.p5js.org/natayie/sketches/044WMWeri
//GEN AI for the quotations in whisperText (I'll change them soon i had to focus on the rest of the codes)

"use strict";

let bgImg;
let character = { x: 300, y: 500, size: 100, speed: 5 };
let characterImg;
let mageImg;
let mage2Img;
let bgMusic;

// goblins
let goblins = [];
let goblinImg;
let spawnInterval = 90; // how often they appear (frames)
let maxGoblins = 10;    // max goblins on screen

let whisperTexts = [
  "...A crumb of you… that’s all I ask…",
  "...Let me keep a little trace…",
  "...Share your habits… traveler…",
  "...Let me observe… a bit closer…",
  "...Give me a taste… of what you are…"
];


function preload() {
  bgImg = loadImage("backgroundp6.jpg");
  mageImg = loadImage("goblin.png");
  mage2Img = loadImage("mage.png");
  characterImg = loadImage("boy.png");
  bgMusic = loadSound("musicpage2.mp3");
  goblinImg = loadImage("goblin.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textFont("Cinzel");
  textSize(22);
}

function draw() {
  image(bgImg, 0, 0, width, height);

  // static mage in the corner
  if (mage2Img) {
    image(mage2Img, 500, 630, 300, 300);
  }

  drawCharacter();
  moveCharacter();

  // spawn goblins regularly
  if (frameCount % spawnInterval === 0 && goblins.length < maxGoblins) {
    spawnGoblin();
  }

  drawGoblins();
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

// spawn one goblin at a random place, with its own text
function spawnGoblin() {
  let size = random(70, 130);
  let margin = 120;

  let x = random(margin, width - margin);
  let y = random(height / 2, height - margin);

  let randomText = random(whisperTexts);

  goblins.push({
    x: x,
    y: y,
    size: size,
    text: randomText
  });
}

// draw all goblins + their chat bubbles
function drawGoblins() {
  if (!goblinImg) return;

  for (let g of goblins) {
    // goblin sprite
    imageMode(CENTER);
    image(goblinImg, g.x, g.y, g.size, g.size);

    // chat bubble above goblin
    let txt = g.text;
    textSize(18);
    let padding = 16;
    let bubbleWidth = textWidth(txt) + padding * 2;
    let bubbleHeight = 45;

    let bubbleX = g.x - bubbleWidth / 2;
    let bubbleY = g.y - g.size / 2 - bubbleHeight - 10;

    // bubble background
    fill(0, 0, 0, 160);
    rect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 10);

    // small mage icon on left side of bubble (optional)
    if (mageImg) {
      imageMode(CORNER);
      image(mageImg, bubbleX + 5, bubbleY + 5, 32, 32);
    }

    // text inside bubble
    fill(220, 255, 230);
    textAlign(LEFT, CENTER);
    text(txt, bubbleX + 45, bubbleY + bubbleHeight / 2);
  }

  // reset text settings (just in case)
  textAlign(LEFT, CENTER);
  textSize(22);
  imageMode(CORNER);
}

function mousePressed() {
  // kill goblin if clicked
  for (let i = goblins.length - 1; i >= 0; i--) {
    let g = goblins[i];
    let d = dist(mouseX, mouseY, g.x, g.y);
    if (d < g.size / 2) {
      goblins.splice(i, 1);
      // stop after killing one, so one click removes only one goblin
      break;
    }
  }

  // start music on first click
  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
    bgMusic.setVolume(0.4);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

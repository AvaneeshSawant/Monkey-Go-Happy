//Global Variables
var player, player_running
var banana, bananaImage, foodGroup;
var obstacleGroup, obstacleImage;
var scene, sceneImg;
var score;


function preload() {
  sceneImg = loadImage("jungle.png")

  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
}

function setup() {
  createCanvas(400, 400);

  scene = createSprite(200, 200, 400, 400);
  scene.addImage("jungle", sceneImg);
  scene.x = scene.width / 2;
  scene.velocityX = -4
  scene.scale = 2;

  ground = createSprite(200, 350, 400, 20)
  ground.visible = false;

  player = createSprite(50, 350, 20, 50);
  player.addAnimation("running", player_running);
  player.scale = 0.10;

  foodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
}

function draw() {
  background(220);

  if (scene.x < 0) {
    scene.x = scene.width / 2;
  }

  if (keyDown("space") && player.y > 310) {
    player.velocityY = -10;  
  }

  player.collide(ground)

  player.velocityY = player.velocityY + 0.5;

  if (foodGroup.isTouching(player)) {
    foodGroup.destroyEach();
    score = score + 2;
  }

  switch (score) {
    case 10:
      player.scale = 0.12;
      break;
    case 20:
      player.scale = 0.14;
      break;
    case 30:
      player.scale = 0.16;
      break;
    case 40:
      player.scale = 0.18;
      break;
    default:
      break;
  }

  spawnBanana();

  if (obstacleGroup.isTouching(player)) {
    player.scale = 0.10;
  }

  drawSprites();

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 50, 50);
}

function spawnBanana() {
  if (frameCount % 60 === 0) {
    //creating variable for the bananas
    banana = createSprite(400, 160, 30, 30);

    banana.addImage("banana", bananaImage);
    banana.scale = 0.05;

    //giving a random y position for the food
    banana.y = random(150, 200);

    //giving X velocity to the food
    banana.velocityX = -5;

    //providing a lifetime for the food
    banana.lifetime = 200;

    //adding each banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles() {
  if (framaeCount % 60 === 0) {
    var obstacle = createSprite(400, 180, 40, 30);
    obstacle.velocityX = -5;
    obstacle.addImage("stone", obstacleImage);

    //assign scale and lifetime to the obstacle
    obstacle.scale = 0.20;
    obstacle.lifetime = 80;

    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
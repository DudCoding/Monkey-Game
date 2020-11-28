var monkey , monkey_running;
var banana ,ground,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup, bananaGroup;
var score;
var gameState = 1;
var PLAY = 1;
var END = 0
var survivalTime = 0, score = 0;
function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}
function setup() {
  createCanvas(600,600);
  monkey = createSprite(50,500,50,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  ground = createSprite(450,550,900,20);
  ground.velocityX = -3;
  
  
}
function draw() {
  background("white");

  text("Survival Time: " + survivalTime, 50,200);
  text("Score: " + score, 50, 300);
  if(gameState===PLAY){
  survivalTime = Math.ceil(frameCount/frameRate());

  bananas();
  obstacles();
  
  console.log(frameCount);
  
  if(keyDown("space") && monkey.y > 450){
    monkey.velocityY = -12;
  }
  
  if(ground.x === 300){
    ground.x = 450;
  }
  
  monkey.velocityY = monkey.velocityY + 0.7;  
  monkey.collide(ground);
    
  if(monkey.isTouching(obstacleGroup)){
    gameState = 0;
  }
  if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score = score + 1;
  }
  
  
  } 
  
  if(gameState === END){
    bananaGroup.destroyEach();
    obstacleGroup.destroyEach();
    obstacleGroup.setVelocityXEach = 0;
    bananaGroup.setVelocityXEach = 0;
    monkey.velocityY = 0;
    ground.velocityX = 0;
  }
  drawSprites();
}
function bananas(){
  if(frameCount%80===0){
    banana = createSprite(600,200,50,50);
    banana.y = Math.round(random(300,350));
    banana.scale = 0.1; 
    banana.velocityX = -3;
    banana.addImage(bananaImage);
    banana.lifetime = 200;
    bananaGroup.add(banana);
  } 
}
function obstacles(){
  if(frameCount % 300 === 0){
    obstacle = createSprite(600, 525,50,50);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -8;
    obstacle.lifetime = 75;
    obstacleGroup.add(obstacle);
  }
}
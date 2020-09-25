var gameState = "start";
var sprite,backG;
var count = 0;
var startPage;
var health1,health2,health3;
var healthCount = 3;
var number = 3;
var lives  = 5;
var restart;
function preload(){
run = loadAnimation("tenor-unscreen.gif");
backImg = loadImage("1.jpg");
animal1 = loadAnimation("puma.gif");
healthImg = loadImage("OIP.png");
halfHealthImg = loadImage("OIP(1).png");
animal2 = loadAnimation("shiraImg.gif");
}

function setup(){
  createCanvas(displayWidth+10,displayHeight-130);
  backG = createSprite(600,50,10,10);
  backG.addImage(backImg);
  backG.scale = 2.4;

  sprite = createSprite(1110,450,50,50);
  sprite.addAnimation("running",run);
  sprite.scale = 0.8;
  rectMode(CENTER);
  animalGroup = new Group();


  //lives
  heart1=createSprite(1000,50,10,10);
  heart1.addImage(healthImg)
  heart1.scale = 0.3;

  heart2=createSprite(1075,50,10,10);
  heart2.addImage(healthImg);
  heart2.scale = 0.3

  heart3=createSprite(1150,50,10,10);
  heart3.addImage(healthImg);
  heart3.scale = 0.3;

  heart4=createSprite(1225,50,10,10);
  heart4.addImage(healthImg)
  heart4.scale = 0.3;

  
}


function draw() {
  rectMode(CENTER);
  if(gameState === "start"){
    image(backImg,displayWidth+10,displayHeight-130,1000,400);
    count = 0;
    fill("red");
    textSize(35);
    text("The Stampede",width/2-100,100)
    fill("green");
    textSize(25);
    text("press SPACEBAR to play",width/2-100,height/2);
    text("Use Up And Down Arrow Keys To Move",width/2-200,height/2+50)
    text("Warning!If you fall down then you wil lose!",width/2-210,height/2+150)
    pressed();
  }
   if(gameState === "play"){
     
     background(255,255,255);  

  if(backG.x<650){
    backG.x = width/2;
    backG.velocityX = -1;
  }
  if(background.velocityX>0){
    sprite.addAnimation("running",run)
  }  
    sprite.velocityX = 0;
    backG.velocityX = -1;
    sprite.addAnimation("running",run)
  
  if(keyWentUp(RIGHT_ARROW)){
    sprite.velocityX = 0;
    backG.velocityX = 0;
    }
    if(keyWentUp(UP_ARROW)){
     sprite.velocityY = 2;
    }
    if(keyWentDown(UP_ARROW)){
     sprite.velocityY = -2;
    }
    if(keyWentDown(DOWN_ARROW)){
     sprite.y = sprite.y+5;
    }
    if(sprite.y>650){
      lives = lives-5;
    }
 // camera.position.y = sprite.y-150;
    fill("green");
   //ellipse(sprite.x,sprite.y,80,80);
   /*if(healthcount = 3 && animalGroup.isTouching(sprite)){
   healthCount = 2;
   health3.destroy();
   }
   else if(healthCount = 2 && animalGroup.isTouching(sprite)){
    healthCount = 1;
    health2.destroy();
  }
   
  else if(healthCount =  1 && animalGroup.isTouching(sprite)){
    healthCount = 0;
    health1.destroy();
    sprite.destroy();
   }
   if(healthCount<3){
     health1.destroy();
   }
   else if(healthCount<2){
      health2.destroy();
   }
   else if(healthCount<1){
      health1.destroy(); 
   }*/
  Lives();
  for (var i = 0; i < animalGroup.maxDepth(); i++) {
  
    var animal = animalGroup.get(i);
    
    if (animal != null && animal.isTouching(sprite)) {
       lives = lives-0.5;
     if(animal.isTouching(sprite)){
     //sprite.destroy();
     animal.destroy();  
    
    }
     
    if(lives == 4.5){
      lives = lives-1;
    }   //gameState = "end";
    if(lives == 3.5){
      lives = lives-0.5;
    }  
  }  
  }

  drawSprites();
  fill("red");  
  stroke('red');
  strokeWeight(3)
  textSize(25);
  text("Time :" +count+" seconds",50,50);

      
 animals();
//text("life"+lives,50,300)
 count = Math.round(frameCount/5);
 console.log(count);

 
}

if(gameState === "end"){
 
    fill("red");
    textSize(45);
    text("Game Over",width/2-150,height/2);
    fill("white");
    textSize(25)
    text("You survived for "+count+" seconds",width/2-190,height/2+50);
     animalGroup.visible = false;  
 

  }
}

function animals(){


  if(frameCount % 96 === 0) {
    var obstacle = createSprite(10,500,10,40);
    obstacle.y = random(300,500);
    obstacle.velocityX = 6;
    var rand = Math.round(random(1,2));
    switch(rand){
     case  1:obstacle.addAnimation("chasing",animal1);
          break;
     case  2:obstacle.addAnimation("chasing",animal2);
          break;
          default : break;
    }
  
     obstacle.scale = random(0.5,0.8);;
    obstacle.setCollider("rectangle",0,0,300,100);
     obstacle.lifetime = 225;
    animalGroup.add(obstacle);
    
 }
}
function pressed(){
  if(keyCode === 32){
    gameState = "play";
    count = 0;
  }  
  
  

}
function stopCount(){
  count = 0;
}
function Lives(){
  
  if(lives == 3.5){
    heart4.visible = false;
  }
 if(lives == 3){
   heart4.visible = false;
 }

   if(lives == 2.5){
  
      heart3.addImage(halfHealthImg);
  }
  if(lives == 2){
      heart3.visible = false;
  }
   if(lives == 1.5){
     heart2.addImage(halfHealthImg);
   }
   if(lives == 1){
     heart2.visible = false;
   }
   
   if(lives == 0.5){
    heart1.addImage(halfHealthImg);
  }
  
   if(lives == 0){
    sprite.destroy();
     heart1.visible = false;
     gameState = "end";
     if(keyWentDown(UP_ARROW)) {
      gameState = "play";  
 
    }
    }
}
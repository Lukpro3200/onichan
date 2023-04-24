var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;
var nubesita, aielaguita;
var dactus,dactos2,dactus3,dactus4,dactus5,dactus6;
var play = 1;
var end = 0;
var gameState = play;
var cactusero,aguaesponjada;
var score;
var dinopinchadito
var pinchasteadino
var yanolopinches
var confioenti
var jumpy
var mueriste
var lluka
var escor = 0;

function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  aielaguita = loadImage("cloud.png");
 dactus = loadImage("obstacle1.png");
 dactus2 = loadImage("obstacle2.png");
 dactus3 = loadImage("obstacle3.png");
 dactus4 = loadImage("obstacle4.png");
 dactus5 = loadImage("obstacle5.png");
 dactus6 = loadImage("obstacle6.png");
 pinchasteadino = loadImage("gameOver.png");
 confioenti = loadImage("restart.png");

 jumpy = loadSound("jump.mp3");
 mueriste = loadSound("die.mp3");
lluka = loadSound("checkpoint.mp3")
}

function setup() {

  createCanvas(windowWidth,windowHeight)


  //crear sprite de trex
  trex = createSprite(50,height/2,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  //crear sprite de suelo
  ground = createSprite(width/2,height/2,width,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  //crear sprite de suelo invisible
  invisibleGround = createSprite(width/2,height/2 + 10,width,10);
  invisibleGround.visible = false;

  dinopinchadito = createSprite(width/2,height/2 - 150);
  dinopinchadito.addImage(pinchasteadino);

  yanolopinches = createSprite(width/2,height/2 - 100);
  yanolopinches.addImage(confioenti);
  yanolopinches.scale = 0.5
  
  //generar números aleatorios
  var rand =  Math.round(random(1,100))
  console.log(rand)


  cactusero = new Group();
  aguaesponjada = new Group(); 
  
  trex.setCollider("rectangle",0,0,70,84);
  trex.debug = false
  escor = 0
}

function draw() {
  //establecer color de fondo
  background(180);
  text("puntos: " + escor,width/2,height/2 - 300)
  
  console.log(trex.y)
  
  if(gameState === play){
    escor = escor + Math.round(getFrameRate()/60);
    ground.velocityX = -4;
    if(escor > 0 && escor % 100 === 0){
      lluka.play()
    }
    if(touches.length > 0 || keyDown("space")&& trex.y >= height/2 - 105) {
      trex.velocityY = -10;
      jumpy.play();
      touches = []
      
    }
    trex.velocityY = trex.velocityY + 0.8
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    spawnClouds();
    noaguita();
  
    if(cactusero.isTouching(trex)){
  gameState = end;
  mueriste.play();
    }
  dinopinchadito.visible = false;
  yanolopinches.visible = false;
  }
  
  
  else if(gameState === end){
  ground.velocityX = 0;
  cactusero.setVelocityXEach(0);
  aguaesponjada.setVelocityXEach(0);
if(touches.length > 0 || keyDown("space")){
  yanomatesadino();
  touches = []
}
  trex.changeAnimation("collided",trex_collided);
  dinopinchadito.visible = true;
  yanolopinches.visible = true;
  trex.velocityY = 0;
  if(mousePressedOver(yanolopinches)){
    yanomatesadino(); 
  }
  } 
  
  //evitar que el trex caiga
  trex.collide(invisibleGround);

  //aparecer nubes
  
  drawSprites();
}

//función para aparecer las nubes
function spawnClouds(){
 //escribir aquí el código 

if(frameCount %60 === 0){
nubesita = createSprite(1200,20,40,30);
nubesita.velocityX =-5
nubesita.addImage(aielaguita);
nubesita.y = Math. round(random(width/2 - 600,width/2 - 450));
nubesita.depth = trex.depth;
trex.depth = trex.depth +1;

nubesita.lifetime = 111;
aguaesponjada.add(nubesita);
 }
 }
function noaguita(){

  if(frameCount %60 === 0){

verdeespinoso = createSprite(1200,height/2 - 10,40,70);
verdeespinoso.velocityX =-5;
verdeespinoso.scale = 0.6
rand = Math.round(random(1,6));
switch(rand){
 case 1: verdeespinoso.addImage(dactus);
 break;
 case 2: verdeespinoso.addImage(dactus2);
 break;
 case 3: verdeespinoso.addImage(dactus3);
 break;
 case 4: verdeespinoso.addImage(dactus4);
 break;
 case 5: verdeespinoso.addImage(dactus5);
 break;
 case 6: verdeespinoso.addImage(dactus6);
}
cactusero.add(verdeespinoso);
  }
}

function yanomatesadino(){
  gameState = play;
  dinopinchadito.visible = false;
  yanolopinches.visible = false;
  cactusero.destroyEach();
  aguaesponjada.destroyEach();
  escor = 0;
  trex.changeAnimation("running",trex_running)
}






















































































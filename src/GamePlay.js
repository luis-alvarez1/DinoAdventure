var game = new Phaser.Game(1000, 418, Phaser.CANVAS, "game_block");

var GamePlay = {
  preload: function () {
    game.stage.backgroundColor = "#000000";
    game.load.image("background", "assets/img/background.png");
    game.load.image("ground", "assets/img/ground.jpeg");
    game.load.spritesheet("dinosaur", "assets/img/principal.png", 56, 47, 13);
    game.load.spritesheet("enemy1", "assets/img/enemigo1.png", 59, 46, 10);
    game.load.spritesheet("lives", "assets/img/vidas.png", 37, 32, 1);
    game.load.spritesheet("titulodino", "assets/img/titulodino.png", 257, 109, 1);
    game.load.spritesheet("tituloadventure", "assets/img/tituloadventure.png", 317, 76, 1);
    game.load.spritesheet("gameOver", "assets/img/gameOver.png", 161, 112, 1);
    game.load.spritesheet("buttonPlay", "assets/img/playGame.png", 156, 43, 1);
    game.load.spritesheet("food", "assets/img/comida.png", 50, 39, 1);
    game.load.spritesheet("boss", "assets/img/boss.png", 90, 90, 8);
    game.load.spritesheet("deathBoss", "assets/img/muerteBoss.png", 110, 91, 5);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },
  
  create: function () {
    
    
    this.background = game.add.tileSprite(0, 0, 1000, 413, "background");
    this.ground = game.add.tileSprite(0, 350, 1000, 100, "ground");
    
    this.live = game.add.sprite(10, 10, "lives");
    this.live.frame = 0;
    
    this.titleoDino = game.add.sprite(390, 50, "titulodino");
    this.titleoDino.frame = 0;
    
    this.titleoAdventure = game.add.sprite(350, 150, "tituloadventure");
    this.titleoAdventure.frame = 0;
    
    this.gameOver = game.add.sprite(440, 100, "gameOver");
    this.gameOver.frame = 0;
    this.gameOver.visible = false;

    this.food = game.add.sprite(80, 340, "food");
    this.food.anchor.setTo(0.5);
    this.food.visible = false;


    this.buttonPlay = game.add.button(430, 220, "buttonPlay",actionOnClick, this,2,1,0 );
    
    this.dino = game.add.sprite(100, 340, "dinosaur");
    this.dino.anchor.setTo(0.5);
    this.dino.frame = 12;

    this.dino.animations.add(
      "walk",
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      10,
      true
    );

    this.dino.animations.add("bite", [11], 10, true);

    this.movement = game.input.keyboard.createCursorKeys();
    this.biteKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable(this.dino);

    this.dino.body.colliderWorldBounds = true;

    this.enemy1 = this.game.add.sprite(800, 340, "enemy1");
    this.enemy1.anchor.setTo(0.5);
    this.enemy1.animations.add(
      "walking",
      [1,2,3,4,5,6,7,8,10,11,12,0,5,6,7,8],
      4,
      true
    );
    this.enemy1.animations.play("walking");
    var tween = game.add.tween(this.enemy1);
    tween.to({ x: 500 }, 7000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    
    this.boss = this.game.add.sprite(800, 318, "boss");
    this.boss.anchor.setTo(0.5);
    this.boss.visible = false;
    this.boss.animations.add(
      "walking",
      [7,6,5,4,7,6,5,4,3,2,1,0],
      4,
      true
    );
    this.boss.animations.play("walking");
    var tween = game.add.tween(this.boss);
    tween.to({ x: 500 }, 7000, Phaser.Easing.Linear.None, true, 0, 1000, true);
    
    this.deathBoss = this.game.add.sprite(800, 330, "deathBoss");
    this.deathBoss.anchor.setTo(0.5);
    this.deathBoss.visible = false;
    this.deathBoss.animations.add(
      "death",
      [4,3,2,1,0,],
      2,
      
    );  
    this.currentScore = 0;
    this.currentLive = 3;
    var style = {
      font: 'bold 20pt Arial',
      fill: 'white',
      align: 'center'
    }
    this.liveText = game.add.text(50, 12, '3', style);
    this.scoreText = game.add.text(game.width/2, 40, '0', style);

    this.play = false;
    function actionOnClick () {
      this.play = true;
      
    }

    function actionOnClick () {
      this.play = true;
      
    }
  },
  render: function(){
    game.debug.spriteBounds(this.dino);
  },
    perderVida: function(){
      this.dino = game.add.sprite(100, 340, "dinosaur");
      this.dino.anchor.setTo(0.5);
      this.dino.animations.add(
        "walk",
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        10,
        true
      );
      this.dino.animations.add("bite", [11], 10, true);
      this.currentLive-=1;
      this.liveText.text = this.currentLive;

      if (this.currentLive == 0) {
        console.log("game over");
        this.gameOver.visible = true;
        this.dino.visible = false;
      }
   },
   ganarVida: function (){
      this.currentLive-=1;
      this.liveText.text = this.currentLive;
   },
  winScore: function (){
    this.currentLive+=1;
    this.liveText.text = this.currentLive;
  },
  nextLevel: function(){
    console.log("siguiente nivel");
    this.boss.visible = true;
  },
  getBounds: function (object) {
    var x0 = object.x - Math.abs(object.width)/4;
    var y0 = object.y - object.height / 2;
    var width = Math.abs(object.width)/2;
    var height = object.height;

    return new Phaser.Rectangle(x0, y0, width, height);
  },
  isRectangleOverlapping: function (rect1, rect2) {
    //se valida si los recangulos se tocan o se sobreponen y devuelve false si no es así
    if (rect1.x > rect2.x + rect2.width || rect2.x > rect1.x + rect1.width) {
      return false;
    }
    if (rect1.y > rect2.y + rect2.height || rect2.y > rect1.y + rect1.height) {
      return false;
    }
    return true; // devuelve true si se tocan
  },
  update: function () {
    var play = this.play;
    
    if (play==true) {
      this.titleoDino.visible = false;
      this.titleoAdventure.visible = false;
      this.buttonPlay.visible = false;

      if (this.direction == "wating") {
        this.dino.frame = 12;
      }
      if (this.movement.right.isDown) {
        this.dino.scale.setTo(1);
  
        this.dino.position.x += 2;
        this.dino.animations.play("walk");
  
        if (this.direction != "right") {
          this.direction = "right";
        }
      } else if (this.movement.left.isDown) {
        this.dino.scale.setTo(-1, 1);
  
        this.dino.position.x -= 2;
        this.dino.animations.play("walk");
  
        if (this.direction != "left") {
          this.direction = "left";
        }
      } else if (this.biteKey.isDown) {
        this.dino.animations.play("bite");
        this.direction = "bite";
      } else {
        if (this.direction != "waiting") {
          this.dino.animations.stop("walk");
        }
  
        this.direction = "wating";
      }
      if(this.enemy1.visible){
        if (
          this.isRectangleOverlapping(
            this.getBounds(this.dino),
            this.getBounds(this.enemy1)
          ) &&
          this.direction == "bite"
        ) {
          console.log("enemigo muerto");
          this.enemy1.animations.stop();
          this.enemy1.frame = 9;
          if (this.enemy1.frame = 9 && this.enemy1.visible){
            this.enemy1.visible = false;  
            this.winScore();
            this.food.visible = true;
            
            
          }
          
        } else if (
          this.isRectangleOverlapping(
            this.getBounds(this.dino),
            this.getBounds(this.enemy1)
          ) &&
          this.direction != "bite"
        ) {    
          
          if ((this.enemy1.frame > 0) && (this.enemy1.frame < 5) ) {
              console.log("muerto")
              if (this.dino.visible) {
                this.dino.visible = false;
                this.perderVida(); 
              }
          }       
        }
      }
      
      if(
        this.isRectangleOverlapping(
          this.getBounds(this.dino),
          this.getBounds(this.food)
        ) &&
        this.direction == "bite"
      ) {
      if(this.food.visible){
        this.food.visible = false;
        this.nextLevel();
        this.winScore();
        this.ganarVida
        }
      }
      if(this.boss.visible){
        if (
          this.isRectangleOverlapping(
            this.getBounds(this.dino),
            this.getBounds(this.boss)
          ) &&
          this.direction == "bite"
        ) {
          console.log("enemigo muerto");
          this.boss.animations.stop();
          if (this.boss.frame = 9 && this.boss.visible){
            this.boss.visible = false;  
            this.winScore();
            this.deathBoss.visible = true;
            this.deathBoss.animations.play("death");      
          }
          
        } else if (
          this.isRectangleOverlapping(
            this.getBounds(this.dino),
            this.getBounds(this.boss)
          ) &&
          this.direction != "bite"
        ) {    
          
          if ((this.boss.frame == 0) || (this.boss.frame == 1) ) {
            if (this.dino.visible) {
              console.log("muerto");
              this.dino.visible = false;
              this.perderVida(); 
            }
          }       
        }
      }
      
     
  
      
    }
     //movimiento enemigo 1
     var limitRight = 800;
     var limitLeft = 500;
     var posicionxEnemy1 = this.enemy1.x;
     var posicionxEnemy1 = this.boss.x;
    if (posicionxEnemy1 == limitRight) {
      this.enemy1.scale.setTo(1, 1);
      this.boss.scale.setTo(1, 1);
    }
    if (posicionxEnemy1 == limitLeft) {
      this.enemy1.scale.setTo(-1, 1);
      this.boss.scale.setTo(-1, 1);
    }
  },
};

game.state.add("Main", GamePlay);
game.state.start("Main");

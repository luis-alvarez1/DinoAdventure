var game = new Phaser.Game(1000, 418, Phaser.CANVAS, "game_block");


var GamePlay = {
  preload: function () {
    game.stage.backgroundColor = "#000000";
    game.load.image("background", "assets/img/background.png");
    game.load.image("ground", "assets/img/ground.jpeg");
    game.load.spritesheet("dinosaur", "assets/img/principal.png", 56, 47, 13);
    game.load.spritesheet("enemy1", "assets/img/enemigo1.png", 59, 46, 10);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },

  create: function () {
    this.background = game.add.tileSprite(0, 0, 1000, 413, "background");
    this.ground = game.add.tileSprite(0, 350, 1000, 100, "ground");
    this.dino = game.add.sprite(100, 340, "dinosaur");
    
    this.dino.anchor.setTo(0.5);
    this.dino.frame = 12;
    

    this.dino.animations.add(
      "walk",
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      10,
      true
    );

    this.movement = game.input.keyboard.createCursorKeys();
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable(this.dino);

    this.dino.body.colliderWorldBounds = true;
    
      this.enemy1 = this.game.add.sprite(800, 318, "enemy1");
      this.enemy1.animations.add('walking', [1,2,3,4,5,6,7,8,10,11,12], 7, true);
      this.enemy1.animations.play('walking');
      
      var tween = game.add.tween(this.enemy1);
      tween.to({x:600}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
      
  },
  update: function () {
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
    } else if (this.jumpKey.isDown) {
      console.log("space");
    } else {
      if (this.direction != "waiting") {
        this.dino.animations.stop();
      }
      this.direction = "wating";
    }
    
    //movimiento enemigo 1
    var limite1 = 800;
    var limite2 = 600;
    var posicionxEnemy1 = this.enemy1.x;
    
    
    if (posicionxEnemy1 == limite1){
      this.enemy1.scale.setTo(-1,1);
    }
    if (posicionxEnemy1 == limite2){
      this.enemy1.scale.setTo(1,1);
    }
  },
};

game.state.add("Main", GamePlay);
game.state.start("Main");

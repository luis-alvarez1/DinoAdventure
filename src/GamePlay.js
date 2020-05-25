const game = new Phaser.Game(1000, 418, Phaser.CANVAS, "game_block");

const GamePlay = {
  preload: function () {
    game.stage.backgroundColor = "#000000";
    game.load.image("background", "assets/img/background.png");
    game.load.image("ground", "assets/img/ground.jpeg");
    game.load.spritesheet("dinosaur", "assets/img/principal.png", 56, 47, 13);
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

    this.dino.animations.add("bite", [11], 10, true);

    this.movement = game.input.keyboard.createCursorKeys();
    this.jumpKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.physics.arcade.enable(this.dino);

    this.dino.body.colliderWorldBounds = true;
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
      this.dino.animations.play("bite");
      this.direction = "bite";
    } else {
      if (this.direction != "waiting") {
        this.dino.animations.stop();
      }

      this.direction = "wating";
    }
  },
};

game.state.add("Main", GamePlay);
game.state.start("Main");

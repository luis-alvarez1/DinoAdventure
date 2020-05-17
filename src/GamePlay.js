var game = new Phaser.Game(1000, 418, Phaser.CANVAS, "game_block");

var GamePlay = {
  preload: function () {
    game.load.image("background", "assets/img/background.png");
    game.load.image("ground", "assets/img/ground.jpeg");
    game.load.spritesheet(
      "dinosaur",
      "assets/img/principal.png",
      56,
      47,
      13
    );
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
  },

  create: function () {
    this.background = game.add.tileSprite(0, 0, 1000, 413, "background");
    this.ground = game.add.tileSprite(0, 350, 1000, 100, "ground");
    this.dino = game.add.sprite(game.with / 2, game.height / 2, "dinosaur");
    this.dino.frame = 13;
  },
  update: function () {},
};

game.state.add("Main", GamePlay);
game.state.start("Main");

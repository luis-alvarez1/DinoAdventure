var game = new Phaser.Game(800, 600, Phaser.CANVAS, "game_block");

var GamePlay = {
  preload: function () {},
  create: function () {},
  update: function () {},
};

game.state.add("Main", GamePlay);
game.state.start("Main");

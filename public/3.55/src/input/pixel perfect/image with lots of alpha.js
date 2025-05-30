var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#efefef',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.image('hello', 'assets/sprites/hello.png');
}

function create ()
{
    var sprite = this.add.sprite(400, 300, 'hello').setInteractive({ pixelPerfect: true });

    sprite.on('pointerover', function () {

        this.setTint(0xff0000);

    });

    sprite.on('pointerout', function () {

        this.setTint();

    });
}

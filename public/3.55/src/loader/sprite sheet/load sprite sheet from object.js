var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.spritesheet({
        key: 'explosion',
        url: 'assets/sprites/explosion.png',
        frameConfig: { frameWidth: 64, frameHeight: 64, endFrame: 23 }
    });
}

function create ()
{
    var config = {
        key: 'explodeAnimation',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 23, first: 23 }),
        frameRate: 20,
        repeat: -1
    };

    this.anims.create(config);

    this.add.sprite(400, 300, 'explosion').play('explodeAnimation');
}

class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('pic', 'assets/pics/zero-two.png');
    }

    create ()
    {
        this.add.image(0, 0, 'pic').setOrigin(0);
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#2dab2d',
    scale: {
        parent: 'phaser-example',
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    scene: Example
};

const game = new Phaser.Game(config);

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.image('test', 'assets/sprites/128x128.png');
        this.load.image('test2', 'assets/sprites/button-bg.png');
        this.load.image('box', 'assets/tests/blue-box.png');
    }

    create ()
    {
        window.nine = this.add.nineslice({ left: 16, right: 16, top: 32, bottom: 16, width: 600, height: 400 }, 400, 300, 'box');

        this.tweens.add({
            targets: window.nine,
            width: 100,
            duration: 3000,
            ease: 'sine.inout',
            yoyo: true,
            repeat: -1,
        });

        this.tweens.add({
            targets: window.nine,
            height: 100,
            duration: 6000,
            ease: 'sine.inout',
            yoyo: true,
            repeat: -1,
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('bg', 'assets/skies/deepblue.png');
        this.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 });
    }

    create ()
    {
        this.add.image(400, 300, 'bg');

        const group = this.add.group({
            key: 'diamonds',
            frame: [ 0, 1, 2, 3, 4 ],
            frameQuantity: 40
        });

        Phaser.Actions.GridAlign(group.getChildren(), {
            width: 20,
            height: 10,
            cellWidth: 32,
            cellHeight: 32,
            x: 80,
            y: 140
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);

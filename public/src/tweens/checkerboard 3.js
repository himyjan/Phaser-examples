class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('bg', 'assets/tweens/space.png');
        this.load.image('block', 'assets/sprites/50x50.png');
    }

    create ()
    {
        this.add.image(400, 300, 'bg');

        const blocks = this.add.group({ key: 'block', repeat: 107, setScale: { x: 0.1, y: 0.1 } });

        Phaser.Actions.GridAlign(blocks.getChildren(), {
            width: 12,
            height: 9,
            cellWidth: 60,
            cellHeight: 60,
            x: 40,
            y: 30
        });

        let i = 0;

        blocks.children.forEach(child => {

            this.tweens.add({
                targets: child,
                scale: 1,
                angle: 180,
                ease: 'Power2',
                duration: 1000,
                delay: i * 50,
                repeat: -1,
                yoyo: true,
                hold: 1000,
                repeatDelay: 1000
            });

            i++;

            if (i % 12 === 0)
            {
                i = 0;
            }

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

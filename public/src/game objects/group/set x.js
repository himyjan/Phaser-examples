class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.spritesheet('diamonds', 'assets/sprites/diamonds32x24x5.png', { frameWidth: 32, frameHeight: 24 });
    }

    create ()
    {
        //  Create 5 sprites in our group  (one per frame)

        //  Use the setXY object to set the positions on them all to be x: 100 + 64px spacing (the stepX value) by 100.

        const group = this.add.group({
            key: 'diamonds',
            frame: [ 0, 1, 2, 3, 4 ],
            setXY:
            {
                x: 100,
                y: 100,
                stepX: 64
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

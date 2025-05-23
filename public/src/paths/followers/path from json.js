class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.json('waves', 'assets/paths/waves.json');
        this.load.image('ship', 'assets/sprites/bsquadron1.png');
    }

    create ()
    {
        const path = new Phaser.Curves.Path(this.cache.json.get('waves'));

        const graphics = this.add.graphics().lineStyle(1, 0x2d2d2d, 1);

        path.draw(graphics);

        for (let i = 0; i < 20; i++)
        {
            const follower = this.add.follower(path, 0, 0, 'ship');

            follower.startFollow({
                duration: 5000,
                positionOnPath: true,
                repeat: -1,
                ease: 'Linear',
                delay: i * 70
            });
        }
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

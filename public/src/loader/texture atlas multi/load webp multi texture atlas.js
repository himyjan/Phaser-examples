class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.multiatlas('game', 'assets/atlas/multi-webp.json', 'assets/atlas/');
    }

    create ()
    {
        const atlasTexture = this.textures.get('game');

        const frames = atlasTexture.getFrameNames();

        for (let i = 0; i < frames.length; i++)
        {
            const x = Phaser.Math.Between(0, 1024);
            const y = Phaser.Math.Between(0, 768);

            this.add.image(x, y, 'game', frames[i]);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);

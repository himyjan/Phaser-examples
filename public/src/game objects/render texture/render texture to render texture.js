class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('bunny', 'assets/sprites/bunny.png');
    }

    create ()
    {
        const rt1 = this.add.renderTexture(0, 0, 400, 600).setOrigin(0, 0);

        for (let i = 0; i < 16; i++)
        {
            const x = Phaser.Math.Between(-200, 400);
            const y = Phaser.Math.Between(-100, 600);

            rt1.draw('bunny', x, y);
        }

        rt1.render();

        const rt2 = this.add.renderTexture(400, 0, 400, 600).setOrigin(0, 0);

        rt2.draw(rt1, 0, 0).render();
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);

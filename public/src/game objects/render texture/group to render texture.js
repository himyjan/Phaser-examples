class Example extends Phaser.Scene
{
    rt;

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.spritesheet('invader1', 'assets/tests/invaders/invader1.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('invader2', 'assets/tests/invaders/invader2.png', { frameWidth: 44, frameHeight: 32 });
        this.load.spritesheet('invader3', 'assets/tests/invaders/invader3.png', { frameWidth: 48, frameHeight: 32 });
    }

    create ()
    {
        const invader1 = this.add.group({ key: 'invader1', frame: 0, repeat: 13, setXY: { x: 32, y: 100, stepX: 40 } });

        const invader2 = this.add.group([
            { key: 'invader2', frame: 0, repeat: 10, setXY: { x: 32, y: 148, stepX: 52 } },
            { key: 'invader2', frame: 0, repeat: 10, setXY: { x: 32, y: 148 + 48, stepX: 52 } }
        ]);

        const invader3 = this.add.group([
            { key: 'invader3', frame: 0, repeat: 9, setXY: { x: 32, y: 148 + 96, stepX: 58 } },
            { key: 'invader3', frame: 0, repeat: 9, setXY: { x: 32, y: 148 + 96 + 48, stepX: 58 } }
        ]);

        Phaser.Actions.IncX(invader1.getChildren(), 100);
        Phaser.Actions.IncX(invader2.getChildren(), 100);
        Phaser.Actions.IncX(invader3.getChildren(), 100);

        Phaser.Actions.SetTint(invader1.getChildren(), 0xff0000);
        Phaser.Actions.SetTint(invader2.getChildren(), 0x00ff00);
        Phaser.Actions.SetTint(invader3.getChildren(), 0x00ffff);

        this.rt = this.add.renderTexture(400, 300, 800, 600);

        this.rt.draw(invader1);
        this.rt.draw(invader2);
        this.rt.draw(invader3);

        this.rt.render();

        //  Now we're drawn them to the Render Texture, we can hide them:

        invader1.toggleVisible();
        invader2.toggleVisible();
        invader3.toggleVisible();
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

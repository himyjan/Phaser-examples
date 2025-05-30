class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('bunny', 'assets/sprites/bunny.png');
    }

    create ()
    {
        //  Create a Render Texture at 0x0 which is 800x600 in size
        const rt = this.add.renderTexture(400, 300, 800, 600);

        rt.camera.setAngle(20);
        rt.camera.setZoom(2);
        rt.camera.setPosition(450, 350);

        rt.stamp('bunny', null, 0, 0, { originX: 0, originY: 0 }).render();
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

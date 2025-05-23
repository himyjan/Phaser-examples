class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.setPath('assets/loader-tests/');

        this.load.atlas({
            key: 'megaset',
            textureURL: 'texture-packer-atlas-with-normals-0.png',
            normalMap: 'texture-packer-atlas-with-normals-0_n.png',
            atlasURL: 'texture-packer-atlas-with-normals.json'
        });
    }

    create ()
    {
        const light = this.lights.addLight(0, 0, 200);

        this.lights.enable().setAmbientColor(0x555555);

        this.input.on('pointermove', pointer =>
        {

            light.x = pointer.x;
            light.y = pointer.y;

        });

        const atlasTexture = this.textures.get('megaset');

        const frames = atlasTexture.getFrameNames();

        Phaser.Utils.Array.Shuffle(frames);

        for (let i = 0; i < frames.length; i++)
        {
            const x = Phaser.Math.Between(100, 700);
            const y = Phaser.Math.Between(100, 500);

            this.add.image(x, y, 'megaset', frames[i]).setLighting(true);
        }
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);

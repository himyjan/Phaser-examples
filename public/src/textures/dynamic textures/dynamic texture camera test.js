class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.atlas('banner', 'assets/atlas/banners.png', 'assets/atlas/banners.json');
    }

    create ()
    {
        const banner = this.textures.addDynamicTexture('playerBanner', 512, 512);

        banner.camera.scrollY -= 100;

        banner.stamp('banner', 'Banner_02', 256, 256).render();

        this.add.sprite(400, 300, 'playerBanner');
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#2d2d6d',
    scene: Example
};

const game = new Phaser.Game(config);

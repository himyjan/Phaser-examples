class Example extends Phaser.Scene
{
    constructor ()
    {
        super({
            pack: {
                files: [
                    { type: 'scenePlugin', key: 'SpinePlugin', url: 'plugins/3.8.95/SpinePluginDebug.js', sceneKey: 'spine' }
                ]
            }
        });
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('logo', 'assets/sprites/phaser.png');

        this.load.setPath('assets/spine/3.8/demos/');

        this.load.spine('set1', 'demos.json', [ 'atlas1.atlas' ], true);
    }

    create ()
    {
        let boy1 = this.add.spine(120, 400, 'set1.spineboy', 'idle', true).setScale(0.5);
        boy1.drawDebug = true;

        let boy2 = this.add.spine(400, 400, 'set1.spineboy', 'idle', true).setScale(0.5);

        let image1 = this.add.image(200, 450, 'logo').setOrigin(0);

        let container = this.add.container();

        container.add([ boy1, boy2, image1 ]);

        boy2.visible = false;
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    scene: Example
};

const game = new Phaser.Game(config);

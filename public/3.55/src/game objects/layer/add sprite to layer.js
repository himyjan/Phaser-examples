class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
        this.load.image('spaceman', 'assets/sprites/exocet_spaceman.png');
        this.load.image('bunny', 'assets/sprites/bunny.png');
        this.load.image('elephant', 'assets/sprites/elephant.png');
        this.load.image('logo', 'assets/sprites/phaser3-logo-small.png');
    }

    create ()
    {
        const spaceman = this.add.sprite(150, 300, 'spaceman');
        const bunny = this.add.sprite(400, 300, 'bunny');
        const elephant = this.add.sprite(650, 300, 'elephant');

        const layer = this.add.layer();

        layer.add([ spaceman, bunny, elephant ]);

        console.log(layer);

        //  And this one is not in the Layer
        this.add.sprite(400, 50, 'logo');

        this.input.on('pointerdown', () => {

            layer.visible = !layer.visible;

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

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
        this.load.image('bunny', 'assets/sprites/bunny.png');
        this.load.image('phaser2', 'assets/sprites/phaser2.png');
        this.load.image('checker', 'assets/pics/checker.png');
    }

    create ()
    {
        const checker = this.make.image({
            x: game.config.width / 2,
            y: game.config.height / 2,
            key: 'checker',
            add: true
        });

        const bunny = this.make.sprite({
            x: game.config.width / 2,
            y: game.config.height / 2,
            key: 'bunny',
            add: true
        });

        const phaser2 = this.add.text(100, 300, 'PHASER').setFont('72px Arial').setColor('#ffff00').setAlign('center');
        phaser2.setOrigin(0.5);
        phaser2.visible = false;

        bunny.mask = new Phaser.Display.Masks.BitmapMask(this, phaser2);

        this.input.on('pointermove', function (pointer) {

            phaser2.x = pointer.x;
            phaser2.y = pointer.y;

            phaser2.setText('PHASER\nX: ' + phaser2.x + '\nY: ' + phaser2.y);

        });
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 640,
    height: 480,
    scene: [ Example ]
};

const game = new Phaser.Game(config);

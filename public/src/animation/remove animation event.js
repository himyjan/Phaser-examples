class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.atlas('gems', 'assets/tests/columns/gems.png', 'assets/tests/columns/gems.json');

    }

    create ()
    {
        const text = this.add.text(400, 32, 'Click to remove the Square animation', { color: '#00ff00' }).setOrigin(0.5, 0);

        const diamond = this.anims.create({ key: 'diamond', frames: this.anims.generateFrameNames('gems', { prefix: 'diamond_', end: 15, zeroPad: 4 }), repeat: -1 });
        const prism = this.anims.create({ key: 'prism', frames: this.anims.generateFrameNames('gems', { prefix: 'prism_', end: 6, zeroPad: 4 }), repeat: -1 });
        const ruby = this.anims.create({ key: 'ruby', frames: this.anims.generateFrameNames('gems', { prefix: 'ruby_', end: 6, zeroPad: 4 }), repeat: -1 });
        const square = this.anims.create({ key: 'square', frames: this.anims.generateFrameNames('gems', { prefix: 'square_', end: 14, zeroPad: 4 }), repeat: -1 });

        //  square added twice just to make sure there are more of them
        const keys = [ 'diamond', 'prism', 'ruby', 'square', 'square' ];

        let x = 100;
        let y = 116;

        for (let i = 0; i < 35; i++)
        {
            this.add.sprite(x, y, 'gems').play(keys[Phaser.Math.Between(0, 4)]);

            x += 100;

            if (x === 800)
            {
                x = 100;
                y += 100;
            }
        }

        this.anims.on(Phaser.Animations.Events.REMOVE_ANIMATION, function (key, anim) {

            text.setText('Animation ' + key + ' has been removed');

        });

        this.input.once('pointerdown', function () {

            //  We'll now remove the square animation from the global Animation Manager
            this.anims.remove('square');

        }, this);
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

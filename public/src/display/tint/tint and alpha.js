class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('bg', 'assets/pics/swirl1.jpg');
        this.load.image('morty', 'assets/pics/morty.png');
    }

    create ()
    {
        this.add.image(400, 300, 'bg');

        const image1 = this.add.image(200, 300, 'morty');
        const image2 = this.add.image(400, 300, 'morty');
        const image3 = this.add.image(600, 300, 'morty');

        image2.setTint(0xff0000);
        image2.setAlpha(0.5);

        // image3.setTintFill(0xff0000, 0xff0000, 0xffff00, 0xffff00);
        // image3.setTintFill(0xff0000);
        image3.setTintFill(0xffffff);
        image3.setAlpha(0.5);
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);

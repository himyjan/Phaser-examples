class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('ball', 'assets/sprites/wizball.png');
        this.load.image('chick', 'assets/sprites/budbrain_chick.png');
        this.load.image('eye', 'assets/pics/lance-overdose-loader-eye.png');
        this.load.image('ship', 'assets/sprites/thrust_ship2.png');
        this.load.image('car', 'assets/pics/supercars-parsec.png');
    }

    create ()
    {
        const sprite1 = this.add.sprite(200, 550, 'car').setOrigin(0);

        sprite1.setInteractive(new Phaser.Geom.Polygon([ 0, 143, 0, 92, 110, 40, 244, 4, 330, 0, 458, 12, 574, 18, 600, 79, 594, 153, 332, 152, 107, 157 ]), Phaser.Geom.Polygon.Contains);

        const sprite2 = this.add.sprite(150, 150, 'ball').setScale(2);

        sprite2.setInteractive(new Phaser.Geom.Circle(45, 46, 45), Phaser.Geom.Circle.Contains);

        const sprite3 = this.add.sprite(600, 200, 'chick').setScale(2);

        sprite3.setInteractive(new Phaser.Geom.Ellipse(33, 65, 66, 133), Phaser.Geom.Ellipse.Contains);

        const sprite4 = this.add.sprite(350, 300, 'eye');

        sprite4.setInteractive(new Phaser.Geom.Rectangle(0, 0, 128, 128), Phaser.Geom.Rectangle.Contains);

        const sprite5 = this.add.sprite(850, 350, 'ship').setScale(8);

        sprite5.setInteractive(new Phaser.Geom.Triangle.BuildEquilateral(16, 0, 30), Phaser.Geom.Triangle.Contains);

        //  Input Event listeners

        this.input.on('gameobjectover', (pointer, gameObject) =>
        {

            gameObject.setTint(0x7878ff);

        });

        this.input.on('gameobjectout', (pointer, gameObject) =>
        {

            gameObject.clearTint();

        });
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    pixelArt: true,
    scene: Example
};

const game = new Phaser.Game(config);

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('map', 'assets/tests/camera/earthbound-scarab.png');
        this.load.image('ship', 'assets/sprites/fmship.png');
    }

    create ()
    {
        this.cameras.main.setBounds(0, 0, 1024, 2048);

        this.add.image(0, 0, 'map').setOrigin(0);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.mode = 0; // 0 = direct, 1 = physics
        this.directSpeed = 4.5;

        this.ship = this.physics.add.image(400, 300, 'ship');

        this.cameras.main.startFollow(this.ship, true);
        // this.cameras.main.startFollow(this.ship, true, 0.09, 0.09);

        // this.cameras.main.setZoom(2);
        this.cameras.main.setZoom(4);

        this.input.on('pointerdown', () => {

            console.log(this.cameras.main.scrollX, this.cameras.main.scrollY);
            console.log(this.cameras.main.matrix);

        });

        this.events.on('prerender', this.preRender, this);
    }

    preRender ()
    {
        // console.log(this.ship.x, this.ship.y, this.cameras.main.scrollX, this.cameras.main.scrollY);
    }

    update ()
    {
        if (this.mode === 0)
        {
            this.updateDirect();
        }
        else
        {
            this.updatePhysics();
        }
    }

    updatePhysics ()
    {
        this.ship.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.ship.setAngle(-90).setVelocityX(-200);
        }
        else if (this.cursors.right.isDown)
        {
            this.ship.setAngle(90).setVelocityX(200);
        }

        if (this.cursors.up.isDown)
        {
            this.ship.setAngle(0).setVelocityY(-200);
        }
        else if (this.cursors.down.isDown)
        {
            this.ship.setAngle(-180).setVelocityY(200);
        }
    }

    updateDirect ()
    {
        if (this.cursors.left.isDown)
        {
            this.ship.setAngle(-90);
            this.ship.x -= this.directSpeed;
        }
        else if (this.cursors.right.isDown)
        {
            this.ship.setAngle(90);
            this.ship.x += this.directSpeed;
        }

        if (this.cursors.up.isDown)
        {
            this.ship.setAngle(0);
            this.ship.y -= this.directSpeed;
        }
        else if (this.cursors.down.isDown)
        {
            this.ship.setAngle(-180);
            this.ship.y += this.directSpeed;
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
        default: 'arcade',
    },
    scene: Example
};
const game = new Phaser.Game(config);

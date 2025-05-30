class SpaceShip extends Phaser.Physics.Arcade.Sprite
{

    constructor (scene, x, y)
    {
        super(scene, x, y, 'ship');

        this.play('thrust');

        //  You can either do this:
        scene.add.existing(this);
        scene.physics.add.existing(this);

        //  Or this, the end result is the same
        // scene.sys.displayList.add(this);
        // scene.sys.updateList.add(this);
        // scene.sys.arcadePhysics.world.enableBody(this, 0);

        //  Set some default physics properties
        this.setScale(2);
        this.setBounce(1, 1);
        this.setCollideWorldBounds(true);

        this.body.onWorldBounds = true;

        this.setVelocity(0, -200);
    }
}

function onWorldBounds (body)
{
    body.gameObject.toggleFlipY();
}

class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.spritesheet('ship', 'assets/games/lazer/ship.png', { frameWidth: 16, frameHeight: 24 });
    }
    create ()
    {
        this.anims.create({
            key: 'thrust',
            frames: this.anims.generateFrameNumbers('ship', { frames: [ 2, 7 ] }),
            frameRate: 20,
            repeat: -1
        });

        for (let i = 0; i < 32; i++)
        {
            new SpaceShip(this, Phaser.Math.Between(64, 736), Phaser.Math.Between(100, 500));
        }

        this.physics.world.on('worldbounds', onWorldBounds);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    pixelArt: true,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: { y: 0 }
        }
    },
    scene: Example
};

const game = new Phaser.Game(config);

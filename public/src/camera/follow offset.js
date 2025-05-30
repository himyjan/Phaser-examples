class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('bg', 'assets/pics/the-end-by-iloe-and-made.jpg');
        this.load.image('ship', 'assets/sprites/x2kship.png');
    }

    create ()
    {
        //  Set the camera and physics bounds to be the size of 4x4 bg images
        this.cameras.main.setBounds(0, 0, 1920 * 2, 1080 * 2);
        this.physics.world.setBounds(0, 0, 1920 * 2, 1080 * 2);

        //  Mash 4 images together to create our background
        this.add.image(0, 0, 'bg').setOrigin(0);
        this.add.image(1920, 0, 'bg').setOrigin(0).setFlipX(true);
        this.add.image(0, 1080, 'bg').setOrigin(0).setFlipY(true);
        this.add.image(1920, 1080, 'bg').setOrigin(0).setFlipX(true).setFlipY(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.image(400, 300, 'ship');

        this.player.setCollideWorldBounds(true);

        this.cameras.main.startFollow(this.player);

        this.cameras.main.followOffset.set(-300, 0);
    }

    update ()
    {
        this.player.setVelocity(0);

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-500);
            this.player.setFlipX(true);
            this.cameras.main.followOffset.x = 300;
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(500);
            this.player.setFlipX(false);
            this.cameras.main.followOffset.x = -300;
        }

        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-500);
        }
        else if (this.cursors.down.isDown)
        {
            this.player.setVelocityY(500);
        }
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
    },
    scene: Example
};

const game = new Phaser.Game(config);

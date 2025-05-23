class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.path = 'assets/atlas/trimsheet/';

        this.load.atlas('testanims', 'trimsheet.png', 'trimsheet.json');
    }

    create ()
    {
        //  create a sprite sheet from a frame embedded in a texture atlas
        //  'boom' is the unique local name we'll give the sprite sheet
        //  'megaset' is the key of the texture atlas that contains the sprite sheet
        //  'explosion' is the name of the frame within the texture atlas
        //  The rest of the values are the sprite sheet frame sizes and offsets

        const t1 = this.textures.addSpriteSheetFromAtlas(
            'boom1',
            {
                atlas: 'testanims',
                frame: 'explosion-notrim',
                frameWidth: 64,
                frameHeight: 64,
                endFrame: 23
            });


        const t2 = this.textures.addSpriteSheetFromAtlas(
            'boom2',
            {
                atlas: 'testanims',
                frame: 'explosion',
                frameWidth: 64,
                frameHeight: 64,
                endFrame: 23
            });

        const b1 = this.textures.addSpriteSheetFromAtlas(
            'bubble1',
            {
                atlas: 'testanims',
                frame: 'bubble-notrim',
                frameWidth: 34,
                frameHeight: 68
            });


        const b2 = this.textures.addSpriteSheetFromAtlas(
            'bubble2',
            {
                atlas: 'testanims',
                frame: 'bubble',
                frameWidth: 34,
                frameHeight: 68
            });

        //  There is a new texture available called 'boom1', which we can assign to game objects:

        const config1 = {
            key: 'explode1',
            frames: this.anims.generateFrameNumbers('boom1', { start: 0, end: 23, first: 23 }),
            frameRate: 20,
            repeat: -1
        };

        const config2 = {
            key: 'explode2',
            frames: this.anims.generateFrameNumbers('boom2', { start: 0, end: 23, first: 23 }),
            frameRate: 20,
            repeat: -1
        };

        const config3 = {
            key: 'bobble1',
            frames: this.anims.generateFrameNumbers('bubble1', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        };

        const config4 = {
            key: 'bobble2',
            frames: this.anims.generateFrameNumbers('bubble2', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        };

        this.anims.create(config1);
        this.anims.create(config2);
        this.anims.create(config3);
        this.anims.create(config4);

        this.add.sprite(300, 200).play('explode1');
        this.add.sprite(400, 200).play('explode2');

        this.add.sprite(300, 400).play('bobble1');
        this.add.sprite(400, 400).play('bobble2');
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

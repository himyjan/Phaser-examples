class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('brush', 'assets/particles/sparkle1.png');
        this.load.image('grass', 'assets/textures/grass.png');
        this.load.image('bg', 'assets/pics/turkey-1985086.jpg');
    }

    create ()
    {
        this.add.image(0, 0, 'bg').setOrigin(0);

        const texture = this.textures.createCanvas('canvastexture', 800, 600);

        const grass = this.textures.get('grass').getSourceImage();
        const brush = this.textures.get('brush').getSourceImage();

        texture.draw(0, 0, grass);
        texture.draw(512, 0, grass);
        texture.draw(0, 512, grass);
        texture.draw(512, 512, grass);

        //  Set the global composite op:
        texture.context.globalCompositeOperation = 'destination-out';

        //  Now anything drawn to the canvas will use this op
        texture.draw(0, 0, brush);
        texture.draw(150, 90, brush);
        texture.draw(300, 140, brush);

        //  Finally, display the Canvas Texture by adding it to an Image
        this.add.image(0, 0, 'canvastexture').setOrigin(0);
    }
}

const config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#2d2d88',
    scene: Example
};

const game = new Phaser.Game(config);

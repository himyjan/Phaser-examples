class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.atlas('flares', 'assets/particles/flares.png', 'assets/particles/flares.json');
    }

    create ()
    {
        const curve = new Phaser.Curves.Spline([ 50, 300, 164, 246, 274, 342, 412, 257, 522, 341, 664, 264 ]);

        const particles = this.add.particles('flares');

        //  Here is a RandomZone by way of comparison
        particles.createEmitter({
            y: -200,
            frame: { frames: [ 'red', 'green', 'blue' ], cycle: true },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            emitZone: { type: 'random', source: curve, quantity: 48 }
        });

        //  An EdgeZone without using yoyo
        particles.createEmitter({
            frame: { frames: [ 'red', 'green', 'blue' ], cycle: true },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: curve, quantity: 48, yoyo: false }
        });

        //  An EdgeZone with yoyo
        particles.createEmitter({
            y: 200,
            frame: { frames: [ 'red', 'green', 'blue' ], cycle: true },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            emitZone: { type: 'edge', source: curve, quantity: 48, yoyo: true }
        });
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#000',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);

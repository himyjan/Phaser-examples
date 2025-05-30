// #module

import HueRotate from './assets/rendernodes/FilterHueRotate.js';
import Lazers from './assets/rendernodes/FilterLazers.js';

export default class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('einstein', 'assets/pics/ra-einstein.png');
    }

    create ()
    {
        const pic = this.add.image(128, 64, 'einstein');

        //  1024 x 512 = 4 x 4 = 256 x 128
        //  We're going to create 16 cameras in a 4x4 grid, making each 256 x 128 in size

        let cam = this.cameras.main;

        cam.setSize(256, 128);

        cam.filters.external.add(new Lazers.Controller(cam));

        let b = 0;

        for (let y = 0; y < 4; y++)
        {
            for (let x = 0; x < 4; x++)
            {
                if (x === 0 && y === 0)
                {
                    continue;
                }

                if (x === 0)
                {
                    b = (b) ? 0 : 1;
                }

                cam = this.cameras.add(x * 256, y * 128, 256, 128);

                if (b === 0)
                {
                    cam.filters.external.add(new HueRotate.Controller(cam));
                    b = 1;
                }
                else
                {
                    cam.filters.external.add(new Lazers.Controller(cam));
                    b = 0;
                }
            }
        }

        this.tweens.add({
            targets: pic,
            angle: 360,
            ease: 'Linear',
            duration: 6000,
            repeat: -1
        });
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 1024,
    height: 512,
    parent: 'phaser-example',
    scene: Example,
    renderNodes: {
        FilterHueRotate: HueRotate.Filter,
        FilterLazers: Lazers.Filter
    }
};

let game = new Phaser.Game(config);

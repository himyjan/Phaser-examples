// #module

import * as SpinePlugin from '../../plugins/spine4.1/SpinePluginDebug.js';

class Example extends Phaser.Scene
{
    constructor ()
    {
        super('Example1');
    }

    preload ()
    {
        this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('logo', 'assets/sprites/phaser.png');
        this.load.image('beer', 'assets/sprites/beer.png');

        this.load.setPath('assets/spine/4.1/demos/');

        this.load.spine('set1', 'demos.json', [ 'atlas1.atlas' ], true);
    }

    create ()
    {
        this.add.image(0, 0, 'logo').setOrigin(0);

        this.add.spine(200, 600, 'set1.alien', 'death', true).setScale(0.5);

        this.add.text(300, 10, 'Scene 1 - Running', { font: '16px Courier', fill: '#00ff00' });

        this.add.image(200, 200, 'beer');

        this.scene.launch('Example2');
    }
}

class Example2 extends Phaser.Scene
{
    constructor ()
    {
        super('Example2');
    }

    create ()
    {
        this.add.spine(500, 600, 'set1.spineboy', 'run', true).setScale(0.5);

        this.add.text(300, 24, 'Scene 2 - Running', { font: '16px Courier', fill: '#00ff00' });

        this.add.image(600, 200, 'beer');
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    scene: [ Example, Example2 ],
    plugins: {
        scene: [
            { key: 'SpinePlugin', plugin: window.SpinePlugin, mapping: 'spine' }
        ]
    }
};

let game = new Phaser.Game(config);

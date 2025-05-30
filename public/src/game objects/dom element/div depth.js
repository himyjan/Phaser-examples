class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('einstein', 'assets/pics/ra-einstein.png');
    }

    create ()
    {
        const div1 = document.createElement('div');
        div1.style = 'background-color: lime; width: 220px; height: 100px; font: 48px Arial; font-weight: bold';
        div1.innerText = 'Phaser 3';

        const div2 = document.createElement('div');
        div2.style = 'background-color: yellow; width: 220px; height: 100px; font: 48px Arial; font-weight: bold';
        div2.innerText = 'Phaser 3';

        const element1 = this.add.dom(300, 0, div1);
        const element2 = this.add.dom(400, 0, div2);

        element1.setDepth(2);

        this.tweens.add({
            targets: [ element1, element2 ],
            y: 600,
            angle: 200,
            duration: 3000,
            scaleX: 2,
            ease: 'Sine.easeInOut',
            loop: -1,
            yoyo: true
        });

        this.add.image(400, 300, 'einstein');
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    dom: {
        createContainer: true
    },
    scene: Example
};

const game = new Phaser.Game(config);

class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('gem', 'assets/sprites/gem.png');
    }

    create ()
    {
        const text = this.add.text(350, 270, '', { font: '16px Courier', fill: '#00ff00' });
        const gem = this.add.image(300, 300, 'gem');

        //  Store some data about this Gem:
        gem.setData({ name: 'Red Gem Stone', level: 2, owner: 'Link', 'gold': 50 });

        //  Whenever a data value is updated the `changedata` event is fired and we listen for it:
        gem.on('changedata', function (gameObject, key, value) {
            text.setText([
                'Name: ' + gem.getData('name'),
                'Level: ' + gem.getData('level'),
                'Value: ' + gem.getData('gold') + ' gold',
                'Owner: ' + gem.getData('owner')
            ]);
        });

        //  Change the 'value' property when the mouse is clicked
        this.input.on('pointerdown', function () {
            gem.data.values.gold += 50;
            if (gem.data.values.gold % 200 === 0)
            {
                gem.data.values.level++;
            }
        });
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

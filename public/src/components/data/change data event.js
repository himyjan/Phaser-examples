class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('gem', 'assets/sprites/gem.png');
    }

    create ()
    {
        const text = this.add.text(350, 250, '', { font: '16px Courier', fill: '#00ff00' });
        const gem = this.add.image(300, 300, 'gem');

        //  Store some data about this Gem:
        gem.setDataEnabled();

        gem.data.set('name', 'Red Gem Stone');
        gem.data.set('level', 2);
        gem.data.set('owner', 'Link');
        gem.data.set('gold', 50);

        text.setText([
            'Name: ' + gem.data.get('name'),
            'Level: ' + gem.data.get('level'),
            'Value: ' + gem.data.get('gold') + ' gold',
            'Owner: ' + gem.data.get('owner')
        ]);

        //  Whenever the 'gold' property is updated we call this function AFTER the change has happened:
        gem.on('changedata-gold', function (gameObject, value) {
            if (value > 500)
            {
                gameObject.data.values.gold = 500;
            }
            else
            {
                text.setText([
                    'Name: ' + gem.data.get('name'),
                    'Level: ' + gem.data.get('level'),
                    'Value: ' + gem.data.get('gold') + ' gold',
                    'Owner: ' + gem.data.get('owner')
                ]);
            }
        });

        //  Change the 'value' property when the mouse is clicked
        this.input.on('pointerdown', function () {
            gem.data.values.gold += 100;
        });
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);

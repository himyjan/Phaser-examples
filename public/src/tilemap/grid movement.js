class Example extends Phaser.Scene
{
    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('tiles', 'assets/tilemaps/tiles/drawtiles-spaced.png');
        this.load.image('car', 'assets/sprites/car90.png');
        this.load.tilemapCSV('map', 'assets/tilemaps/csv/grid.csv');
    }

    create ()
    {
        const map = this.make.tilemap({ key: 'map', tileWidth: 32, tileHeight: 32 });
        const tileset = map.addTilesetImage('tiles', null, 32, 32, 1, 2);
        const layer = map.createLayer(0, tileset, 0, 0);

        const player = this.add.image(32 + 16, 32 + 16, 'car');

        //  Left
        this.input.keyboard.on('keydown-A', event =>
        {

            const tile = layer.getTileAtWorldXY(player.x - 32, player.y, true);

            if (tile.index === 2)
            {
                //  Blocked, we can't move
            }
            else
            {
                player.x -= 32;
                player.angle = 180;
            }

        });

        //  Right
        this.input.keyboard.on('keydown-D', event =>
        {

            const tile = layer.getTileAtWorldXY(player.x + 32, player.y, true);

            if (tile.index === 2)
            {
                //  Blocked, we can't move
            }
            else
            {
                player.x += 32;
                player.angle = 0;
            }

        });

        //  Up
        this.input.keyboard.on('keydown-W', event =>
        {

            const tile = layer.getTileAtWorldXY(player.x, player.y - 32, true);

            if (tile.index === 2)
            {
                //  Blocked, we can't move
            }
            else
            {
                player.y -= 32;
                player.angle = -90;
            }

        });

        //  Down
        this.input.keyboard.on('keydown-S', event =>
        {

            const tile = layer.getTileAtWorldXY(player.x, player.y + 32, true);

            if (tile.index === 2)
            {
                //  Blocked, we can't move
            }
            else
            {
                player.y += 32;
                player.angle = 90;
            }

        });

        this.add.text(8, 8, 'Move with WASD', {
            fontSize: '18px',
            fill: '#ffffff',
            backgroundColor: '#000000'
        });
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    pixelArt: true,
    backgroundColor: '#1a1a2d',
    scene: Example
};

const game = new Phaser.Game(config);

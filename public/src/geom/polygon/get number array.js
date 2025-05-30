class Example extends Phaser.Scene
{
    create ()
    {
        const graphics = this.add.graphics({ lineStyle: { width: 2, color: 0xaa6622 } });

        const points = [
            new Phaser.Math.Vector2(420, 280),
            new Phaser.Math.Vector2(450, 250),
            new Phaser.Math.Vector2(470, 300)
        ];

        const polygon = new Phaser.Geom.Polygon(points);

        this.input.on('pointermove', pointer =>
        {

            points[points.length - 1].copy(pointer);

            polygon.setTo(points);

            redraw();
        });

        this.input.on('pointerdown', pointer =>
        {

            points.push(points[points.length - 1].clone());

        });

        redraw();

        function redraw ()
        {
            graphics.clear();

            graphics.strokePoints(polygon.points, true);

            graphics.lineStyle(2, 0x0000aa);

            const numbers = Phaser.Geom.Polygon.GetNumberArray(polygon);

            graphics.beginPath();

            // draw as if x was y and y was x
            graphics.moveTo(numbers[1], numbers[0]);

            for (let i = 0; i < numbers.length; i += 2)
            {
                graphics.lineTo(numbers[i + 1], numbers[i]);
            }

            graphics.lineTo(numbers[1], numbers[0]);

            graphics.closePath();
            graphics.strokePath();
        }
    }
}

const config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);

class Example extends Phaser.Scene
{
    preload ()
    {
        this.load.image('logo', 'assets/sprites/phaser-wire-300.png');
        this.load.image('sprite', 'assets/sprites/space-baddie.png');

        for (let i = 1; i <= 32; i++)
        {
            this.load.image(`pixel${i}`, `assets/tests/pixels/${i}.png`);
        }
    }

    createGPULayer (gpuLayer, count, colors)
    {
        if (gpuLayer.memberCount + count > gpuLayer.size)
        {
            gpuLayer.resize(gpuLayer.size + count);
        }

        const template = {
            x: {
                ease: 'Linear',
            },
            y: {
                ease: 'Sine.easeInOut',
            },
            rotation: {
                ease: 'Linear',
                amplitude: 3,
                duration: 500
            },
            // alpha: 0.25,
            tintBlend: {
                base: 1,
                ease: 'Linear'
            }
        };

        for (let i = 0; i < count; i++)
        {
            template.x.base = Phaser.Math.Between(0, 1024);
            template.x.amplitude = Phaser.Math.Between(-6, 6);
            template.x.duration = Phaser.Math.Between(500, 1000);

            template.y.base = Phaser.Math.Between(256, 512);
            template.y.amplitude = Phaser.Math.Between(-5, 5);
            template.y.duration = Phaser.Math.Wrap(i, 500, 1000);

            template.rotation.delay = Phaser.Math.Wrap(i, 250, 1000);

            template.tintTopLeft = colors[Phaser.Math.Wrap(i, 0, 359)].color;
            template.tintTopRight = colors[Phaser.Math.Wrap(i, 0, 359)].color;

            gpuLayer.addMember(template);
        }
    }

    create ()
    {
        const colors = Phaser.Display.Color.HSVColorWheel();

        const layers = [];
        this.layers = layers;

        for (let i = 1; i <= 16; i++)
        {
            // layers.push(this.add.spriteGPULayer(`pixel${i}`));
            layers.push(this.add.spriteGPULayer(`sprite`, 0));
        }

        // const count = 512;
        // const count = 1024;
        // const count = 4096;
        // const count = 8192;
        // const count = 16384;
        // const count = 65536;
        // const count = 131072;
        // const count = 262144;
        const count = 250000;
        // const count = 524288;
        // const count = 524288;

        let c = 0;
        
        // this.createGPULayer(layers[0], count, colors);
        // let total = count;

        let total = 0;

        this.add.image(512, 384, 'logo');

        function format (number)
        {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }

        const text = this.add.text(100, 16, `Sprites: 0\nClick to add ${format(count)}`, { font: '16px Courier', fill: '#ffffff' });

        this.input.on('pointerdown', () => {

            this.createGPULayer(layers[c], count, colors);

            c++;
            c %= layers.length;
            total += count;

            text.setText(`Sprites: ${format(total)}\nClick to add ${format(count)}`);

            console.log(total);

        });
    }

    update (time, delta)
    {
        const layers = this.layers;

        const mask = [1];

        layers.forEach(layer => {
            const size = layer.size;

            //
            // This is fast, but each change costs about as much
            // as rendering four sprites:
            //

            const layout = layer.submitterNode.instanceBufferLayout;
            const f32 = layout.buffer.viewF32;
            const stride = layout.layout.stride / f32.BYTES_PER_ELEMENT;
            for (let i = 0; i < size; i++)
            {
                const offset = i * stride;
                var x = f32[offset] + delta * 0.1 + (i % 32) / 256;
                if (x > 1024)
                {
                    x -= 1024;
                }
                f32[offset] = x;
            }
            layer.setAllSegmentsNeedUpdate();

            //
            // This method is an order of magnitude slower:
            //

            // for (let i = 0; i < size; i++)
            // {
            //     const member = layer.getMemberData(i);
            //     member[0] = member[0] + delta * 0.1 + (i % 32) / 256;
            //     layer.patchMember(i, member, mask);
            // }

            //
            // And this method is two orders of magnitude slower,
            // but it's the best way to update animations:
            //

            // for (let i = 0; i < size; i++)
            // {
            //     const member = layer.getMember(i);
            //     if (member.x.base)
            //     {
            //         member.x.base += delta * 0.1 + (i % 32) / 256;
            //     }
            //     else{
            //         member.x += delta * 0.1 + (i % 32) / 256;
            //     }
            //     layer.editMember(i, member);
            // }
        });
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 1024,
    height: 768,
    scene: Example,
    backgroundColor: '#202020'
};

const game = new Phaser.Game(config);

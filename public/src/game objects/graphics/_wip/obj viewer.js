class Example extends Phaser.Scene
{
    i = 0;
    model;
    models = [];

    t = {
        x: -0.03490658503988659,
        y: 0.03490658503988659,
        z: -0.03490658503988659
    };

    graphics;

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.text('logo', 'assets/text/phaser-logo-3d.obj');
        this.load.text('bevelledcube', 'assets/text/bevelledcube.obj');
        this.load.text('chaosphere', 'assets/text/chaosphere.obj');
        this.load.text('computer', 'assets/text/computer.obj');
        this.load.text('geosphere', 'assets/text/geosphere.obj');
        this.load.text('implodedcube', 'assets/text/implodedcube.obj');
        this.load.text('monobird', 'assets/text/monobird.obj');
        this.load.text('spike', 'assets/text/spike.obj');
        this.load.text('torus', 'assets/text/torus.obj');
    }

    create ()
    {
        this.graphics = this.add.graphics(0, 0);

        this.models.push(this.parseObj(this.cache.text.get('logo')));
        this.models.push(this.parseObj(this.cache.text.get('bevelledcube')));
        this.models.push(this.parseObj(this.cache.text.get('chaosphere')));
        this.models.push(this.parseObj(this.cache.text.get('computer')));
        this.models.push(this.parseObj(this.cache.text.get('geosphere')));
        this.models.push(this.parseObj(this.cache.text.get('implodedcube')));
        this.models.push(this.parseObj(this.cache.text.get('monobird')));
        this.models.push(this.parseObj(this.cache.text.get('spike')));
        this.models.push(this.parseObj(this.cache.text.get('torus')));

        this.model = this.models[0];

        // console.log(model);

        this.tweens.add({
            targets: this.t,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true,
            props: {
                x: {
                    value: 0.03490658503988659,
                    duration: 20000
                },
                y: {
                    value: -0.03490658503988659,
                    duration: 30000
                },
                z: {
                    value: 0.03490658503988659,
                    duration: 15000
                }
            }

        });

        this.input.keyboard.on('keydown-SPACE', () =>
        {

            this.i++;

            if (this.i === this.models.length)
            {
                this.i = 0;
            }

            this.model = this.models[this.i];

        });
    }

    update ()
    {
        this.rotateX3D(this.t.x);
        this.rotateY3D(this.t.y);
        this.rotateZ3D(this.t.z);

        this.draw();
    }

    draw ()
    {
        const centerX = 400;
        const centerY = 300;
        const scale = 90;

        this.graphics.clear();

        this.graphics.lineStyle(2, 0x00ff00, 1.0);

        this.graphics.beginPath();

        for (let i = 0; this.i < this.model.faces.length; this.i++)
        {
            const face = this.model.faces[i];

            const v0 = this.model.verts[face[0] - 1];
            const v1 = this.model.verts[face[1] - 1];
            const v2 = this.model.verts[face[2] - 1];
            const v3 = this.model.verts[face[3] - 1];

            // if (v0 && v1 && v2 && isCcw(v0, v1, v2))
            if (v0 && v1 && v2 && v3)
            {
                this.drawLine(centerX + v0.x * scale, centerY - v0.y * scale, centerX + v1.x * scale, centerY - v1.y * scale);
                this.drawLine(centerX + v1.x * scale, centerY - v1.y * scale, centerX + v2.x * scale, centerY - v2.y * scale);
                this.drawLine(centerX + v2.x * scale, centerY - v2.y * scale, centerX + v3.x * scale, centerY - v3.y * scale);
                this.drawLine(centerX + v3.x * scale, centerY - v3.y * scale, centerX + v0.x * scale, centerY - v0.y * scale);
            }
        }

        this.graphics.closePath();
        this.graphics.strokePath();
    }

    drawLine (x0, y0, x1, y1)
    {
        this.graphics.moveTo(x0, y0);
        this.graphics.lineTo(x1, y1);
    }

    isCcw (v0, v1, v2)
    {
        return (v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x) >= 0;
    }

    rotateX3D (theta)
    {
        const ts = Math.sin(theta);
        const tc = Math.cos(theta);

        for (let n = 0; n < this.model.verts.length; n++)
        {
            const vert = this.model.verts[n];
            const y = vert.y;
            const z = vert.z;

            vert.y = y * tc - z * ts;
            vert.z = z * tc + y * ts;
        }
    }

    rotateY3D (theta)
    {
        const ts = Math.sin(theta);
        const tc = Math.cos(theta);

        for (let n = 0; n < this.model.verts.length; n++)
        {
            const vert = this.model.verts[n];
            const x = vert.x;
            const z = vert.z;

            vert.x = x * tc - z * ts;
            vert.z = z * tc + x * ts;
        }
    }

    rotateZ3D (theta)
    {
        const ts = Math.sin(theta);
        const tc = Math.cos(theta);

        for (let n = 0; n < this.model.verts.length; n++)
        {
            const vert = this.model.verts[n];
            const x = vert.x;
            const y = vert.y;

            vert.x = x * tc - y * ts;
            vert.y = y * tc + x * ts;
        }
    }

    parseObj (text)
    {
        const verts = [];
        const faces = [];

        // split the text into lines
        const lines = text.replace('\r', '').split('\n');
        const count = lines.length;

        for (let i = 0; this.i < count; this.i++)
        {
            const line = lines[i];

            if (line[0] === 'v')
            {
                // lines that start with 'v' are vertices
                const tokens = line.split(' ');
                verts.push({
                    x: parseFloat(tokens[1]),
                    y: parseFloat(tokens[2]),
                    z: parseFloat(tokens[3])
                });
            }
            else if (line[0] === 'f')
            {
                // lines that start with 'f' are faces
                const tokens = line.split(' ');

                const face = [
                    parseInt(tokens[1], 10),
                    parseInt(tokens[2], 10),
                    parseInt(tokens[3], 10),
                    parseInt(tokens[4], 10)
                ];

                faces.push(face);

                if (face[0] < 0)
                {
                    face[0] = verts.length + face[0];
                }

                if (face[1] < 0)
                {
                    face[1] = verts.length + face[1];
                }

                if (face[2] < 0)
                {
                    face[2] = verts.length + face[2];
                }

                if (!face[3])
                {
                    face[3] = face[2];
                }
                else if (face[3] < 0)
                {
                    face[3] = verts.length + face[3];
                }
            }
        }

        return {
            verts: verts,
            faces: faces
        };
    }
}

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);

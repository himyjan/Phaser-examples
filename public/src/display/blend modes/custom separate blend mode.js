class Example extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.image('turkey', 'assets/pics/turkey-1985086.jpg');
        this.load.image('face', 'assets/pics/bw-face.png');
        this.load.image('src', 'assets/tests/blendmode/src.png');
        this.load.image('dst', 'assets/tests/blendmode/dst.png');
        this.load.image('logo', 'assets/sprites/phaser-large.png');
    }

    create ()
    {
        //  WebGL only:
        const gl = this.sys.game.renderer.gl;

        const consts = [
            gl.ZERO,
            gl.ONE,
            gl.SRC_COLOR,
            gl.ONE_MINUS_SRC_COLOR,
            gl.DST_COLOR,
            gl.ONE_MINUS_DST_COLOR,
            gl.SRC_ALPHA,
            gl.ONE_MINUS_SRC_ALPHA,
            gl.DST_ALPHA,
            gl.ONE_MINUS_DST_ALPHA,
            gl.CONSTANT_COLOR,
            gl.ONE_MINUS_CONSTANT_COLOR,
            gl.CONSTANT_ALPHA,
            gl.ONE_MINUS_CONSTANT_ALPHA,
            gl.SRC_ALPHA_SATURATE
        ];

        const equations = [
            gl.FUNC_ADD,
            gl.FUNC_SUBTRACT,
            gl.FUNC_REVERSE_SUBTRACT
        ];

        const list = [
            { val: 0, text: 'ZERO' },
            { val: 1, text: 'ONE' },
            { val: 2, text: 'SRC_COLOR' },
            { val: 3, text: 'ONE_MINUS_SRC_COLOR' },
            { val: 4, text: 'DST_COLOR' },
            { val: 5, text: 'ONE_MINUS_DST_COLOR' },
            { val: 6, text: 'SRC_ALPHA' },
            { val: 7, text: 'ONE_MINUS_SRC_ALPHA' },
            { val: 8, text: 'DST_ALPHA' },
            { val: 9, text: 'ONE_MINUS_DST_ALPHA' },
            { val: 10, text: 'CONSTANT_COLOR' },
            { val: 11, text: 'ONE_MINUS_CONSTANT_COLOR' },
            { val: 12, text: 'CONSTANT_ALPHA' },
            { val: 13, text: 'ONE_MINUS_CONSTANT_ALPHA' },
            { val: 14, text: 'SRC_ALPHA_SATURATE' }
        ];

        const list2 = [
            { val: 0, text: 'FUNC_ADD' },
            { val: 1, text: 'FUNC_SUBTRACT' },
            { val: 2, text: 'FUNC_REVERSE_SUBTRACT' }
        ];

        const newMode = [ gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA ];
        let equation = equations[0];

        let renderer = this.sys.game.renderer;

        let modeIndex = renderer.addBlendMode(newMode, equation);

        this.add.image(400, 300, 'face').setBlendMode(modeIndex);
        // this.add.image(400, 300, 'dst');
        // this.add.image(400, 300, 'src').setBlendMode(modeIndex);
        // this.add.image(400, 300, 'logo').setBlendMode(modeIndex);
        this.add.image(400, 300, 'logo');

        //  zero, one, one, zero, add

        //  Create the 4 select lists

        let srcRGB = $('<select>').attr('id', 'srcRGB').data('idx', 0).appendTo('body');
        let dstRGB = $('<select>').attr('id', 'dstRGB').data('idx', 1).appendTo('body');
        let srcAlpha = $('<select>').attr('id', 'srcAlpha').data('idx', 2).appendTo('body');
        let dstAlpha = $('<select>').attr('id', 'dstAlpha').data('idx', 3).appendTo('body');

        $(list).each(function() {

            srcRGB.append($("<option>").attr('value', this.val).text(this.text));
            dstRGB.append($("<option>").attr('value', this.val).text(this.text));
            srcAlpha.append($("<option>").attr('value', this.val).text(this.text));
            dstAlpha.append($("<option>").attr('value', this.val).text(this.text));

        });

        srcRGB.val('6').change();
        dstRGB.val('7').change();
        srcAlpha.val('1').change();
        dstAlpha.val('7').change();

        $('#srcRGB, #dstRGB, #srcAlpha, #dstAlpha').change(function () {

            let idx = $(this).data('idx');

            newMode[idx] = consts[this.value];

            renderer.updateBlendMode(modeIndex, newMode, equation);

        });

        let equ = $('<select>').attr('id', 'equ').appendTo('body');

        $(list2).each(function() {
            equ.append($("<option>").attr('value', this.val).text(this.text));
        });

        $(equ).on('change', function () {

            equation = equations[this.value];

            renderer.updateBlendMode(modeIndex, newMode, equation);

        });

    }

}

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: '#00ff00',
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);

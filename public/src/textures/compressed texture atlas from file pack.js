var FilePackObject = {
    "pack": {
        "path": "assets/compressed",
        "files": [
            {
                "type": "texture",
                "key": "labs",
                "url": {
                    "ASTC": { type: "PVR", textureURL: 'compressed/textures-ASTC-4x4-lRGB.pvr', atlasURL: 'uncompressed/textures.json' },
                    "ETC": { type: "PVR", textureURL: 'compressed/textures-ETC2-lRGB.pvr', atlasURL: 'uncompressed/textures.json' },
                    "PVRTC": { type: "PVR", textureURL: 'compressed/textures-PVRTC-4BPP-lRGB.pvr', atlasURL: 'uncompressed/textures.json' },
                    "S3TC": { type: "PVR", textureURL: 'compressed/textures-S3TC-BC3-lRGB.pvr', atlasURL: 'uncompressed/textures.json' },
                    "IMG": { textureURL: 'textures.png', atlasURL: 'uncompressed/textures.json' }
                }
            }
        ]
    },
    "meta": {
        "generated": "1401380327373",
        "app": "Phaser 3 Asset Packer",
        "url": "https://phaser.io",
        "version": "1.0",
        "copyright": "Photon Storm Ltd. 2021"
    }
};

class Demo extends Phaser.Scene
{
    constructor ()
    {
        super();
    }

    preload ()
    {
        // this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.pack('pack1', FilePackObject);
    }

    create ()
    {
        const bubble = this.add.sprite(0, 40, 'labs', 'bubble256').setOrigin(0);
        const logo = this.add.sprite(80, 100, 'labs', 'logo').setOrigin(0);

        this.add.text(400, 570, logo.frame.source.compressionAlgorithm).setOrigin(0.5, 0);
    }
}

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#2d2d6d',
    scene: Demo
};

const game = new Phaser.Game(config);

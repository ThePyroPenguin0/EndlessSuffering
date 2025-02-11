class Load extends Phaser.Scene {
    constructor() {
        super('loadingScene');
    }

    preload() {
        this.loadBar = this.add.graphics();
        this.loadBar.fillStyle(0x00FF00, 1);
        this.loadBar.fillRect(game.config.width * 0.4, game.config.height * 0.5, game.config.width * 0.2, 20);

        this.loadingText = this.add.text(game.config.width * 0.5, game.config.height * 0.45, 'Loading, 0%', {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#FFFFFF',
            align: 'center'
        }).setOrigin(0.5);



        this.load.on('progress', (percent) => {
            this.loadBar.clear();
            this.loadBar.fillStyle(0x00FF00, 1);
            this.loadBar.fillRect(game.config.width * 0.4, game.config.height * 0.5, game.config.width * 0.2 * percent, 20);

            this.loadingText.setText(`Loading, ${Math.floor(percent * 100)}%`);
        });

        this.load.image("upperBarrier", "./assets/images/angyUpper.png");
        this.load.image("lowerBarrier", "./assets/images/happyLower.png");
        this.load.image("rainbow", "./assets/images/rainbowBG.png");
        this.load.image("invert", "./assets/images/rainbowInverted.png");
        this.load.image("gray", "./assets/images/gray.png");
        this.load.spritesheet("player", "./assets/images/stickmanSheet.png", {
            frameWidth: 83,
            frameHeight: 76,
            startFrame: 0,
            endFrame: 7
        });

        this.load.audio('arabicNokia', "./assets/sounds/NokiaArabic.mp3");
        this.load.audio('beep', "./assets/sounds/beep.ogg");
        this.load.audio('boop', "./assets/sounds/boop.ogg");
        this.load.audio('jump', "./assets/sounds/YIPPEE.ogg");
        this.load.audio('duck', "./assets/sounds/woohoo.ogg");
        this.load.audio('gameover', "./assets/sounds/ITSABIRDITSAPLANE.ogg");
    }

    create() {
        this.scene.start('menuScene');
    }
}
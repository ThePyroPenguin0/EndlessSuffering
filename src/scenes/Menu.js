class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
   

        this.load.image("upperBarrier", "./assets/images/angyUpper.png");
        this.load.image("lowerBarrier", "./assets/images/happyLower.png");
        this.load.image("rainbow", "./assets/images/rainbowBG.png");
        this.load.image("invert", "./assets/images/rainbowInverted.png");
        this.load.image("gray", "./assets/images/gray.png");
        this.load.spritesheet("player", "./assets/images/stickmanSheet.png",
        {
            frameWidth: 83,
            frameHeight: 76,
            startFrame: 0,
            endFrame: 7
        });

        this.load.audio('arabicNokia', "./assets/sounds/NokiaArabic.mp3");
        this.load.audio('beep',  "./assets/sounds/beep.ogg")
        this.load.audio('boop',  "./assets/sounds/boop.ogg")
        this.load.audio('jump',  "./assets/sounds/YIPPEE.ogg")
        this.load.audio('duck',  "./assets/sounds/woohoo.ogg")
        this.load.audio('gameover',  "./assets/sounds/ITSABIRDITSAPLANE.ogg")
    }
    create() {
        let menuConfig =
        {
            fontFamily: "Comic Sans MS",
            fontSize: "32px",
            backgroundColor: "#FF00A0",
            color: "#00FF00",
            align: "center",
            padding:
            {
                top: 5,
                bottom: 5,
                right: 5,
                left: 5
            },
            fixedWidth: 0
        }

        this.add.rectangle(0,0,game.config.width,game.config.height, "0x0000ff", 1).setOrigin(0);
        this.add.text(game.config.width * 0.5, game.config.height * 0.3, "Endless Suffering", menuConfig).setOrigin(0.5).setScale(2);
        this.add.text(game.config.width * 0.5, game.config.height * 0.5, `A "game" by Gabriel Lipow`, menuConfig).setOrigin(0.5).setScale(1);
        this.add.text(game.config.width * 0.25, game.config.height * 0.66, "Press (LEFT) for documentation", menuConfig).setOrigin(0.5).setScale(1.5);
        this.add.text(game.config.width * 0.75, game.config.height * 0.66, `Press (RIGHT) for the "game"`, menuConfig).setOrigin(0.5).setScale(1.5);



        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('beep')
            this.scene.start('documentationScene');
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('playScene');
            this.sound.play('boop')
        }
    }
}
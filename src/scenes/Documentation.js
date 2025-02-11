class Documentation extends Phaser.Scene {
    constructor() {
        super("documentationScene");
    }

    create() {
        let docConfig =
        {
            fontFamily: "Comic Sans MS",
            fontSize: "24px",
            backgroundColor: "#FF0000",
            color: "#1111FF",
            align: "left",
            padding:
            {
                top: 20,
                bottom: 20,
                right: 20,
                left: 20
            },
            fixedWidth: 0
        }

        this.add.rectangle(0,0,game.config.width,game.config.height, "0x00ff00", 1).setOrigin(0);
        this.add.text(game.config.width * 0.5, game.config.height * 0.5, `Dear Reader,\n\nI understand that you are no doubt going through many, many similar (if not identical) endless runners.\n\nMy sincere condolences.\n\nTo that end, I have simplified the game for you somewhat.\nInstead of needing to play the game, it will play itself for you.\n\nAlas, I am not a great artist. The computer hates the "art" style I have chosen, and wants to play this game as little as you probably do.\nYou will need to make sure that the computer doesn't do anything sneaky.\nLike, say, shut the game down without warning.\nJust click the mouse every so often to keep it awake.\n\nHave fun! :)\n\nGabriel Lipow\n\nP.S: DO NOT play this game if you are susceptible to seizures.`, docConfig).setOrigin(0.5).setScale(1);
        this.add.text(game.config.width * 0.1, game.config.height * 0.95, `(Press (RIGHT) to return to menu.)`, docConfig).setOrigin(0.5).setScale(0.6);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }
    update() {
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.scene.start('menuScene');
            this.sound.play('boop');
        }
    }
}
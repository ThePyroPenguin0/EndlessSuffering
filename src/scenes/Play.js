class Play extends Phaser.Scene {
    init() {}

    constructor() {
        super('playScene');
    }

    create() {
        this.timeMult = 1;
        let gameConfig =
        {
            fontFamily: "Comic Sans MS",
            fontSize: "20px",
            backgroundColor: "#000000",
            color: "#FFFFFF",
            align: "center",
            padding:
            {
                top: 10,
                bottom: 10,
                right: 10,
                left: 10
            },
            fixedWidth: 0
        }

        this.physics.world.gravity.y = 800;
        this.timer = 15000
        let closeTimer = this.time.delayedCall(this.timer, () => {
            this.sound.play('gameover', { volume: 5 });
            this.time.delayedCall(2300, () => window.close());
        });
        this.input.on('pointerdown', () => {
            closeTimer.remove();
            closeTimer = this.time.delayedCall(this.timer, () => {
                this.sound.play('gameover', { volume: 5 });
                this.time.delayedCall(2300, () => window.close());
            });
        });

        this.topGroup = this.physics.add.group({
            key: 'top',
            repeat: 0,
            setXY: { x: 0, y: 0 }
        });

        this.bottomGroup = this.physics.add.group({
            key: 'bottom',
            repeat: 0,
            setXY: { x: 0, y: 0 }
        });


        this.topGroup.children.iterate((obj) => obj.body.allowGravity = false);
        this.bottomGroup.children.iterate((obj) => obj.body.allowGravity = false);

        this.time.addEvent({
            delay: 3000 - this.timeMult,
            callback: () => this.spawnObstacle(Phaser.Math.Between(0, 1) === 0 ? 'top' : 'bottom'),
            loop: true
        });

        this.timepassed = 0;
        this.rainbowBG = this.add.tileSprite(config.width * 0.5, config.height * 0.5, config.width, config.height, 'rainbow');
        this.invertedBG = this.add.tileSprite(config.width * 0.5, config.height * 0.5, config.width, config.height, 'invert');

        this.input.on('pointerdown', () => {
            this.invertedBG.visible = true;
            this.rainbowBG.visible = false;
        });

        this.input.on('pointerup', () => {
            this.invertedBG.visible = false;
            this.rainbowBG.visible = true;
        })
        this.track = this.sound.add('arabicNokia', { loop: true, volume: 0.5 });
        this.track.play();

        this.sessionTime = 0;
        this.MaxTime = localStorage.getItem('MaxTime') ? parseInt(localStorage.getItem('MaxTime')) : 0;
        this.timeText = this.add.text(config.width * 0.1, config.height * 0.1, `Time Well(?) Spent: ${this.sessionTime} seconds\nMaximum Time Well(?) Spent: ${this.MaxTime} seconds\nPress R to restart. Though why you would want to is beyond me.`, gameConfig).setOrigin(0);

        this.ground = this.physics.add.image(config.width * 0.5, config.height * 0.875,).setOrigin(0);
        this.ground.setCollideWorldBounds = true;

        this.runner = new Runner(this, config.width * 0.2, config.height * 0.5, 'player', 0);

        this.ground = this.physics.add.staticSprite(config.width / 2, config.height * 0.875, 'gray');
        this.ground.setScale(config.width / this.ground.width, (config.height * 0.25) / this.ground.height);
        this.ground.refreshBody();
        this.physics.add.collider(this.runner, this.ground);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    }

    update() {
        while (this.timeMult > 500) {
            this.timeMult -= 5;
        }
        this.timepassed++;
        if (this.timepassed % 90 == 0) {
            this.timer -= 500;
            if (this.timer <= 0) {
                this.timer = 100;
            }
        }

        if (this.timepassed % 30 == 0) {
            this.sessionTime++;
            this.timeText.setText(`Time Well(?) Spent: ${this.sessionTime} seconds\nMaximum Time Well(?) Spent: ${this.MaxTime} \nPress R to restart. Though why you would want to is beyond me.`);
        }

        if (this.MaxTime < this.sessionTime) {
            localStorage.setItem('MaxTime', this.sessionTime);
        }
        this.rainbowBG.tilePositionX += 2 * Math.log(this.timepassed + 10);
        this.invertedBG.tilePositionX += 2 * Math.log(this.timepassed + 10);
        this.checkForObstacles();

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play('beep')
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
            this.sound.play('boop')
        }
        if (Phaser.Input.Keyboard.JustDown(keyR)) {
            this.sound.stopAll();
            this.scene.start('menuScene');
        }
    }

    spawnObstacle(type) {
        let x = config.width + 50;
        let y;
        let obstacle;

        if (type === 'top') {
            y = config.height * 0.67;
            obstacle = this.topGroup.create(x, y, 'upperBarrier');
        }
        if (type === 'bottom') {
            y = config.height * 0.71;
            obstacle = this.bottomGroup.create(x, y, 'lowerBarrier');
        }

        obstacle.setVelocityX(-200);

        obstacle.body.allowGravity = false;

        obstacle.setCollideWorldBounds(false);
        obstacle.checkWorldBounds = true;
        obstacle.outOfBoundsKill = true;
    }

    checkForObstacles() {
        this.topGroup.children.iterate((topObstacle) => {
            if (topObstacle) {
                let xDistance = Math.abs(topObstacle.x - this.runner.x);
                if (xDistance < 100) {
                    this.runner.stateMachine.transition('slide');
                }
            }
        });

        this.bottomGroup.children.iterate((bottomObstacle) => {
            if (bottomObstacle) {
                let xDistance = Math.abs(bottomObstacle.x - this.runner.x);
                if (xDistance < 100) {
                    this.runner.stateMachine.transition('jump');
                }
            }
        });
    }

}

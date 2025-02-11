// Runner prefab
class Runner extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.body.setSize(this.width, this.height);
        this.stateMachine = new StateMachine('run', {
            run: new runState(),
            jump: new jumpState(),
            slide: new slideState(),
        }, [scene, this]);

        this.anims.create({
            key: 'run',
            frames: scene.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 16,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: scene.anims.generateFrameNumbers('player', { start: 4, end: 4 }),
            frameRate: 1,
            repeat: 0
        });

        this.anims.create({
            key: 'slide',
            frames: scene.anims.generateFrameNumbers('player', { start: 5, end: 5 }),
            frameRate: 1,
            repeat: 0
        });

        this.anims.play('run');
    }
}

class runState extends State {
    enter(scene, runner) {
        if (!runner.anims.isPlaying || runner.anims.currentAnim.key !== 'run') {
            runner.play('run');
        }
        runner.setVelocityY(100); // Reset to normal running velocity
    }
}

class jumpState extends State {
    enter(scene, runner) {
        if (runner.isActionInProgress) return; // Don't start a new action if one is already in progress

        runner.isActionInProgress = true;
        runner.play('jump');
        runner.setVelocityY(-550);
        scene.sound.play('jump');

        runner.once('animationcomplete', () => {
            runner.isActionInProgress = false;
            runner.stateMachine.transition('run');
        });
    }
}

class slideState extends State {
    enter(scene, runner) {
        if (runner.isActionInProgress) return; // Don't start a new action if one is already in progress

        runner.isActionInProgress = true; // Mark action as in progress
        runner.play('slide');
        scene.sound.play('duck');
        runner.setVelocityY(900); // Apply duck velocity

        // Transition back to 'run' after the slide animation is complete
        runner.once('animationcomplete', () => {
            runner.isActionInProgress = false;
            runner.stateMachine.transition('run');
        });
    }
}
